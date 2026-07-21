import nickHeadshot from "../nick.avif";
import nicoleHeadshot from "../nicole.jpeg";

export const site = {
  name: "Fractionl Studio",
  domain: "https://fractionlstudio.com",
  logo: "/brand/fractionl-studio-logo-nav.png",
  email: "hello@fractionlstudio.com",
  location: "Edmonton, Alberta",
  tallyFormId: "xXzMGr",
  tallyUrl: "https://tally.so/r/xXzMGr",
};

export const services = [
  {
    index: "01",
    slug: "website-reliability",
    title: "Website Reliability",
    description: "Keep your website secure, updated, and online with hosting, backups, monitoring, bug fixes, and software updates.",
    detail: "A dependable website should not require constant attention. We handle the essential technical work behind the scenes so your site remains secure, healthy, and available.",
    includes: ["Managed hosting", "Security and software updates", "Automated backups", "Uptime monitoring", "Bug fixes and technical support"],
  },
  {
    index: "02",
    slug: "website-presence",
    title: "Website Presence",
    description: "Keep your website current, professional, and aligned with your business through quarterly reviews and approved improvements to existing pages.",
    detail: "Your website should evolve as your business does. We review what is working, identify useful improvements, and keep your existing pages polished and aligned with your goals.",
    includes: ["Quarterly website reviews", "Content and design improvements", "User experience recommendations", "Performance checks", "Ongoing page updates"],
  },
  {
    index: "03",
    slug: "growth-partner",
    title: "Growth Partner",
    description: "Your on-demand digital growth and support team for website updates, landing pages, marketing materials, social assets, and promotional support.",
    detail: "Get flexible creative and digital support without adding another full-time role. We help keep everyday growth work moving with a consistent partner who understands your business.",
    includes: ["Website updates and improvements", "Landing pages", "Marketing and social assets", "Campaign support", "Priority response time"],
  },
  {
    index: "04",
    slug: "product-design-partner",
    title: "Product Design Partner",
    description: "Ongoing product design support for SaaS teams, startups, and founders who need UX/UI, prototypes, user flows, and developer handoff.",
    detail: "Extend your product team with experienced design support that can move from early flows to production-ready interfaces while collaborating closely with founders, product leads, and developers.",
    includes: ["UX/UI design", "User flows and wireframes", "Interactive prototypes", "Design systems", "Developer handoff and collaboration"],
  },
] as const;

export const studioWork = [
  {
    slug: "trifold-brochure",
    title: "Trifold Brochure",
    businessType: "Graphic Design / Print Design",
    description:
      "A trifold marketing brochure designed for Inphonite, presenting the company’s services and information in a clear, polished print format.",
    url: "/work/trifold-brochure",
    showOnHomepage: false,
  },
  {
    slug: "navigation-restructure",
    title: "Navigation Restructure",
    businessType: "Product Design / Information Architecture",
    description:
      "A focused restructuring of Inphonite’s navigation and information architecture to make everyday tools clearer, more consistent, and easier to locate.",
    url: "/work/navigation-restructure",
  },
  {
    slug: "pensioner-profile",
    title: "Pensioner Profile",
    businessType: "Product Design / UX/UI",
    description:
      "A self-serve beneficiary management feature created for ATRF’s MyPension portal, with role-aware workflows and a guided Request Status Update flow.",
    url: "/work/pensioner-profile",
  },
  {
    slug: "restaurant-website-redesign",
    title: "Hudsons Canada's Pub",
    businessType: "Web Design / WordPress",
    description:
      "Full website redesign for a multi-location Canadian pub chain, improving mobile experience, reservations flow, and CMS flexibility.",
    url: "https://nicole-buloran.com/work/restaurant-website-redesign",
  },
  {
    slug: "innquest-canada",
    title: "InnQuest Canada",
    businessType: "Web Design / CRM Integration",
    description:
      "Full website redesign and Zoho CRM integration for a global hospitality software company, automating lead capture and support ticket routing.",
    url: "/work/innquest-canada",
  },
  {
    slug: "message-blast",
    title: "Message Blast",
    businessType: "Product Design / Prototyping",
    description:
      "A unified workflow for creating, scheduling, reviewing, and sending high-volume patient communications within Inphonite.",
    url: "/work/message-blast",
  },
  {
    title: "Maya Bennett Real Estate",
    businessType: "Independent Realtor",
    projectType: "demo",
    description:
      "A personal brand website for an independent realtor, featuring listings, buying and selling pages, lead capture, and a single property listing page.",
    url: "https://maya-bennett.vercel.app/",
  },
  {
    title: "Serene Paths Clinic",
    businessType: "Therapist / Coach / Wellness Provider",
    projectType: "demo",
    description:
      "A calm, professional website for a therapist, coach, or wellness provider, featuring services, resources, consultation booking, and trust-building content.",
    url: "https://serene-paths.vercel.app/",
  },
  {
    title: "North Peak Coffee Co.",
    businessType: "Local Ecommerce",
    projectType: "demo",
    description:
      "A small ecommerce website for a local coffee roaster, featuring product browsing, product detail pages, cart experience, and brand storytelling.",
    url: "https://north-peak-coffee-co.vercel.app/",
  },
] as const;

