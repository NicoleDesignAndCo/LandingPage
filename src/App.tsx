import { ElementType, ReactNode, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, Navigate, NavLink, Route, Routes, useLocation, useParams, useSearchParams } from "react-router-dom";
import { founderWork, insights, processSteps, sampleWebsites, services, site, studioWork, team } from "./data";
import { useReveal, useScrolled } from "./hooks";

declare global {
  interface Window {
    Tally?: {
      loadEmbeds?: () => void;
      openPopup?: (
        formId: string,
        options?: {
          layout?: "default" | "modal";
          width?: number;
          emoji?: {
            text?: string;
            animation?: "none" | "wave" | "tada" | "heart-beat" | "spin" | "flash" | "bounce" | "rubber-band" | "head-shake";
          };
        },
      ) => void;
    };
  }
}

const navItems = [
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/work", label: "Work" },
  { to: "/insights", label: "Insights" },
  // { to: "/process", label: "How We Work" },
  { to: "/contact", label: "Contact" },
];

const pageMeta: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Nicole Design & Co. | Design & Development Partner for Growing Businesses",
    description:
      "Nicole Design & Co. helps businesses create, improve, and maintain websites, software, and digital experiences through thoughtful design, reliable development, and ongoing support.",
  },
  "/about": {
    title: "About | Nicole Design & Co.",
    description: "Nicole Design & Co. partners with businesses to bring ideas to life and support their growth online.",
  },
  "/services": {
    title: "Services | Nicole Design & Co.",
    description: "Product design, UX/UI design, web design, and development services for growing businesses.",
  },
  "/process": {
    title: "How We Work | Nicole Design & Co.",
    description: "A simple, considered process for discovery, design, and implementation.",
  },
  "/work": {
    title: "Selected Work | Nicole Design & Co.",
    description:
      "A mix of studio projects, founder work, and demos from Nicole Design & Co.",
  },
  "/team": {
    title: "Team | Nicole Design & Co.",
    description: "Meet Nicole Buloran and Nick Castillo, the design and development team behind Nicole Design & Co.",
  },
  "/insights": {
    title: "Insights | Nicole Design & Co.",
    description: "Practical notes about websites, social media, and building a stronger digital presence.",
  },
  "/contact": {
    title: "Contact | Nicole Design & Co.",
    description: "Start an inquiry with Nicole Design & Co. through the Tally inquiry bubble or email hello@nicoledesignandco.com.",
  },
};

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/process" element={<ProcessPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/insights/:slug" element={<InsightArticlePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <>
      <Seo />
      <TallyEmbedLoader />
      <Header />
      <main>{children}</main>
      <TallyFloatingButton />
      <Footer />
    </>
  );
}

function TallyEmbedLoader() {
  const location = useLocation();

  useEffect(() => {
    const scriptId = "tally-embed-script";
    const existingScript = document.getElementById(scriptId) as HTMLScriptElement | null;

    const loadTallyEmbeds = () => {
      window.Tally?.loadEmbeds?.();
    };

    if (existingScript) {
      loadTallyEmbeds();
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    script.onload = loadTallyEmbeds;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    window.Tally?.loadEmbeds?.();
  }, [location.pathname]);

  return null;
}

function Seo() {
  const location = useLocation();
  const meta = pageMeta[location.pathname] ?? pageMeta["/"];
  const url = `${site.domain}${location.pathname === "/" ? "/" : location.pathname}`;

  return (
    <Helmet>
      <html lang="en" />
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="keywords" content="product design, UX/UI design, web design, web development, design studio, Edmonton, Alberta, WordPress, SaaS design" />
      <meta name="author" content={site.name} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:locale" content="en_CA" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="geo.region" content="CA-AB" />
      <meta name="geo.placename" content="Edmonton" />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: site.name,
          description:
            "From websites and marketing materials to software products and custom digital solutions, we help businesses design, build, and improve their digital presence.",
          email: site.email,
          url: `${site.domain}/`,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Edmonton",
            addressRegion: "AB",
            addressCountry: "CA",
          },
          areaServed: "Worldwide",
          knowsAbout: ["Product Design", "UX/UI Design", "Web Design", "Web Development"],
        })}
      </script>
    </Helmet>
  );
}

