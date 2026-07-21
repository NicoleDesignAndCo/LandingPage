import { caseStudies, site, studioWork } from "./data";
import { getInsightBySlug } from "./insights";

let initialPageViewHandled = false;
let lastPageView = "";
let lastContentView = "";

export type AnalyticsParameters = Record<string, string | number | boolean | undefined>;

export function trackEvent(eventName: string, parameters: AnalyticsParameters = {}) {
  if (typeof window === "undefined" || !window.gtag) return;
  const safeParameters = Object.fromEntries(Object.entries(parameters).filter(([, value]) => value !== undefined));
  window.gtag("event", eventName, safeParameters);
}

export function trackPageView() {
  if (typeof window === "undefined") return;
  if (!initialPageViewHandled) {
    initialPageViewHandled = true;
    return;
  }

  const pagePath = `${window.location.pathname}${window.location.search}`;
  const signature = `${pagePath}|${document.title}`;
  if (signature === lastPageView) return;
  lastPageView = signature;
  trackEvent("page_view", {
    page_path: pagePath,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export function trackRouteContentView(pathname: string) {
  if (pathname === lastContentView) return;
  lastContentView = pathname;

  const serviceMatch = pathname.match(/^\/services\/([^/]+)$/);
  if (serviceMatch) {
    const serviceName = document.querySelector("h1")?.textContent?.trim();
    trackEvent("service_view", { service_slug: serviceMatch[1], service_name: serviceName });
    return;
  }

  const workMatch = pathname.match(/^\/work\/([^/]+)$/);
  if (workMatch) {
    const project = caseStudies.find((item) => item.slug === workMatch[1]);
    trackEvent("work_view", {
      project_slug: workMatch[1],
      project_name: project?.title ?? document.querySelector("h1")?.textContent?.trim(),
      project_type: "client",
    });
    return;
  }

  const insightMatch = pathname.match(/^\/insights\/([^/]+)$/);
  if (insightMatch) {
    const insight = getInsightBySlug(insightMatch[1]);
    if (insight) trackEvent("insight_view", {
      insight_slug: insight.slug,
      insight_title: insight.title,
      insight_category: insight.category,
    });
  }
}

function placementFor(element: Element) {
  if (element.closest("header")) return "header";
  if (element.closest("footer")) return "footer";
  if (element.closest(".tally-floating-button")) return "floating_cta";
  if (element.closest(".insight-inline-cta")) return "insight_inline_cta";
  if (element.closest(".insight-final-cta")) return "insight_final_cta";
  if (element.closest(".case-cta")) return "case_study_cta";
  if (element.closest(".single-service__cta")) return "service_final_cta";
  if (window.location.pathname === "/contact") return "contact_page";
  return "page_content";
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function trackClick(event: Event) {
  const target = event.target;
  if (!(target instanceof Element)) return;
  const element = target.closest("a, button");
  if (!element) return;

  const linkText = element.textContent?.replace(/\s+/g, " ").trim() ?? "";
  const rawUrl = element instanceof HTMLAnchorElement ? element.href : element.tagName === "BUTTON" ? site.tallyUrl : "";
  const pagePath = window.location.pathname;
  const placement = placementFor(element);
  const common = { link_text: linkText, link_url: rawUrl, page_path: pagePath, placement };
  const normalizedText = linkText.toLowerCase();
  const isEmail = rawUrl.startsWith("mailto:");
  const isStartProject = ["start a project", "start an inquiry", "discuss your needs", "start a conversation"].some((label) => normalizedText.includes(label));

  if (normalizedText.includes("website review")) {
    trackEvent("website_review_click", { page_path: pagePath, placement, link_url: rawUrl });
  }

  if (isStartProject) {
    trackEvent("start_project_click", common);
  }

  if (!isEmail && ((rawUrl && new URL(rawUrl, window.location.href).pathname === "/contact") || (pagePath === "/contact" && (element.tagName === "BUTTON" || normalizedText.includes("inquiry"))))) {
    trackEvent("contact_click", common);
  }

  if (isEmail) {
    trackEvent("email_click", { page_path: pagePath, placement });
    return;
  }

  const insightMatch = pagePath.match(/^\/insights\/([^/]+)$/);
  if (insightMatch && element.closest(".insight-inline-cta, .insight-final-cta")) {
    const insight = getInsightBySlug(insightMatch[1]);
    trackEvent("insight_cta_click", {
      insight_slug: insightMatch[1],
      cta_variant: element.closest(".insight-inline-cta") ? insight?.ctaVariant ?? "inline" : "final",
      link_url: rawUrl,
    });
  }

  if (rawUrl && /^https?:/.test(rawUrl)) {
    const destination = new URL(rawUrl);
    if (destination.origin !== window.location.origin) {
      const demo = studioWork.find((item) => "projectType" in item && item.projectType === "demo" && item.url === rawUrl);
      if (demo) trackEvent("external_demo_click", { project_slug: slugify(demo.title), destination_url: rawUrl });
      trackEvent("outbound_link_click", { link_text: linkText, destination_url: rawUrl, page_path: pagePath, placement });
    }
  }
}

export function trackTallySubmission(event: MessageEvent) {
  if (event.origin !== "https://tally.so" || event.data?.event !== "Tally.FormSubmitted") return;
  trackEvent("generate_lead", { form_name: "project_inquiry", page_path: window.location.pathname });
}