export const caseStudyServices = {
  technologyConsulting: { label: "Technology Consulting", href: "/services/technology-consulting" },
  websiteDesignDevelopment: { label: "Website Design & Development", href: "/services/website-design-development" },
  webApplications: { label: "Web Applications", href: "/services/web-applications" },
  fractionalProductDesign: { label: "Fractional Product Design", href: "/services/fractional-product-design" },
  creativeRetainer: { label: "Creative Retainer", href: "/services/creative-retainer" },
  managedHostingSupport: { label: "Managed Hosting & Ongoing Support", href: "/services/managed-hosting-support" },
} as const;

export type CaseStudy = {
  slug: string;
  seoTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  introduction: string;
  summary: string;
  heroImage?: string;
  imageAlt?: string;
  images?: string[];
  imageAlts?: string[];
  details: { label: string; value: string; url?: string }[];
  overview?: string[];
  overviewHeading?: string;
  challenge?: { eyebrow: string; heading: string; paragraphs: string[]; items?: string[] };
  goals?: string[];
  approach?: { title: string; body: string }[];
  solution?: { heading: string; paragraphs: string[]; highlights?: string[] };
  visuals?: { title: string; caption: string; variant?: "wide" | "pair" }[];
  outcome?: { heading: string; paragraphs: string[]; improvements?: string[] };
  deliverables?: string[];
  results?: string[];
  testimonial?: { quote: string; attribution: string };
  services: { label: string; href: string }[];
  related: string[];
  cta?: { eyebrow?: string; heading?: string; copy?: string; primaryLabel?: string; secondaryLabel?: string };
  sourceUrl?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "trifold-brochure",
    seoTitle: "Trifold Brochure for Inphonite | Fractionl Studio",
    metaDescription: "A polished trifold marketing brochure designed for Inphonite to present the company’s services and information in print.",
    eyebrow: "INPHONITE",
    title: "Trifold Brochure",
    introduction: "A polished print piece for clear, approachable service communication.",
    summary: "A trifold marketing brochure designed for Inphonite, presenting the company’s services and information in a clear, polished print format.",
    heroImage: "/images/work/trifold-brochure/hero.webp",
    imageAlt: "Inphonite trifold marketing brochure shown open in a print mockup",
    images: [
      "/images/work/trifold-brochure/1.webp",
      "/images/work/trifold-brochure/2.webp",
    ],
    imageAlts: [
      "Outside panels of the Inphonite trifold brochure shown fully open",
      "Two folded Inphonite trifold brochures showing the front cover design",
    ],
    details: [
      { label: "Client", value: "Inphonite" },
      { label: "Project", value: "Trifold Brochure" },
      { label: "Category", value: "Graphic Design / Print Design" },
    ],
    services: [caseStudyServices.creativeRetainer],
    related: ["navigation-restructure", "message-blast"],
  },
  {
    slug: "navigation-restructure",
    seoTitle: "Navigation Restructure for Inphonite | Fractionl Studio",
    metaDescription: "A focused navigation and information architecture restructure for Inphonite, improving clarity, discoverability, and alignment with its Kendo Telerik design system.",
    eyebrow: "INPHONITE",
    title: "Navigation Restructure",
    introduction: "A clearer, more predictable way to navigate the Inphonite platform.",
    summary: "This focused project improved navigation and information architecture within Inphonite by regrouping related features, clarifying labels and interaction states, and aligning the experience with a new Kendo Telerik–based design system.",
    heroImage: "/images/work/navigation-restructure/hero.webp",
    imageAlt: "Navigation Restructure project cover showing the updated Inphonite sidebar, dashboard, and account overview",
    images: [
      "/images/work/navigation-restructure/1.webp",
      "/images/work/navigation-restructure/4.webp",
      "/images/work/navigation-restructure/2.webp",
      "/images/work/navigation-restructure/3.webp",
    ],
    imageAlts: [
      "Legacy Inphonite home screen with tools distributed across a large grid of category tiles",
      "Inphonite information architecture diagram mapping navigation groups and feature relationships",
      "Updated Inphonite dashboard with a persistent sidebar and visible account and credit usage information",
      "Updated Inphonite sidebar with expandable navigation groups and consistent interaction states",
    ],
    details: [
      { label: "Client", value: "Inphonite" },
      { label: "Project", value: "Navigation Restructure" },
      { label: "Focus", value: "Navigation and information architecture" },
    ],
    overviewHeading: "A focused navigation restructure within the Inphonite platform.",
    overview: [
      "The project updated Inphonite’s legacy navigation system to improve usability, clarity, and consistency while aligning navigation patterns with a new Kendo Telerik–based design system.",
      "The scope was deliberately focused on improving navigation and information architecture within the existing platform. Given the available budget and scope, it was not a redesign of the entire Inphonite platform or a full information architecture overhaul.",
    ],
    challenge: {
      eyebrow: "The problem",
      heading: "A cluttered, inconsistent navigation system made everyday tools difficult to locate.",
      paragraphs: [
        "Related features were spread across multiple menus, labels lacked clarity, and visual states provided little hierarchy. As the navigation had grown over time, these inconsistencies created friction during everyday use.",
      ],
    },
    goals: [
      "Simplify navigation through clearer grouping and labeling",
      "Reduce friction when locating frequently used tools",
      "Improve visual hierarchy and interaction states",
      "Align navigation patterns with the Kendo Telerik design system",
    ],
    approach: [
      { title: "Regroup the navigation", body: "The structure was reorganized using input from the support team and common user pain points. Related features were grouped to reduce duplication, surface commonly used tools more clearly, and make navigation more predictable." },
      { title: "Align the interface system", body: "Spacing and alignment were refined for scannability, consistent hover, active, and selected states were introduced, and the sidebar was implemented with standardized Kendo Telerik components." },
      { title: "Improve utility and visibility", body: "The top navigation was enhanced to provide quicker access to account and settings, while visible credit usage indicators brought frequently needed account information into daily workflows." },
    ],
    solution: {
      heading: "A simpler structure with clearer hierarchy and more visible account utilities.",
      paragraphs: [
        "The solution replaced the legacy grid of tools with a cleaner, persistent sidebar that organizes features into recognizable groups and supports expandable states for related items.",
        "The updated top navigation and account view make settings and credit usage easier to access, while standardized components and interaction states keep the experience consistent with the design system.",
      ],
      highlights: [
        "Clearer feature grouping and labeling",
        "Reduced duplication across navigation areas",
        "Consistent hover, active, and selected states",
        "Standardized Kendo Telerik sidebar components",
        "More visible account and credit usage information",
      ],
    },
    visuals: [
      { title: "The legacy navigation", caption: "The previous home screen distributed tools across a large category-based tile grid, showing the density and fragmentation the restructure needed to address." },
      { title: "Reworking the information architecture", caption: "The supplied information architecture maps feature relationships and navigation groups before they are expressed in the updated interface." },
      { title: "The updated navigation system", caption: "The dashboard and expanded sidebar show the persistent navigation, clearer grouping, account access, and visible credit usage in context.", variant: "pair" },
    ],
    outcome: {
      heading: "A clearer, scalable navigation system for everyday Inphonite workflows.",
      paragraphs: ["The completed restructure made frequently used tools and reports faster to access while reducing navigation friction and bringing the interface into alignment with the design system."],
      improvements: [
        "Faster access to frequently used tools and reports",
        "Reduced navigation friction during everyday workflows",
        "Consistent, scalable navigation aligned with the design system",
        "Improved visibility into account and credit usage",
      ],
    },
    services: [caseStudyServices.fractionalProductDesign, caseStudyServices.technologyConsulting],
    related: ["message-blast", "pensioner-profile"],
    sourceUrl: "source-material/case-studies/navigation-restructure/Content.docx",
  },
  {
    slug: "pensioner-profile",
    seoTitle: "Pensioner Profile for ATRF | Fractionl Studio",
    metaDescription: "Pensioner Profile is a digital product feature created for ATRF’s MyPension portal, bringing beneficiary management into a guided, role-aware self-serve flow.",
    eyebrow: "ATRF",
    title: "Pensioner Profile",
    introduction: "A self-serve beneficiary management feature created for ATRF’s MyPension portal.",
    summary: "Pensioner Profile brings sensitive beneficiary updates into a secure, guided Request Status Update flow for Members, Pension Partners, and Nominees, replacing phone-based support and mailed documents with clearer in-product steps.",
    heroImage: "/images/work/pensioner-profile/hero.webp",
    imageAlt: "Pensioner Profile beneficiary management feature created for ATRF’s MyPension portal",
    images: [
      "/images/work/pensioner-profile/1.webp",
      "/images/work/pensioner-profile/2.webp",
      "/images/work/pensioner-profile/3.webp",
      "/images/work/pensioner-profile/4.webp",
    ],
    imageAlts: [
      "ATRF MyPension beneficiary management screen with a successful profile update confirmation",
      "Member beneficiary creation flow from adding a person through review and success",
      "Member beneficiary editing flow from adding a person through review and success",
      "Request Status Update flow showing request details and supporting document steps",
    ],
    details: [
      { label: "Client", value: "ATRF — Alberta Teachers’ Retirement Fund" },
      { label: "Project", value: "Pensioner Profile" },
      { label: "Product", value: "MyPension portal feature" },
    ],
    overviewHeading: "A focused digital product feature for beneficiary management.",
    overview: [
      "Pensioner Profile is a digital product feature created for ATRF’s MyPension portal. The work focused specifically on the Beneficiary module rather than a redesign of the wider ATRF website or platform.",
      "The feature was designed to let Members, Pension Partners, and Nominees manage or review sensitive beneficiary information through a guided, self-serve experience.",
    ],
    challenge: {
      eyebrow: "The problem",
      heading: "Manual processes and fragmented role-based flows made critical updates difficult to understand.",
      paragraphs: [
        "Users often needed to call ATRF or mail physical documents to request beneficiary changes, creating delays, confusion, and support overhead.",
        "Within the product, role-specific flows used inconsistent permissions and interface patterns. Users were frequently unsure what actions they could take, whether a change had been submitted successfully, and what would happen next.",
      ],
    },
    goals: [
      "Shift beneficiary management from support-led to self-serve",
      "Unify workflows across user roles while clearly communicating permissions",
      "Make request status, next steps, and outcomes explicit",
      "Improve accessibility for complex, form-heavy interactions",
      "Establish reusable patterns for future MyPension modules",
    ],
    approach: [
      { title: "A unified, role-aware framework", body: "A single beneficiary experience was designed across user roles, with interface states and messaging clarifying what each person could view, request, or manage." },
      { title: "Guided requests", body: "The Request Status Update flow organizes the task into selecting a change type, providing supporting details, uploading documents, and submitting the request for ATRF review." },
      { title: "Explicit feedback and reusable patterns", body: "Permission messaging, explained disabled states, inline validation, and consistent success and error feedback were combined with shared MUI-based input, upload, and confirmation components." },
    ],
    solution: {
      heading: "One consistent beneficiary experience, adapted to each user’s permissions.",
      paragraphs: [
        "Members can create or request beneficiary changes through a step-by-step flow. Pension Partners can submit update requests with supporting documents through a secure form, while Nominees receive a read-only view using the same familiar layout.",
        "After submission, the experience confirms success with a reference number and explains what happens next, making the request status and follow-up process more explicit.",
      ],
      highlights: [
        "Role-aware view, request, and management states",
        "Structured Request Status Update flow",
        "Supporting document upload",
        "Inline validation and consistent feedback",
        "Shared MUI-based interface components",
      ],
    },
    visuals: [
      { title: "Beneficiary management", caption: "The shared profile view presents Pension Partner and Beneficiary information together, with available actions and submission feedback visible in context." },
      { title: "Guided member flow", caption: "The supplied flow shows the sequence from adding a person and agreeing to terms through form completion, review, and success." },
      { title: "Role-aware updates", caption: "The supplied screens document the member editing journey and the Request Status Update path for submitting details and supporting documents.", variant: "pair" },
    ],
    outcome: {
      heading: "A design foundation for self-serve beneficiary management.",
      paragraphs: ["Full development was paused due to budget changes. The completed design work established a consistent foundation for role-aware, self-serve beneficiary management, but the projected outcomes in the source material were not presented as achieved results."],
    },
    services: [caseStudyServices.fractionalProductDesign, caseStudyServices.technologyConsulting],
    related: ["message-blast", "innquest-canada"],
    sourceUrl: "source-material/case-studies/pensioner-profile/Content.docx",
  },
  {
    slug: "restaurant-website-redesign",
    seoTitle: "Hudsons Canada's Pub Website Redesign | Fractionl Studio",
    metaDescription: "A UX and website overhaul for Hudsons Canada's Pub that simplified menus and reservations, improved mobile usability, and reduced operational friction.",
    eyebrow: "UX · Website overhaul",
    title: "Hudsons Canada’s Pub",
    introduction: "A simpler customer experience and a more flexible foundation for a multi-location pub.",
    summary: "The overhaul simplified menu discovery and reservations, improved mobile usability, and enabled internal teams to manage content and location-specific workflows without ongoing developer support.",
    heroImage: "/images/work/hudsons-canadas-pub/hero.avif",
    imageAlt: "Hudsons Canada’s Pub website shown across desktop and mobile screens",
    images: [
      "/images/work/hudsons-canadas-pub/1.webp",
      "/images/work/hudsons-canadas-pub/2.webp",
      "/images/work/hudsons-canadas-pub/3.webp",
      "/images/work/hudsons-canadas-pub/4.webp",
    ],
    details: [
      { label: "Client", value: "Hudsons Canada’s Pub" },
      { label: "Project", value: "UX and website overhaul" },
      { label: "Focus", value: "Customer experience and internal workflows" },
    ],
    overview: ["The project was a UX and website overhaul for Hudsons Canada’s Pub, focused on improving the customer experience while reducing operational friction across multiple locations.", "The redesigned experience needed to work for customers browsing menus or making reservations and for internal teams managing content and location-specific workflows."],
    challenge: { eyebrow: "The problem", heading: "The existing website created friction for customers and internal teams.", paragraphs: ["Customers struggled to browse menus and make reservations, particularly on mobile. Staff also depended on developers for routine content updates.", "Reservations from every location were routed into a single backend flow, making it difficult for teams to manage requests efficiently."] },
    goals: ["Simplify menu browsing and reservation flows", "Improve mobile navigation and readability", "Enable internal teams to manage content independently", "Clarify location-specific reservation workflows", "Create a scalable structure that supports growth across locations"],
    approach: [
      { title: "Re-structured information architecture", body: "The site’s information architecture was audited and reorganized to improve discoverability across key customer and staff journeys. Navigation and page hierarchy were simplified so menus, locations, and booking actions could be found without unnecessary steps." },
      { title: "Customer-focused experience", body: "Menu presentation was simplified for faster scanning, reservation and contact flows were streamlined, and mobile-first layouts supported in-venue and on-the-go use." },
      { title: "Team empowerment and CMS flexibility", body: "Modular, component-based page blocks enabled marketing and location staff to update menus, promotions, and content without developer involvement while clarifying location-specific reservations and inquiries." },
    ],
    solution: { heading: "A scalable design foundation for customer and staff journeys.", paragraphs: ["Consistent interface patterns and layout rules created a flexible system for promotions, menus, and individual location pages."], highlights: ["Simplified menu presentation", "Streamlined reservation and contact flows", "Mobile-first layouts", "Modular page blocks", "Location-specific reservation clarity"] },
    visuals: [
      { title: "The previous website", caption: "A reference view of the existing Hudsons website before the information architecture and interface were reorganized." },
      { title: "Prioritizing customer and business needs", caption: "Customer and team needs were organized by priority to inform the website structure." },
      { title: "From structure to interface", caption: "The reorganized navigation and redesigned page explorations show how the solution moved from information architecture into interface design.", variant: "pair" },
    ],
    outcome: { heading: "A more usable experience and a foundation built to scale.", paragraphs: ["The result improved usability for mobile-first customers and reduced reliance on developers for ongoing content updates."], improvements: ["Clearer, more manageable reservation handling across locations", "A scalable foundation for future growth and new locations"] },
    services: [caseStudyServices.websiteDesignDevelopment],
    related: ["innquest-canada", "message-blast"], sourceUrl: "https://nicole-buloran.com/work/restaurant-website-redesign",
  },
  {
    slug: "innquest-canada",
    seoTitle: "InnQuest Canada Website Redesign & Zoho CRM Integration | Fractionl Studio",
    metaDescription: "InnQuest Canada case study: a website redesign with a flexible CMS, clearer product navigation, and Zoho CRM-connected sales and support workflows.",
    eyebrow: "HOSPITALITY TECHNOLOGY",
    title: "InnQuest Canada",
    introduction: "A modern website and connected internal workflows built to support long-term growth.",
    summary: "What began as a capstone project evolved into an ongoing client partnership focused on website redesign, CMS flexibility, Zoho CRM integration, and scalable workflows across marketing, sales, and support.",
    heroImage: "/images/work/innquest-canada/hero.webp",
    imageAlt: "InnQuest Canada website redesign shown on a deep blue project cover",
    images: ["/images/work/innquest-canada/1.webp"],
    imageAlts: ["InnQuest Canada homepage and product page designs shown side by side"],
    details: [{ label: "Client", value: "InnQuest Canada" }, { label: "Project", value: "Website redesign and Zoho CRM integration" }, { label: "Industry", value: "Hospitality technology" }],
    overviewHeading: "A modern web presence connected to the teams and systems behind it.",
    overview: ["InnQuest’s website was redesigned to modernize the user experience and support long-term growth.", "The work expanded beyond the public-facing experience to improve CMS flexibility and connect marketing, sales, and support workflows."],
    challenge: { eyebrow: "The problem", heading: "Disconnected website, CRM, and support workflows created manual work.", paragraphs: ["InnQuest needed a modern web presence that clearly communicated its product offerings while enabling internal teams to manage content, leads, and support requests without relying on developers.", "As the business grew, disconnected workflows between the website, CRM, and support processes created inefficiencies and manual work."] },
    goals: ["Modernize the visual design and site architecture", "Improve product navigation and content discovery", "Enable non-technical teams to manage content independently", "Streamline lead capture and internal workflows through CRM integration", "Reduce manual handling of support inquiries"],
    approach: [{ title: "Website redesign", body: "The visual design was refreshed to align with SaaS best practices. Information architecture was improved for clearer product and resource navigation, with performance and responsiveness optimized across devices." }, { title: "CMS flexibility", body: "Modular page templates made repeatable updates easier, while a lightweight design system helped maintain consistency and enabled the marketing team to update content without developer involvement." }, { title: "Zoho CRM integration", body: "Website forms were integrated directly with Zoho CRM. Calls to action routed qualified leads into sales workflows, while support requests automatically created reference-numbered tickets and assigned them to the appropriate support team member." }],
    solution: { heading: "A scalable website foundation with connected sales and support workflows.", paragraphs: ["The redesigned website combined clearer product and resource navigation with a responsive visual system and reusable CMS templates.", "The Zoho CRM integration connected website interactions to internal workflows, reducing manual handoffs and improving visibility across client support interactions."], highlights: ["Refreshed visual design and site architecture", "Modular page templates", "Lightweight design system", "Zoho CRM-connected forms", "Automated support ticket creation and assignment"] },
    visuals: [{ title: "Website redesign", caption: "The supplied homepage and product page views show the refreshed website structure and product presentation." }],
    outcome: { heading: "A future-ready foundation for continued growth.", paragraphs: ["The work created a scalable web foundation, reduced reliance on developers for content and site updates, and connected sales and support workflows through Zoho CRM."], improvements: ["Faster, clearer handling of client inquiries through automated ticket creation", "A long-term client relationship built on trust, reliability, and iteration"] },
    services: [caseStudyServices.websiteDesignDevelopment], related: ["restaurant-website-redesign", "message-blast"], sourceUrl: "source-material/case-studies/innquest--canada/Content.docx",
  },
  {
    slug: "message-blast",
    seoTitle: "Message Blast for Inphonite | Fractionl Studio",
    metaDescription: "A case study of the Message Blast feature within Inphonite, unifying high-volume healthcare messaging into a clear, guided workflow.",
    eyebrow: "INPHONITE",
    title: "Message Blast",
    introduction: "A clearer, safer workflow for high-volume patient communications within the Inphonite platform.",
    summary: "Message Blast enables healthcare teams to send time-sensitive SMS and voice communications to thousands of patients. The redesigned feature unifies setup, scheduling, audience selection, and review so teams can understand delivery timing, recipients, and credit usage before sending.",
    heroImage: "/images/work/message-blast/hero.webp",
    imageAlt: "Message Blast feature interface within the Inphonite platform",
    images: [
      "/images/work/message-blast/1.webp",
      "/images/work/message-blast/2.avif",
      "/images/work/message-blast/3.avif",
      "/images/work/message-blast/4.avif",
    ],
    imageAlts: [
      "Message Blast setup screen with delivery method options in Inphonite",
      "Message Blast scheduling screen showing immediate, scheduled, and high-priority delivery options",
      "Message Blast audience screen showing filters, reachable recipients, exclusions, and missing contact data",
      "Message Blast final review screen summarizing delivery method, timing, recipients, and credit usage",
    ],
    details: [
      { label: "Client", value: "Inphonite" },
      { label: "Project", value: "Message Blast feature" },
      { label: "Platform", value: "Healthcare communications" },
    ],
    overviewHeading: "One focused feature within a broader healthcare communication platform.",
    overview: ["Message Blast is a feature within Inphonite, a broader platform used by healthcare teams to communicate with patients.", "The feature supports time-sensitive communications through SMS, voice, and fallback delivery to thousands of patients at once. The legacy experience was fragmented across multiple areas of the product, making it difficult to create, schedule, and send a blast with confidence."],
    challenge: { eyebrow: "The problem", heading: "Critical decisions were spread across a fragmented sending experience.", paragraphs: ["The existing experience lacked a clear, linear flow. Users had limited visibility into system logic and the consequences of their choices before committing to a large-scale delivery."], items: ["Messages could be sent at unintended times", "Credit usage could lead to billing questions", "Teams were uncertain about who would receive a message", "Users relied on support to understand usage and setup"] },
    goals: ["Create a clear, unified flow for creating and sending message blasts", "Make delivery behavior, priority, and credit usage explicit at every step", "Reduce errors in high-volume sends", "Increase confidence before committing to delivery", "Create a scalable foundation for future messaging features"],
    approach: [{ title: "Guided, step-based flow", body: "The experience was re-architected into a linear workflow covering message setup, scheduling, audience selection, and final review. This reduced fragmentation and made each decision easier to understand in sequence." }, { title: "Clear scheduling and priority logic", body: "Immediate and scheduled sends became explicit choices. High-priority messaging communicates queue behavior and increased credit usage before a user sends." }, { title: "Audience visibility and confirmation", body: "Audience selection surfaces reachable recipients, exclusions, and missing contact data. A consolidated review step then summarizes delivery method, timing, recipients, and total credit usage, with required confirmations before sending." }],
    solution: { heading: "Powerful messaging, with the consequences made clear before sending.", paragraphs: ["The unified flow gives healthcare teams one place to prepare and validate a Message Blast while remaining inside the broader Inphonite platform.", "At each step, the interface makes delivery behavior, audience eligibility, and credit impact visible. The final confirmation brings those decisions together before a high-volume send is released."], highlights: ["Linear setup, scheduling, audience, and review flow", "Explicit immediate, scheduled, and high-priority options", "Real-time audience eligibility visibility", "Consolidated delivery and credit summary", "Required confirmation before sending"] },
    visuals: [{ title: "Message setup", caption: "The first step gathers the blast details, content, and delivery method in one focused starting point." }, { title: "Scheduling and priority", caption: "Immediate and scheduled delivery are distinct choices, with high-priority queue behavior and double-credit usage stated upfront." }, { title: "Audience to final review", caption: "Audience eligibility is validated before a consolidated confirmation of timing, recipients, delivery method, and credit usage.", variant: "pair" }],
    outcome: { heading: "A clearer Message Blast experience for high-stakes communications.", paragraphs: ["The redesigned flow balances flexibility with clarity, giving healthcare teams control without unnecessary complexity."], improvements: ["Clearer, more intuitive message creation flow", "Reduced accidental high-priority sends", "Fewer support inquiries related to credit usage and message setup", "Increased confidence when sending large-scale communications"] },
    services: [caseStudyServices.fractionalProductDesign, caseStudyServices.technologyConsulting], related: ["innquest-canada", "restaurant-website-redesign"], sourceUrl: "https://nicole-buloran.com/work/message-blast",
  },
];