function Header() {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}`} id="siteHeader">
      <div className="container header-inner">
        <Brand />
        <nav className="nav-desktop" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to}>
              {item.label}
            </NavLink>
          ))}
          <TallyButton className="nav-cta">Start a Project</TallyButton>
        </nav>
        <button
          className="nav-toggle"
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobileMenu"
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>
      <div className={`nav-mobile${open ? " open" : ""}`} id="mobileMenu" aria-hidden={!open}>
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to}>
            {item.label}
          </NavLink>
        ))}
        <TallyButton className="nav-cta">Start a Project</TallyButton>
      </div>
    </header>
  );
}

function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <Link className={`brand${footer ? " brand--footer" : ""}`} to="/" aria-label="Nicole Design and Co. home">
      <span className="brand-mark" aria-hidden="true">
        &amp;
      </span>
      <span className="brand-word">
        Nicole Design <span className="brand-amp">&amp;</span> Co.
      </span>
    </Link>
  );
}

function openTallyPopup() {
  if (window.Tally?.openPopup) {
    window.Tally.openPopup(site.tallyFormId, {
      layout: "modal",
      width: 700,
      emoji: {
        text: "👋",
        animation: "wave",
      },
    });
    return;
  }

  window.open(site.tallyUrl, "_blank", "noopener,noreferrer");
}

function TallyButton({ children, className }: { children: ReactNode; className: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={openTallyPopup}
    >
      {children}
    </button>
  );
}

function TallyFloatingButton() {
  return (
    <TallyButton className="tally-floating-button">
      <span className="tally-floating-button__icon" aria-hidden="true">
        +
      </span>
      <span className="tally-floating-button__text">Start an Inquiry</span>
    </TallyButton>
  );
}

function Reveal({ children, className = "", as = "div" }: { children: ReactNode; className?: string; as?: ElementType }) {
  const [ref, visible] = useReveal<HTMLElement>();
  const Component = as as ElementType;

  return (
    <Component ref={ref} className={`reveal${visible ? " in" : ""}${className ? ` ${className}` : ""}`}>
      {children}
    </Component>
  );
}

function SectionHeading({
  eyebrow,
  title,
  intro,
  twoLine = false,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  twoLine?: boolean;
}) {
  return (
    <Reveal className={`section-head${twoLine ? " section-head--2line" : " section-head--wide"}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      {intro ? <p className="section-intro">{intro}</p> : null}
    </Reveal>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ServicesSection />
      <ProcessSection />
      <SampleWebsitesSection />
      <TeamSection />
      <InsightsPreviewSection />
      <ContactSection />
    </>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <Reveal as="p" className="eyebrow">
          Product Design · Web Development · Digital Support
        </Reveal>
        <Reveal as="h1" className="hero-title">
          Years of experience. Now fully yours.
        </Reveal>
        <Reveal as="p" className="hero-sub">
          Nicole Design &amp; Co. brings together product design and full-stack development — the same expertise behind real SaaS products,
          enterprise websites, and healthcare platforms. Now available full time.
        </Reveal>
        <Reveal className="hero-actions">
          <TallyButton className="btn btn-primary">Start a Project</TallyButton>
          <Link to="/work" className="btn btn-ghost">
            View Our Work
          </Link>
        </Reveal>
      </div>
      <Reveal className="container hero-meta">
        <div className="meta-rule" />
        <ul className="hero-disciplines">
          <li>Product Design</li>
          <li>Websites</li>
          <li>Development</li>
          <li>Digital Support</li>
        </ul>
      </Reveal>
    </section>
  );
}

function AboutPage() {
  return (
    <PageShell eyebrow="About the studio" title="Your Design & Development Partner">
      <AboutSection standalone />
      <TeamSection standalone />
      <ProcessSection />
    </PageShell>
  );
}