export const founderWork = [
  {
    title: "Nicole Buloran",
    businessType: "Founder & Product Designer",
    description: "9+ years in product design, UX/UI, SaaS, and web.",
    url: "https://nicole-buloran.com/work",
  },
  {
    title: "Nick Castillo",
    businessType: "Developer",
    description: "Full-stack development, SaaS integrations, and software implementation.",
    url: "https://nick-castillo.ca",
  },
] as const;

export const processSteps = [
  {
    index: "01",
    title: "Discover",
    description: "We learn about the business, the people using the experience, the current challenges, and what a successful outcome needs to look like.",
  },
  {
    index: "02",
    title: "Design",
    description: "We define the structure, flows, content, interfaces, and visual direction before committing to the full build.",
  },
  {
    index: "03",
    title: "Build",
    description: "We develop, test, refine, and launch the solution—with clear communication throughout the process.",
  },
] as const;

export const team = [
  {
    name: "Nicole Buloran",
    role: "Founder & Product Designer",
    bio: "Nicole brings more than nine years of experience designing SaaS products, marketing websites, user experiences, design systems, and digital tools. She focuses on making complex ideas clearer, more useful, and easier to bring to life.",
    image: nicoleHeadshot,
    imageAlt: "Nicole Buloran",
    tags: ["Product Design", "UX/UI Design", "Web Design", "Product Strategy"],
    portfolio: "https://nicole-buloran.com/",
    linkedin: "https://www.linkedin.com/in/nicolebuloran/",
    email: "nicoleb@fractionlstudio.com",
  },
  {
    name: "Nick Castillo",
    role: "Software Developer",
    bio: "Nick develops websites, web applications, and the technical systems behind them. His experience includes custom software, WordPress development, SaaS products, integrations, and long-term technical implementation.",
    image: nickHeadshot,
    imageAlt: "Nick Castillo",
    tags: ["Web Development", "Software Development", "Web Applications", "Technical Architecture"],
    portfolio: "https://nick-castillo.ca/",
    linkedin: "https://www.linkedin.com/in/nick-castillo-full-stack-developer/",
    email: "nickc@fractionlstudio.com",
  },
] as const;