function AboutSection({ standalone = false }: { standalone?: boolean }) {
  return (
    <section className={`about${standalone ? " page-section" : ""}`}>
      <div className="container about-grid">
        <Reveal as="p" className="eyebrow">
          About the studio
        </Reveal>
        <Reveal className="about-body">
          <h2 className="about-lead">{standalone ? "Your Design & Development Partner" : "Small studio. Thoughtful work."}</h2>
          {standalone ? (
            <>
              <p className="about-text">Nicole Design &amp; Co. partners with businesses to bring ideas to life and support their growth online.</p>
              <p className="about-text">
                From websites and software to marketing materials and ongoing improvements, we combine design thinking with technical expertise to
                create solutions that are both effective and easy to maintain.
              </p>
              <p className="about-text">Our goal is simple: help businesses move forward with confidence.</p>
            </>
          ) : (
            <>
              <p className="about-text">
                We&apos;ve spent years doing this work at a high level across SaaS, hospitality, healthcare, and more. Now we&apos;re doing it for you
                full time.
              </p>
              <Link className="text-link" to="/about">
                Learn about the studio
              </Link>
            </>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function ServicesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal as="p" className="eyebrow">
            What we do
          </Reveal>
          <Reveal as="h1" className="page-title page-title--services">
            Your own digital growth support team.
          </Reveal>
          <Reveal as="p" className="page-hero-sub">
            From websites and digital marketing support to product design and development, we help small businesses and product teams build,
            maintain, and improve their digital presence.
          </Reveal>
        </div>
      </section>
      <ServicesIntroSection />
      <DigitalSupportPackagesSection />
      <ProductSupportSection />
      <PackageGuidanceSection />
      <CustomEngagementsSection />
      <CapabilitiesSection />
      <ServicesFinalCta />
    </>
  );
}

const digitalSupportPackages = [
  {
    index: "01",
    title: "Website Reliability",
    price: "$99/month",
    outcome: "Your website stays secure, updated, and online.",
    includes: ["Hosting", "Security updates", "Backups", "Monitoring", "Bug fixes", "Software updates"],
  },
  {
    index: "02",
    title: "Website Presence",
    price: "$249/month",
    outcome: "Your website stays current, professional, and aligned with your business.",
    includes: [
      "Everything in Website Reliability",
      "Quarterly website review",
      "Website health & performance review",
      "Content update recommendations",
      "SEO opportunities",
      "User experience improvements",
      "Lead generation opportunities",
      "Quarterly website improvements to existing pages",
    ],
  },
  {
    index: "03",
    title: "Growth Partner",
    price: "$599/month",
    outcome: "Your on-demand digital growth and support team.",
    includes: [
      "Everything in Website Presence",
      "Up to 10 hours of digital support per month",
      "Website updates & improvements",
      "Landing pages",
      "Social media graphics",
      "Ad creative",
      "Marketing materials",
      "Email graphics",
      "Event & promotional assets",
      "Priority response time (1 business day)",
    ],
  },
] as const;

const packageGuidance = [
  {
    title: "Website Reliability",
    description: "You already have a website and simply want it secure, updated, and online.",
  },
  {
    title: "Website Presence",
    description: "You want your website reviewed, maintained, and kept aligned with your business.",
  },
  {
    title: "Growth Partner",
    description: "You need ongoing website, design, and marketing support.",
  },
  {
    title: "Product Design Partner",
    description: "You have a SaaS product, platform, or application that needs ongoing design support.",
  },
] as const;

const productDesignIncludes = [
  "UX/UI design",
  "User flows",
  "Wireframes",
  "High-fidelity mockups",
  "Interactive prototypes",
  "Design systems",
  "Developer handoff",
  "Product recommendations",
  "Async collaboration",
] as const;

const productDesignBestFor = ["SaaS startups", "Product teams", "Software companies", "Founders building digital products"] as const;

const customEngagements = [
  "Product design projects",
  "SaaS feature design",
  "Website redesigns",
  "Frontend development support",
  "Landing page design",
  "Marketing campaigns",
  "Design systems",
  "Event and promotional assets",
  "Marketing materials",
  "Website migrations",
  "Custom digital initiatives",
] as const;

const contactInquiryOptions = [
  {
    title: "Website Support",
    description: "For businesses that need help keeping their website secure, updated, and running smoothly.",
  },
  {
    title: "Digital Growth Support",
    description: "For businesses that need ongoing website updates, marketing materials, landing pages, or social media assets.",
  },
  {
    title: "Product Design Support",
    description: "For SaaS teams, startups, or founders who need UX/UI design, product flows, prototypes, or design systems.",
  },
  {
    title: "Custom Projects",
    description:
      "For website redesigns, frontend development, landing pages, marketing assets, or projects that do not fit neatly into a package.",
  },
] as const;

const contactChecklist = [
  "Your business name",
  "What you need help with",
  "Your website or product link, if available",
  "Any timeline you have in mind",
  "Your budget range, if you already know it",
  "The best way to reach you",
] as const;

const contactNextSteps = [
  {
    title: "Send an Inquiry",
    description: "Use the Tally bubble to tell us what you need help with.",
  },
  {
    title: "We'll Review Your Request",
    description: "We'll look at your business, website, or product and determine the best starting point.",
  },
  {
    title: "We'll Follow Up",
    description: "If it feels like a good fit, we'll reach out with next steps, questions, or a recommended package.",
  },
] as const;

const capabilities = [
  {
    title: "Digital Presence",
    items: ["Website design", "Website development", "Website maintenance", "Landing pages", "SEO foundations", "Analytics setup"],
  },
  {
    title: "Marketing Support",
    items: ["Social media graphics", "Ad creative", "Brochures", "Business cards", "Event booth materials", "Email graphics", "Promotional assets"],
  },
  {
    title: "Product Support",
    items: ["Product design", "UX/UI design", "Feature flows", "Wireframes", "Prototypes", "Design systems", "Developer handoff"],
  },
  {
    title: "Technical Support",
    items: ["Frontend development", "React", "WordPress", "CMS updates", "Integrations", "Performance improvements"],
  },
] as const;

function ServicesIntroSection() {
  return <></>
  // return (
  //   <section className="about page-section services-intro">
  //     <div className="container about-grid">
  //       <Reveal as="p" className="eyebrow">
  //         Digital growth support
  //       </Reveal>
  //       <Reveal className="about-body">
  //         <h2 className="about-lead">A digital growth and support team for the work that keeps moving.</h2>
  //         <p className="about-text">
  //           Nicole Design &amp; Co. helps businesses and product teams maintain a stronger digital presence, improve existing experiences, and
  //           move important design and development work forward without adding another full-time hire.
  //         </p>
  //       </Reveal>
  //     </div>
  //   </section>
  // );
}

function DigitalSupportPackagesSection() {
  return (
    <section className="services services-page-section services-page-section--tint">
      <div className="container">
        <SectionHeading
          eyebrow="Digital support packages"
          title="Ongoing support for your website, marketing, and digital presence."
          intro="Choose the level of help that fits where your business is today."
        />
        <div className="services-grid services-grid--three">
          {digitalSupportPackages.map((service) => (
            <Reveal as="article" className="service-card service-card--package" key={service.title}>
              <span className="service-index">{service.index}</span>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-price">{service.price}</p>
              <p className="service-label">Outcome:</p>
              <p className="service-desc">{service.outcome}</p>
              <p className="service-label">What's Included:</p>
              <ul className="compact-list">
                {service.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductSupportSection() {
  return (
    <section className="services services-page-section services-page-section--white">
      <div className="container">
        <SectionHeading
          eyebrow="Product support"
          title="Product Design Partner"
          intro="Ongoing product design support for teams that need help designing, improving, and shipping better digital products."
        />
        <Reveal as="article" className="service-card product-support-card">
          <div className="product-support-main">
            <span className="service-index">Starting at $1,500/month</span>
            <h3 className="service-title">Product Design Partner</h3>
            <p className="service-desc">
              Ongoing product design support for teams that need help designing, improving, and shipping better digital products.
            </p>
            <TallyButton className="btn btn-primary">Explore Product Support</TallyButton>
          </div>
          <div className="product-support-lists">
            <div>
              <p className="service-label">Includes:</p>
              <ul className="compact-list">
                {productDesignIncludes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="service-label">Best for:</p>
              <ul className="compact-list">
                {productDesignBestFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PackageGuidanceSection() {
  return (
    <section className="services services-page-section services-page-section--tint">
      <div className="container">
        <SectionHeading
          eyebrow="Package guidance"
          title="Which Package Is Right For You?"
          intro="A quick way to narrow the options before you reach out."
        />
        <div className="work-grid guidance-grid">
          {packageGuidance.map((item) => (
            <Reveal as="article" className="work-card guidance-card" key={item.title}>
              <h3 className="work-title">{item.title}</h3>
              <p className="service-label">Choose this if:</p>
              <p className="work-desc">{item.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CustomEngagementsSection() {
  return (
    <section className="process services-page-section services-page-section--white">
      <div className="container">
        <SectionHeading
          eyebrow="Custom engagements"
          title="Not Seeing What You're Looking For?"
          intro="Every business is different. Whether you need a custom website, product design support, development assistance, marketing assets, landing pages, or a combination of services, we can tailor an engagement to fit your needs."
        />
        <Reveal>
          <h3 className="service-title service-title--sub">Common Custom Engagements</h3>
          <ul className="tag-grid">
            {customEngagements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <TallyButton className="btn btn-primary custom-quote-btn">Request a Custom Quote</TallyButton>
        </Reveal>
      </div>
    </section>
  );
}

function CapabilitiesSection() {
  return (
    <section className="services services-page-section services-page-section--tint">
      <div className="container">
        <SectionHeading
          eyebrow="Capabilities"
          title="The expertise behind each engagement."
          intro="Our packages are built around outcomes, but every engagement draws from a combination of design, development, marketing, and product expertise."
        />
        <div className="services-grid capabilities-grid">
          {capabilities.map((group) => (
            <Reveal as="article" className="service-card capability-card" key={group.title}>
              <h3 className="service-title">{group.title}</h3>
              <ul className="compact-list">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesFinalCta() {
  return (
    <section className="contact">
      <div className="container contact-inner">
        <Reveal as="p" className="eyebrow">
          Get in touch
        </Reveal>
        <Reveal as="h2" className="contact-title">
          Need a digital partner you can actually rely on?
        </Reveal>
        <Reveal as="p" className="contact-text">
          Whether you need website support, marketing assets, product design, or ongoing digital help, we can help you choose the right starting
          point.
        </Reveal>
        <Reveal className="contact-actions">
          <TallyButton className="btn btn-primary btn-lg">Start a Project</TallyButton>
          <Link className="btn btn-ghost btn-lg" to="/work">
            View Sample Work
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function ServicesSection({ standalone = false }: { standalone?: boolean }) {
  return (
    <section className={`services${standalone ? " page-section" : ""}`}>
      <div className="container">
        {!standalone ? (
          <SectionHeading
            eyebrow="What we do"
            title={<>Support packages built around<br />how your business grows.</>}
            intro="From reliable website maintenance to ongoing product and marketing support, choose the level of help that fits where your business is today."
            twoLine
          />
        ) : null}
        <div className={`services-grid${!standalone ? " services-grid--preview" : ""}`}>
          {services.map((service) => (
            <Reveal as="article" className="service-card" key={service.title}>
              <span className="service-index">{service.index}</span>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.description}</p>
              {!standalone ? (
                <Link className="card-link" to="/services">
                  View services
                </Link>
              ) : null}
            </Reveal>
          ))}
        </div>
        {!standalone ? (
          <Reveal className="section-action">
            <Link className="text-link" to="/services">
              Explore all services
            </Link>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

function ProcessPage() {
  return (
    <PageShell eyebrow="How we work" title="A simple, considered process">
      <ProcessSection standalone />
    </PageShell>
  );
}

function ProcessSection({ standalone = false }: { standalone?: boolean }) {
  return (
    <section className={`process${standalone ? " page-section" : ""}`}>
      <div className="container">
        {!standalone ? (
          <SectionHeading
            eyebrow="How we work"
            title={<>A simple,<br />considered process</>}
            intro="We keep projects focused through three practical stages: understand the problem, shape the experience, then bring it to life."
            twoLine
          />
        ) : null}
        <ol className="process-list">
          {processSteps.map((step) => (
            <Reveal as="li" className="process-step" key={step.title}>
              <span className="process-num">{step.index}</span>
              <div className="process-body">
                <h3 className="process-title">{step.title}</h3>
                <p className="process-desc">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </ol>
        {/* {!standalone ? (
          <Reveal className="section-action">
            <Link className="text-link" to="/process">
              See the process
            </Link>
          </Reveal>
        ) : null} */}
      </div>
    </section>
  );
}

function WorkPage() {
  return (
    <PageShell
      eyebrow="Selected work"
      title="Selected Work"
      intro="A mix of studio projects, founder work, and demos showing what we build."
    >
      <WorkSection title="Studio Work" items={studioWork} linkLabel="View Project" />
      <WorkSection title="Founder Work" items={founderWork} linkLabel="View Portfolio" alternate />
      <WorkSection
        title="Sample Sites"
        intro="Demos showing what we can build across different industries."
        items={sampleWebsites}
        linkLabel="View Demo"
      />
      <WorkFinalCta />
    </PageShell>
  );
}

type WorkItem = {
  title: string;
  businessType: string;
  description: string;
  url: string;
};

function WorkSection({
  title,
  intro,
  items,
  linkLabel,
  alternate = false,
}: {
  title: string;
  intro?: string;
  items: readonly WorkItem[];
  linkLabel: string;
  alternate?: boolean;
}) {
  return (
    <section className={`work-collection${alternate ? " work-collection--alternate" : ""}`}>
      <div className="container">
        <SectionHeading eyebrow="Selected work" title={title} intro={intro} />
        <div className={`work-grid${items.length === 2 ? " work-grid--two" : ""}`}>
          {items.map((item) => (
            <Reveal as="article" className="work-card" key={item.title}>
              <h3 className="work-title">{item.title}</h3>
              <p className="work-type">{item.businessType}</p>
              <p className="work-desc">{item.description}</p>
              <a className="card-link" href={item.url} target="_blank" rel="noopener noreferrer">
                {linkLabel}<span className="link-arrow" aria-hidden="true">↗</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SampleWebsitesSection({ standalone = false }: { standalone?: boolean }) {
  return (
    <section className={`work-preview${standalone ? " page-section" : ""}`}>
      <div className="container">
        {!standalone ? (
          <SectionHeading
            eyebrow="Sample websites"
            title="A few demos of what thoughtful digital presence can feel like."
            intro="These concept sites show different tones, industries, and user journeys without turning the homepage into a full portfolio."
          />
        ) : null}
        <div className="work-grid">
          {sampleWebsites.map((website) => (
            <Reveal as="article" className="work-card" key={website.title}>
              <h3 className="work-title">{website.title}</h3>
              <p className="work-type">{website.businessType}</p>
              <p className="work-desc">{website.description}</p>
              <a className="card-link" href={website.url} target="_blank" rel="noopener">
                View Demo<span className="link-arrow" aria-hidden="true">↗</span>
              </a>
            </Reveal>
          ))}
        </div>
        {/* {!standalone ? (
          <Reveal className="section-action">
            <Link className="text-link" to="/work">
              View sample work
            </Link>
          </Reveal>
        ) : null} */}
      </div>
    </section>
  );
}

function WorkFinalCta() {
  return (
    <section className="work-cta">
      <div className="container work-cta-inner">
        <Reveal as="h2" className="work-cta-title">
          Want something like this for your business?
        </Reveal>
        <Reveal>
          <TallyButton className="btn btn-primary btn-lg">Start a Project</TallyButton>
        </Reveal>
      </div>
    </section>
  );
}

function TeamPage() {
  return (
    <PageShell eyebrow="The team" title="Two people, one thoughtful workflow">
      <TeamSection standalone />
    </PageShell>
  );
}

const INSIGHTS_PER_PAGE = 3;

function InsightsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedPage = Number(searchParams.get("page") ?? "1");
  const pageCount = Math.ceil(insights.length / INSIGHTS_PER_PAGE);
  const currentPage = Number.isInteger(requestedPage) && requestedPage >= 1 && requestedPage <= pageCount ? requestedPage : 1;
  const visibleInsights = insights.slice((currentPage - 1) * INSIGHTS_PER_PAGE, currentPage * INSIGHTS_PER_PAGE);

  const changePage = (page: number) => {
    setSearchParams(page === 1 ? {} : { page: String(page) });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <section className="page-hero insights-hero">
        <div className="container insights-hero__grid">
          <div>
            <Reveal as="p" className="eyebrow">
              Ideas for a better digital presence
            </Reveal>
            <Reveal as="h1" className="page-title page-title--insights">
              Useful things, clearly explained.
            </Reveal>
          </div>
          <Reveal as="p" className="page-hero-sub insights-hero__intro">
            Practical notes about websites, social media, and the small decisions that help your business show up better online.
          </Reveal>
        </div>
      </section>

      <section className="insights-index" aria-labelledby="insights-heading">
        <div className="container">
          <div className="insights-index__head">
            <h2 id="insights-heading" className="insights-index__title">Latest insights</h2>
            <p className="insights-index__count">Showing {visibleInsights.length} of {insights.length}</p>
          </div>
          <div className="insights-grid">
            {visibleInsights.map((article, index) => (
              <Reveal as="article" className="insight-card" key={article.slug}>
                <Link className={`insight-card__visual insight-card__visual--${article.accent}`} to={`/insights/${article.slug}`} aria-hidden="true" tabIndex={-1}>
                  <span>{String((currentPage - 1) * INSIGHTS_PER_PAGE + index + 1).padStart(2, "0")}</span>
                  <span className="insight-card__shape" />
                </Link>
                <div className="insight-card__body">
                  <div className="insight-card__meta">
                    <span>{article.category}</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="insight-card__title">
                    <Link to={`/insights/${article.slug}`}>{article.title}</Link>
                  </h3>
                  <p className="insight-card__excerpt">{article.excerpt}</p>
                  <Link className="insight-card__link" to={`/insights/${article.slug}`}>
                    Read insight <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>

          <nav className="pagination" aria-label="Insights pagination">
            <button type="button" onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1} aria-label="Previous page">
              <span aria-hidden="true">←</span> Previous
            </button>
            <div className="pagination__pages">
              {Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => (
                <button
                  type="button"
                  className={page === currentPage ? "active" : ""}
                  onClick={() => changePage(page)}
                  aria-current={page === currentPage ? "page" : undefined}
                  aria-label={`Page ${page}`}
                  key={page}
                >
                  {String(page).padStart(2, "0")}
                </button>
              ))}
            </div>
            <button type="button" onClick={() => changePage(currentPage + 1)} disabled={currentPage === pageCount} aria-label="Next page">
              Next <span aria-hidden="true">→</span>
            </button>
          </nav>
        </div>
      </section>
    </>
  );
}

function InsightsPreviewSection() {
  return (
    <section className="insights-preview">
      <div className="container">
        <div className="insights-preview__head">
          <SectionHeading
            eyebrow="Ideas for a better digital presence"
            title="A few useful things, clearly explained."
            intro="Practical notes about websites, social media, and showing up better online."
          />
          <Reveal>
            <Link className="btn btn-ghost" to="/insights">
              Explore all insights <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
        <div className="insights-grid">
          {insights.slice(0, 3).map((article, index) => (
            <Reveal as="article" className="insight-card" key={article.slug}>
              <Link
                className={`insight-card__visual insight-card__visual--${article.accent}`}
                to={`/insights/${article.slug}`}
                aria-hidden="true"
                tabIndex={-1}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span className="insight-card__shape" />
              </Link>
              <div className="insight-card__body">
                <div className="insight-card__meta">
                  <span>{article.category}</span>
                  <span>{article.readTime}</span>
                </div>
                <h3 className="insight-card__title">
                  <Link to={`/insights/${article.slug}`}>{article.title}</Link>
                </h3>
                <p className="insight-card__excerpt">{article.excerpt}</p>
                <Link className="insight-card__link" to={`/insights/${article.slug}`}>
                  Read insight <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="insights-preview__mobile-action">
          <Link className="btn btn-ghost" to="/insights">
            Explore all insights <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function InsightArticlePage() {
  const { slug } = useParams();
  const article = insights.find((item) => item.slug === slug);

  if (!article) {
    return <Navigate to="/insights" replace />;
  }

  const articleIndex = insights.findIndex((item) => item.slug === article.slug);
  const relatedInsights = Array.from(
    { length: 3 },
    (_, index) => insights[(articleIndex + index + 1) % insights.length],
  );

  return (
    <>
      <Helmet>
        <title>{article.title} | Nicole Design &amp; Co.</title>
        <meta name="description" content={article.excerpt} />
        <link rel="canonical" href={`${site.domain}/insights/${article.slug}`} />
      </Helmet>
      <article className="article">
        <header className="article-hero">
          <div className="container article-hero__inner">
            <Reveal>
              <Link className="article-back" to="/insights">← All insights</Link>
            </Reveal>
            <Reveal className="article-meta">
              <span>{article.category}</span>
              <span>{article.date}</span>
              <span>{article.readTime}</span>
            </Reveal>
            <Reveal as="h1" className="article-title">{article.title}</Reveal>
            <Reveal as="p" className="article-deck">{article.excerpt}</Reveal>
          </div>
        </header>
        <div className="container article-layout">
          <aside className="article-aside">
            <p className="eyebrow">In this insight</p>
            <ol>
              {article.sections.map((section) => <li key={section.heading}>{section.heading}</li>)}
            </ol>
          </aside>
          <div className="article-content">
            <p className="article-intro">{article.intro}</p>
            {article.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                <p>{section.body}</p>
              </section>
            ))}
            <div className="article-note">
              <p className="eyebrow">A final thought</p>
              <h2>Small improvements compound.</h2>
              <p>You do not need to fix everything at once. Choose the clearest next step, make it useful, and keep paying attention.</p>
            </div>
            <Link className="article-back article-back--bottom" to="/insights">← Back to all insights</Link>
          </div>
        </div>
        <section className="related-insights" aria-labelledby="related-insights-title">
          <div className="container">
            <div className="related-insights__head">
              <div>
                <p className="eyebrow">Keep exploring</p>
                <h2 className="section-title" id="related-insights-title">Related insights</h2>
              </div>
              <Link className="text-link" to="/insights">View all insights →</Link>
            </div>
            <div className="insights-grid">
              {relatedInsights.map((relatedArticle) => {
                const relatedIndex = insights.findIndex((item) => item.slug === relatedArticle.slug);

                return (
                  <Reveal as="article" className="insight-card" key={relatedArticle.slug}>
                    <Link
                      className={`insight-card__visual insight-card__visual--${relatedArticle.accent}`}
                      to={`/insights/${relatedArticle.slug}`}
                      aria-hidden="true"
                      tabIndex={-1}
                    >
                      <span>{String(relatedIndex + 1).padStart(2, "0")}</span>
                      <span className="insight-card__shape" />
                    </Link>
                    <div className="insight-card__body">
                      <div className="insight-card__meta">
                        <span>{relatedArticle.category}</span>
                        <span>{relatedArticle.readTime}</span>
                      </div>
                      <h3 className="insight-card__title">
                        <Link to={`/insights/${relatedArticle.slug}`}>{relatedArticle.title}</Link>
                      </h3>
                      <p className="insight-card__excerpt">{relatedArticle.excerpt}</p>
                      <Link className="insight-card__link" to={`/insights/${relatedArticle.slug}`}>
                        Read insight <span aria-hidden="true">↗</span>
                      </Link>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      </article>
    </>
  );
}

function TeamSection({ standalone = false }: { standalone?: boolean }) {
  return (
    <section className={`team${standalone ? " team--page page-section" : ""}`}>
      <div className="container">
        {!standalone ? (
          <SectionHeading
            eyebrow="The people"
            title="The people behind the work."
            intro="Nicole Buloran and Nick Castillo bring product design, web design, and development together in one small studio."
          />
        ) : (
          <Reveal className="section-head section-head--wide">
            <p className="eyebrow">The people</p>
            <h2 className="section-title">The people behind the work.</h2>
            <p className="section-intro page-intro">
              Nicole Design &amp; Co. combines design strategy and development expertise. Explore our individual portfolios to learn more about
              our experience and selected projects.
            </p>
          </Reveal>
        )}
        <div className={`team-grid${!standalone ? " team-grid--preview" : ""}`}>
          {team.map((member) => (
            <Reveal as="article" className="team-card" key={member.name}>
              {standalone ? <img className="team-photo" src={member.image} alt={member.imageAlt} /> : null}
              <div className="team-info">
                <h3 className="team-name">{member.name}</h3>
                <p className="team-role">{member.role}</p>
                {standalone ? (
                  <>
                    <p className="team-bio">{member.bio}</p>
                    <ul className="team-tags">
                      {member.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                    <div className="team-actions">
                      <a href={member.portfolio} target="_blank" rel="noopener" className="team-link team-link--primary">
                        View Portfolio<span className="link-arrow" aria-hidden="true">↗</span>
                      </a>
                      <a href={member.linkedin} target="_blank" rel="noopener" className="team-link">
                        LinkedIn
                      </a>
                      <a href={`mailto:${member.email}`} className="team-link">
                        Email
                      </a>
                    </div>
                  </>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
        {!standalone ? (
          <Reveal className="section-action">
            <Link className="text-link" to="/team">
              Meet the team
            </Link>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

function ContactPage() {
  return (
    <>
      <section className="contact-page-hero">
        <div className="container contact-page-hero__inner">
          <Reveal as="p" className="eyebrow">
            Contact
          </Reveal>
          <Reveal as="h1" className="page-title contact-page-title">
            Let's Talk About What You're Building
          </Reveal>
          <Reveal as="p" className="page-hero-sub contact-page-sub">
            Whether you need a new website, ongoing digital support, product design, or custom development help, start by sending us a quick note
            through the inquiry bubble.
          </Reveal>
          <Reveal className="hero-actions">
            <TallyButton className="btn btn-primary">Start a Project</TallyButton>
            <Link to="/services" className="btn btn-ghost">
              View Services
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="services contact-page-section contact-page-section--tint">
        <div className="container">
          <SectionHeading eyebrow="Inquiry options" title="What Can We Help With?" />
          <div className="services-grid contact-options-grid">
            {contactInquiryOptions.map((option) => (
              <Reveal as="article" className="service-card contact-option-card" key={option.title}>
                <h3 className="service-title">{option.title}</h3>
                <p className="service-desc">{option.description}</p>
                <TallyButton className="card-link contact-card-cta">Start an Inquiry</TallyButton>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-page-section contact-page-section--white">
        <div className="container contact-info-grid">
          <Reveal>
            <p className="eyebrow">Helpful details</p>
            <h2 className="section-title">What Should You Include?</h2>
            <p className="section-intro">You do not need to have everything figured out. A short message is enough to start.</p>
          </Reveal>
          <Reveal>
            <ul className="compact-list contact-checklist">
              {contactChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="process contact-page-section contact-page-section--tint">
        <div className="container">
          <SectionHeading eyebrow="Process" title="What Happens Next?" />
          <ol className="process-list">
            {contactNextSteps.map((step, index) => (
              <Reveal as="li" className="process-step" key={step.title}>
                <span className="process-num">{String(index + 1).padStart(2, "0")}</span>
                <div className="process-body">
                  <h3 className="process-title">{step.title}</h3>
                  <p className="process-desc">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="contact-page-section contact-page-section--white">
        <div className="container contact-info-grid">
          <Reveal>
            <p className="eyebrow">Alternative contact</p>
            <h2 className="section-title">Prefer Email?</h2>
            <p className="section-intro">You can also reach us directly at:</p>
          </Reveal>
          <Reveal className="contact-direct">
            <p className="footer-label">Email</p>
            <a className="contact-direct__link" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            <p className="footer-label">Location</p>
            <p>{site.location}</p>
          </Reveal>
        </div>
      </section>

      <section className="contact">
        <div className="container contact-inner">
          <Reveal as="h2" className="contact-title">
            Ready to Start?
          </Reveal>
          <Reveal as="p" className="contact-text">
            Use the inquiry bubble to tell us what you're working on. We'll take it from there.
          </Reveal>
          <Reveal className="contact-actions">
            <TallyButton className="btn btn-primary btn-lg">Start a Project</TallyButton>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function ContactSection({ standalone = false }: { standalone?: boolean }) {
  return (
    <section className={`contact${standalone ? " contact--page" : ""}`}>
      <div className="container contact-inner">
        <Reveal as="p" className="eyebrow">
          Get in touch
        </Reveal>
        <Reveal as="h2" className="contact-title">
          Need a design and development partner?
        </Reveal>
        <Reveal as="p" className="contact-text">
          Whether you're launching something new, improving an existing product, or need extra design support, we'd love to hear what you're
          working on.
        </Reveal>
        <Reveal>
          <a className="contact-email" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </Reveal>
        <Reveal>
          <TallyButton className="btn btn-primary btn-lg">Start a Project</TallyButton>
        </Reveal>
      </div>
    </section>
  );
}

function PageShell({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro?: string; children: ReactNode }) {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal as="p" className="eyebrow">
            {eyebrow}
          </Reveal>
          <Reveal as="h1" className="page-title">
            {title}
          </Reveal>
          {intro ? (
            <Reveal as="p" className="page-hero-sub">
              {intro}
            </Reveal>
          ) : null}
        </div>
      </section>
      {children}
    </>
  );
}

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Brand footer />
          <p className="footer-loc">{site.location}</p>
          <a className="footer-mail" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </div>

        {team.map((member) => (
          <div className="footer-col" key={member.name}>
            <p className="footer-label">{member.name}</p>
            <a href={`mailto:${member.email}`}>{member.email}</a>
            <a href={member.linkedin} target="_blank" rel="noopener">
              LinkedIn
            </a>
            <a href={member.portfolio} target="_blank" rel="noopener">
              Portfolio
            </a>
          </div>
        ))}
      </div>
      <div className="container footer-bottom">
        <p>&copy; {year} Nicole Design &amp; Co. All rights reserved.</p>
        <p>Designed &amp; built in Edmonton, AB.</p>
      </div>
    </footer>
  );
}

export default App;
