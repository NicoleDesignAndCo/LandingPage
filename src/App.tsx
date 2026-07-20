import { ElementType, ReactNode, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, Navigate, NavLink, Route, Routes, useLocation, useParams } from "react-router-dom";
import { caseStudies, founderWork, processSteps, sampleWebsites, site, studioWork, team, type CaseStudy } from "./data";
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
  // { to: "/process", label: "How We Work" },
  { to: "/contact", label: "Contact" },
];

const pageMeta: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Digital Design & Development Studio | Fractionl Studio",
    description:
      "Fractionl Studio helps startups, growing businesses, and internal teams plan, design, build, and support websites, web applications, and digital products.",
  },
  "/about": {
    title: "About Fractionl Studio | Design & Development Team",
    description: "Meet the experienced designers and developers behind Fractionl Studio and learn how we support startups, growing businesses, agencies, and internal teams.",
  },
  "/services": {
    title: "Services | Fractionl Studio",
    description: "Product design, UX/UI design, web design, and development services for growing businesses.",
  },
  "/services/fractional-product-design": {
    title: "Fractional Product Design & Development | Fractionl Studio",
    description: "Add an experienced fractional product designer, developer, or connected design and development support to your team for projects, leave coverage, overflow, launches, and ongoing product work.",
  },
  "/process": {
    title: "How We Work | Fractionl Studio",
    description: "A simple, considered process for discovery, design, and implementation.",
  },
  "/work": {
    title: "Selected Work | Fractionl Studio",
    description:
      "A mix of studio projects, founder work, and demos from Fractionl Studio.",
  },
  "/team": {
    title: "Team | Fractionl Studio",
    description: "Meet Nicole Buloran and Nick Castillo, the design and development team behind Fractionl Studio.",
  },
  "/contact": {
    title: "Contact Fractionl Studio | Start a Digital Project",
    description: "Contact Fractionl Studio about a website, web application, product design project, temporary team support, creative retainer, or ongoing technical support.",
  },
  "/insights": {
    title: "Insights | Fractionl Studio",
    description: "Practical ideas and perspectives on design, development, digital products, websites, and better digital experiences.",
  },
};

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:serviceSlug" element={<SingleServicePage />} />
        <Route path="/process" element={<ProcessPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/work/:projectSlug" element={<SingleWorkPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/insights" element={<InsightsPage />} />
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
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content" tabIndex={-1}>{children}</main>
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

  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

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
    <Link className={`brand${footer ? " brand--footer" : ""}`} to="/" aria-label="Fractionl Studio home">
      <span className="brand-mark" aria-hidden="true">
        &amp;
      </span>
      <span className="brand-word">
        Fractionl Studio
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
      <WhoWeHelpSection />
      <DeliverablesShowcase />
      <ServicesSection />
      <ProcessSection />
      <SampleWebsitesSection />
      <TeamSection />
      <ContactSection />
    </>
  );
}

function InsightsPage() {
  return (
    <div className="insights-coming-soon">
      <section className="insights-coming-soon__hero">
        <div className="container insights-coming-soon__grid">
          <div className="insights-coming-soon__copy">
            <Reveal as="p" className="eyebrow">Insights</Reveal>
            <Reveal as="h1" className="insights-coming-soon__title">
              Insights are<br />on the <em>way.</em>
            </Reveal>
            <Reveal as="p" className="insights-coming-soon__intro">
              We’re putting together practical ideas, lessons, and perspectives on design, development, digital products, websites, and the work behind building better digital experiences.
            </Reveal>
            <Reveal className="insights-coming-soon__actions">
              <Link className="btn insights-coming-soon__cta" to="/contact">
                Start a conversation <span aria-hidden="true">↗</span>
              </Link>
              <span>Check back soon.</span>
            </Reveal>
          </div>

          <Reveal className="insights-signal" aria-label="A visual of ideas taking shape">
            <div className="insights-signal__meta">
              <span>Field notes</span>
              <span>Issue 001</span>
            </div>
            <div className="insights-signal__field" aria-hidden="true">
              {Array.from({ length: 9 }, (_, index) => <i key={index} />)}
              <div className="insights-signal__orb" />
              <div className="insights-signal__card">
                <span>Ideas in progress</span>
                <b>Design<br />Build<br />Learn</b>
              </div>
            </div>
            <div className="insights-signal__footer">
              <span>Fractionl Studio</span>
              <span>Coming soon</span>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function DeliverablesShowcase() {
  const points = [
    { title: "Direct Access", body: "Work closely with the people thinking through, designing, and building the project—not a chain of account managers." },
    { title: "Connected Disciplines", body: "Strategy, design, and development stay aligned throughout the work instead of being handed off between disconnected teams." },
    { title: "Flexible by Design", body: "Bring us in for a defined project, continued support, or collaboration alongside the people already on your team." },
  ];

  return (
    <section className="deliverables-showcase" aria-label="Why work with Fractionl Studio">
      <div className="container deliverables-layout">
        <Reveal className="deliverables-copy">
          <p className="eyebrow">A different kind of studio</p>
          <h2 className="section-title">Close collaboration without unnecessary layers.</h2>
          <div className="studio-differences">
            {points.map((point, index) => (
              <div className="studio-difference" key={point.title}>
                <span>0{index + 1}</span><h3>{point.title}</h3><p>{point.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal className="deliverables-canvas">
          <div className="deliverable-browser">
            <BrowserBar label="yourbrand.com" />
            <div className="deliverable-site">
              <span className="mini-nav" />
              <strong>Make your next<br />move feel simple.</strong>
              <span className="mini-button">Get started</span>
            </div>
          </div>
          <div className="deliverable-phone">
            <span className="phone-speaker" />
            <small>Today</small><strong>4 projects</strong>
            <div className="phone-chart"><i /><i /><i /><i /></div>
          </div>
          <div className="deliverable-detail"><small>Design system</small><div><i /><i /><i /><i /></div><span>Aa</span></div>
          <span className="deliverable-caption deliverable-caption--web">Responsive website</span>
          <span className="deliverable-caption deliverable-caption--ui">Product UI</span>
        </Reveal>
      </div>
    </section>
  );
}

function BrowserBar({ label }: { label: string }) {
  return <div className="mock-browser-bar"><span /><span /><span /><b>{label}</b></div>;
}

function ProjectVisual({ title, alt }: { title: string; alt?: string }) {
  const key = title.toLowerCase();
  if (key.includes("trifold brochure")) {
    return <div className="project-visual project-visual--trifold-brochure"><img src="/images/work/trifold-brochure/hero.webp" alt={alt ?? ""} loading="lazy" decoding="async" /></div>;
  }
  if (key.includes("navigation restructure")) {
    return <div className="project-visual project-visual--navigation-restructure"><img src="/images/work/navigation-restructure/hero.webp" alt={alt ?? ""} loading="lazy" decoding="async" /></div>;
  }
  if (key.includes("pensioner profile")) {
    return <div className="project-visual project-visual--pensioner-profile"><img src="/images/work/pensioner-profile/hero.webp" alt={alt ?? ""} loading="lazy" decoding="async" /></div>;
  }
  if (key.includes("message blast")) {
    return <div className="project-visual project-visual--message-blast"><img src="/images/work/message-blast/hero.webp" alt={alt ?? ""} loading="lazy" decoding="async" /></div>;
  }
  if (key.includes("hudsons") || key.includes("coffee")) {
    if (key.includes("hudsons")) {
      return <div className="project-visual project-visual--hudsons"><img src="/images/work/hudsons-canadas-pub/hero.avif" alt={alt ?? ""} loading="lazy" decoding="async" /></div>;
    }
    return <div className="project-visual project-visual--editorial" role={alt ? "img" : undefined} aria-label={alt}><div className="project-browser"><BrowserBar label={key.includes("coffee") ? "northpeak.coffee" : "hudsonscanadaspub.com"} /><div className="editorial-page"><small>{key.includes("coffee") ? "SMALL BATCH · ALBERTA" : "CANADA'S PUB"}</small><strong>{key.includes("coffee") ? "Better mornings, roasted here." : "Good times live here."}</strong><i /></div></div></div>;
  }
  if (key.includes("inphonite")) {
    return <div className="project-visual project-visual--product" role={alt ? "img" : undefined} aria-label={alt}><div className="flow-card"><small>MESSAGE BLAST</small><strong>Reach every patient</strong><span /></div><div className="flow-card"><small>AUDIENCE</small><strong>1,248 contacts</strong><span /></div><div className="flow-connector" /></div>;
  }
  if (key.includes("innquest")) {
    return <div className="project-visual project-visual--innquest"><img src="/images/work/innquest-canada/hero.webp" alt={alt ?? ""} loading="lazy" decoding="async" /></div>;
  }
  if (key.includes("serene")) {
    return <div className="project-visual project-visual--wellness"><div className="project-browser"><BrowserBar label="serenepaths.ca" /><div className="wellness-page"><i /><small>A calmer path forward</small><strong>Support for the season you’re in.</strong></div></div></div>;
  }
  if (key.includes("maya")) {
    return <div className="project-visual project-visual--realty"><div className="project-browser"><BrowserBar label="mayabennett.ca" /><div className="realty-page"><small>EDMONTON REAL ESTATE</small><strong>Find your place.</strong><span>Explore listings →</span></div></div></div>;
  }
  return <div className="project-visual project-visual--portfolio"><div className="portfolio-sheet"><small>SELECTED WORK / 2026</small><strong>{title}</strong><div><i /><i /><i /></div></div></div>;
}

function Hero() {
  return (
    <section className="hero">
      <div className="container hero-layout">
        <div className="hero-copy">
          <Reveal as="p" className="eyebrow">
            Digital Design &amp; Development Studio
          </Reveal>
          <Reveal as="h1" className="hero-title">
            Custom digital products <span>for your next move.</span>
          </Reveal>
          <Reveal as="p" className="hero-sub">
            Fractionl Studio brings strategy, design, and development together to create websites, web applications, and digital experiences for founders, growing businesses, and internal teams across Canada and the U.S.
          </Reveal>
          <Reveal className="hero-actions">
            <TallyButton className="btn btn-primary">Start a Project <span aria-hidden="true">↗</span></TallyButton>
            <Link to="/work" className="btn btn-ghost">
              Explore Our Work
            </Link>
          </Reveal>
        </div>
        <Reveal className="hero-stage" as="div">
          <div className="stage-orbit stage-orbit--one" />
          <div className="stage-orbit stage-orbit--two" />
          <div className="stage-note stage-note--top">Strategy → shipped</div>
          <div className="product-window">
            <div className="product-window__bar"><span /><span /><span /><b>north / workspace</b></div>
            <div className="product-window__body">
              <aside className="product-sidebar">
                <i className="product-logo">N</i>
                <span className="active" /><span /><span /><span />
              </aside>
              <div className="product-dashboard">
                <div className="dashboard-top"><small>Overview</small><i /></div>
                <h2>Good morning, Maya.</h2>
                <p>Here’s what’s moving today.</p>
                <div className="dashboard-metrics"><span><b>18</b><small>Active tasks</small></span><span><b>84%</b><small>On track</small></span></div>
                <div className="dashboard-chart"><i /><i /><i /><i /><i /><i /><i /></div>
              </div>
            </div>
          </div>
          <div className="stage-card stage-card--left"><span>Launch velocity</span><strong>+38%</strong><i /></div>
          <div className="stage-card stage-card--right"><span>Built together</span><div><b>N</b><b>N</b><b>+</b></div></div>
          <div className="stage-note stage-note--bottom">Design · Build · Grow</div>
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
    <div className="about-page">
      <section className="about-page__hero">
        <div className="container about-page__hero-grid">
          <Reveal className="about-page__hero-copy">
            <p className="eyebrow">About Fractionl Studio</p>
            <h1>Built to work <span>alongside you.</span></h1>
          </Reveal>
          <Reveal className="about-page__hero-note">
            <p>A small, experienced design and development studio for businesses and teams that need more digital capacity—without building it all in-house.</p>
            <a href="#about-fractionl" className="about-page__jump">Get to know the studio <span aria-hidden="true">↓</span></a>
          </Reveal>
        </div>
      </section>

      <section className="about-studio" id="about-fractionl">
        <div className="container">
          <Reveal as="p" className="eyebrow">About Fractionl Studio</Reveal>
          <div className="about-studio__grid">
            <Reveal className="about-studio__statement">
              <h2>Experienced digital support, without building the whole team in-house.</h2>
            </Reveal>
            <Reveal className="about-studio__body">
              <p>Fractionl Studio brings design, development, and digital strategy together to help businesses build, improve, and support the technology behind their work.</p>
              <p>We work with founders bringing new ideas to market, businesses replacing outdated websites or manual systems, and teams that need experienced capacity without another permanent hire.</p>
              <p>From websites and digital products to ongoing design, development, and technical support, we step in where the need is—for a project, a temporary gap, or ongoing support.</p>
            </Reveal>
          </div>
          <Reveal className="about-studio__visual" aria-label="Fractionl Studio works alongside client teams from need through delivery">
            <div className="about-studio__visual-top"><span>Your team</span><span>Working together</span><span>Fractionl Studio</span></div>
            <div className="about-studio__visual-flow" aria-hidden="true">
              <div><b>01</b><span>A need appears</span></div><i />
              <div><b>02</b><span>We plug in</span></div><i />
              <div><b>03</b><span>The work moves</span></div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="about-support">
        <div className="container about-support__grid">
          <Reveal className="about-support__intro">
            <p className="eyebrow">Why Fractionl exists</p>
            <h2>You do not always need another full-time hire.</h2>
            <p>Sometimes the right experience is needed for a specific moment. Fractionl Studio is designed to work alongside businesses and teams in those moments—without adding unnecessary overhead or slowing the work down.</p>
          </Reveal>
          <div className="about-support__list">
            {["A team to plan and build something new", "Experienced support for a specific project", "Coverage during a leave, launch, or capacity gap", "Ongoing design, development, or creative support"].map((item, index) => (
              <Reveal className="about-support__item" key={item}><span>0{index + 1}</span><p>{item}</p></Reveal>
            ))}
          </div>
        </div>
      </section>

      <TeamSection standalone />

      <section className="about-page__cta">
        <div className="container about-page__cta-inner">
          <Reveal>
            <p className="eyebrow">Work with Fractionl</p>
            <h2>Bring experienced support to the table.</h2>
          </Reveal>
          <Reveal className="about-page__cta-action">
            <p>Tell us what you are building, where your team needs capacity, or what needs to keep moving.</p>
            <TallyButton className="btn btn-primary btn-lg">Start a Project <span aria-hidden="true">↗</span></TallyButton>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function AboutSection({ standalone = false }: { standalone?: boolean }) {
  return (
    <section className={`about${standalone ? " page-section" : ""}`}>
      <div className="container about-grid">
        <Reveal as="p" className="eyebrow">
          {standalone ? "A small, experienced studio" : "Built around the work"}
        </Reveal>
        <Reveal className="about-body">
          <h2 className="about-lead">{standalone ? "Your Design & Development Partner" : "Strategy, design, and development working together."}</h2>
          {standalone ? (
            <>
              <p className="about-text">Fractionl Studio partners with businesses to bring ideas to life and support their growth online.</p>
              <p className="about-text">
                From websites and software to marketing materials and ongoing improvements, we combine design thinking with technical expertise to
                create solutions that are both effective and easy to maintain.
              </p>
              <p className="about-text">Our goal is simple: help businesses move forward with confidence.</p>
            </>
          ) : (
            <>
              <p className="about-text">
                Good digital work rarely fits neatly into one discipline. We bring product thinking, thoughtful design, and practical development together from the start—so ideas move forward with fewer gaps between planning and execution.
              </p>
              <p className="about-text">Whether you are launching something new, improving what already exists, or tackling an important project within your team, we shape the work around what the business actually needs.</p>
              <Link className="text-link" to="/about">
                About Fractionl Studio
              </Link>
            </>
          )}
        </Reveal>
      </div>
    </section>
  );
}

const homepageAudiences = [
  { title: "Launching Something New", description: "Turn a business idea, service, or product concept into a focused website, MVP, web application, or digital experience." },
  { title: "Improving What Already Exists", description: "Redesign an outdated website, simplify a difficult experience, modernize an existing product, or replace a process that no longer works." },
  { title: "Moving a Team Project Forward", description: "Bring in experienced strategy, design, development, or creative support for a key initiative without rebuilding your entire internal team." },
] as const;

function WhoWeHelpSection() {
  return (
    <section className="services audience-section">
      <div className="container">
        <SectionHeading eyebrow="Where we fit" title="Built for the stage you are in." />
        <div className="services-grid services-grid--three audience-grid">
          {homepageAudiences.map((item, index) => (
            <Reveal as="article" className="service-card" key={item.title}>
              <span className="service-index">0{index + 1}</span>
              <h3 className="service-title">{item.title}</h3>
              <p className="service-desc">{item.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesPage() {
  return (
    <div className="services-overview">
      <section className="services-overview__hero">
        <div className="container services-overview__hero-grid">
          <Reveal className="services-overview__hero-copy">
            <p className="eyebrow">Strategy · Design · Development · Support</p>
            <h1>From first decision to <span>long-term momentum.</span></h1>
          </Reveal>
          <Reveal className="services-overview__hero-aside">
            <p>Fractionl Studio helps ambitious businesses and product teams plan, design, build, and care for the digital work that moves them forward.</p>
            <a className="services-overview__jump" href="#service-overview">Explore our services <span aria-hidden="true">↓</span></a>
          </Reveal>
          <Reveal className="services-overview__hero-map" aria-hidden="true">
            <span>Clarify</span><i /><span>Design</span><i /><span>Build</span><i /><span>Grow</span>
          </Reveal>
        </div>
      </section>

      <section className="services-overview__intro">
        <div className="container services-overview__intro-grid">
          <Reveal as="p" className="eyebrow">One studio, the full picture</Reveal>
          <Reveal as="p">Bring us in at the beginning, in the middle of a build, or when the work needs consistent attention. We connect business strategy to clear design, capable technology, and support that lasts beyond launch.</Reveal>
        </div>
      </section>

      <section className="services-overview__list" id="service-overview" aria-label="Services">
        {overviewServices.map((service) => (
          <article className={`overview-service overview-service--${service.visual}`} key={service.slug}>
            <div className="container overview-service__grid">
              <Reveal className="overview-service__copy">
                <span className="overview-service__number">{service.index}</span>
                <h2>{service.title}</h2>
                <p className="overview-service__description">{service.description}</p>
                <p className="overview-service__best"><strong>Best for</strong>{service.bestFor}</p>
                <Link className="overview-service__link" to={`/services/${service.slug}`}>Learn more <span aria-hidden="true">↗</span></Link>
              </Reveal>
              <Reveal className="overview-service__visual">
                <ServiceVisual type={service.visual} />
              </Reveal>
            </div>
          </article>
        ))}
      </section>

      <section className="engagements">
        <div className="container">
          <Reveal className="engagements__heading">
            <p className="eyebrow">Ways to work with us</p>
            <h2>The right shape of support for where you are now.</h2>
          </Reveal>
          <div className="engagements__track">
            {engagementModels.map((model, index) => (
              <Reveal as="article" className="engagements__item" key={model.title}>
                <span>0{index + 1}</span><h3>{model.title}</h3><p>{model.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <ServicesFinalCta />
    </div>
  );
}

const overviewServices = [
  { index: "01", slug: "technology-consulting", title: "Technology Consulting", visual: "strategy", description: "We help you decide what to build, what to buy, and what to skip before you spend money on development — so the technical decisions match the business problem you’re actually trying to solve.", bestFor: "Product strategy, MVP planning, system architecture, vendor & platform selection", detail: "Make confident technology decisions before they become expensive commitments.", includes: ["Product strategy", "MVP planning", "System architecture", "Vendor and platform selection"] },
  { index: "02", slug: "website-design-development", title: "Website Design & Development", visual: "website", description: "We design and build custom websites built to convert — fast load times, clear paths to contact or purchase, and a structure you can update yourself without calling us for every change.", bestFor: "New businesses, redesigns, service businesses, professional firms, local businesses", detail: "A clear, fast, conversion-focused website designed around your business.", includes: ["Website strategy", "UX and visual design", "Responsive development", "Flexible content management"] },
  { index: "03", slug: "web-applications", title: "Web Applications", visual: "application", description: "We design and build custom web applications that replace manual work with systems — dashboards, customer portals, booking flows, billing, and internal tools that cut down the hours your team spends on repetitive tasks.", bestFor: "Founders building a SaaS product, businesses with software that has outgrown its current support or development team", detail: "Purpose-built products and tools that turn repetitive work into reliable systems.", includes: ["SaaS products", "Dashboards and portals", "Booking and billing flows", "Internal tools"] },
  { index: "04", slug: "fractional-product-design", title: "Fractional Product Design & Development", visual: "product", description: "Experienced product design and development support for launches, product initiatives, team gaps, leave coverage, overflow, and ongoing digital work.", bestFor: "Internal teams, agencies, founders, and businesses that need experienced capacity", detail: "Experienced product support, without the full-time hire.", includes: ["Product strategy and UX", "Product and UI design", "Development", "Ongoing support"] },
  { index: "05", slug: "creative-retainer", title: "Creative Retainer", visual: "creative", description: "A reserved block of design support each month, handled by a team that already knows your brand — so campaigns, landing pages, and sales collateral get done without briefing a new freelancer every time.", bestFor: "Businesses that need consistent creative output without an in-house hire", detail: "Reliable creative momentum from a team that already understands the brand.", includes: ["Campaign creative", "Landing pages", "Sales collateral", "Presentations and social assets"] },
  { index: "06", slug: "managed-hosting-support", title: "Managed Hosting & Ongoing Support", visual: "support", description: "We keep what we build — or what you already have — online, secure, and fast: backups, monitoring, updates, and a team that responds when something breaks.", bestFor: "Any business that doesn’t want website maintenance to become someone’s job", detail: "Quiet, dependable technical care that keeps your digital presence healthy.", includes: ["Managed hosting", "Backups and monitoring", "Security and updates", "Responsive technical support"] },
] as const;

const engagementModels = [
  { title: "One-off project", description: "A focused engagement with a clear outcome, from strategy and design through launch." },
  { title: "Temporary or fractional support", description: "Senior capacity embedded with your team for a project, a quarter, or a coverage gap." },
  { title: "Ongoing support", description: "A familiar studio on hand each month to keep creative and technical work moving." },
] as const;

function ServiceVisual({ type }: { type: typeof overviewServices[number]["visual"] }) {
  if (type === "strategy") return <div className="visual-strategy" aria-label="Technology roadmap placeholder"><div className="visual-label">Decision map</div><div className="strategy-node strategy-node--start">Business goal</div><i /><div className="strategy-options"><span>Build</span><span>Buy</span><span>Skip</span></div><div className="strategy-note">Recommended path → MVP</div></div>;
  if (type === "website") return <div className="visual-website" aria-label="Responsive website shown on desktop and mobile"><div className="mock-browser"><div className="mock-bar"><i/><i/><i/></div><div className="mock-site"><small>Fractionl project</small><strong>Ideas made<br/>useful.</strong><button>Start here</button></div></div><div className="mock-mobile"><div className="mock-mobile__nav"><small>Fractionl project</small><i/><i/></div><div className="mock-mobile__content"><strong>Ideas made<br/>useful.</strong><p>Clear thinking for ambitious digital work.</p><span>Start here <i>↗</i></span></div><div className="mock-mobile__accent" aria-hidden="true"/></div></div>;
  if (type === "application") return <div className="visual-app" aria-label="Dashboard UI placeholder"><div className="app-sidebar"><b>F</b><i/><i/><i/></div><div className="app-main"><small>Workspace overview</small><div className="app-greeting">Good morning, Alex.</div><div className="app-stats"><span><b>84%</b>Efficiency</span><span><b>128</b>Automations</span></div><div className="app-chart">{[42,66,54,88,72,96,80].map((height) => <i style={{height:`${height}%`}} key={height}/>)}</div></div><div className="app-toast">✓ Workflow completed</div></div>;
  if (type === "product") return <div className="visual-product" aria-label="Product design workflow placeholder"><div className="flow-card"><small>Checkout flow</small><div><i/><i/><i/></div></div><div className="design-screen"><span className="design-toolbar">Design system · v2.4</span><div className="design-ui"><i/><i/><i/></div></div><div className="comment-pin">N</div><div className="comment-bubble">Ready for dev handoff</div></div>;
  if (type === "creative") return <div className="visual-creative" aria-label="Creative deliverables collage placeholder"><div className="creative-poster"><small>Campaign 04</small><strong>Make it<br/><em>matter.</em></strong></div><div className="creative-social"><span>New release</span><b>F/</b></div><div className="creative-slide"><small>Sales deck</small><strong>One clear story.</strong><i/></div><div className="creative-strip">Landing pages · Social · Presentations · Campaigns</div></div>;
  return <div className="visual-support" aria-label="Monitoring and support interface placeholder"><div className="support-head"><span><i/>All systems operational</span><small>Live monitoring</small></div><div className="uptime"><small>Uptime · last 30 days</small><strong>99.99%</strong><div>{Array.from({length:24},(_,i)=><i key={i}/>)}</div></div><div className="support-metrics"><span><small>Last backup</small><b>12 min ago</b></span><span><small>Security</small><b>Protected</b></span><span><small>Response</small><b>218 ms</b></span></div></div>;
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
    title: "Website Design & Development",
    description: "For a new business website, landing page, redesign, WordPress build, or an existing website that needs to work better.",
  },
  {
    title: "Web Application or MVP",
    description: "For SaaS products, customer portals, dashboards, booking systems, internal tools, and technology-enabled business ideas.",
  },
  {
    title: "Product Design & Team Support",
    description: "For UX/UI design, user flows, prototypes, design systems, project overflow, leave coverage, or temporary product design capacity.",
  },
  {
    title: "Ongoing Creative or Technical Support",
    description: "For recurring creative work, managed hosting, website maintenance, updates, development support, and ongoing digital improvements.",
  },
] as const;

const contactChecklist = [
  "Your business, product, or organization",
  "What you are hoping to build, improve, or replace",
  "Who will use it",
  "Any timeline, budget range, or launch date already in mind",
  "The best way to reach you",
] as const;

const contactNextSteps = [
  {
    title: "Send an Inquiry",
    description: "Tell us what you need help with and share any context you already have.",
  },
  {
    title: "We Review the Request",
    description: "We look at the business need, scope, timing, and the type of support that may be the best fit.",
  },
  {
    title: "We Follow Up",
    description: "If the project looks like a good fit, we will reach out with next steps, questions, or a recommended approach.",
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
  //           Fractionl Studio helps businesses and product teams maintain a stronger digital presence, improve existing experiences, and
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

const homepageServices = [
  {
    index: "01",
    title: "Technology Consulting",
    description: "Clarify the opportunity, define the right approach, and make informed decisions before committing time and budget to a build.",
    to: "/services/technology-consulting",
  },
  {
    index: "02",
    title: "Website & Web Application Design + Development",
    description: "Custom websites, platforms, portals, dashboards, and digital tools designed around how your customers and business actually work.",
    to: "/services/website-design-development",
  },
  {
    index: "03",
    title: "Fractional Product & Creative Support",
    description: "Experienced product design and creative support for launches, product initiatives, overflow, temporary coverage, and recurring needs.",
    to: "/services/fractional-product-design",
  },
  {
    index: "04",
    title: "Managed Hosting & Ongoing Support",
    description: "Reliable hosting, maintenance, monitoring, updates, and technical support that keeps your digital work healthy after launch.",
    to: "/services/managed-hosting-support",
  },
] as const;

function ServicesSection({ standalone = false }: { standalone?: boolean }) {
  return (
    <section className={`services${standalone ? " page-section" : ""}`}>
      <div className="container">
        {!standalone ? (
          <SectionHeading
            eyebrow="What we do"
            title={<>The expertise to shape, build,<br />and support digital work.</>}
            intro="Work with Fractionl on a focused project, an evolving digital product, or continued support after launch."
            twoLine
          />
        ) : null}
        <div className={`services-grid${!standalone ? " services-grid--preview" : ""}`}>
          {homepageServices.map((service) => (
            <Reveal as="article" className="service-card" key={service.title}>
              <span className="service-index">{service.index}</span>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.description}</p>
              {!standalone ? (
                <Link className="card-link" to={service.to}>
                  Learn more
                </Link>
              ) : null}
            </Reveal>
          ))}
        </div>
        {!standalone ? (
          <Reveal className="section-action">
            <Link className="text-link" to="/services">
              Explore All Services
            </Link>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

function SingleServicePage() {
  const { serviceSlug } = useParams();
  const service = overviewServices.find((item) => item.slug === serviceSlug);

  if (!service) return <Navigate to="/services" replace />;
  if (service.slug === "fractional-product-design") return <FractionalProductServicePage service={service} />;
  const content = servicePageContent[service.slug];
  const related = content.related.map((slug: string) => overviewServices.find((item) => item.slug === slug)).filter(Boolean) as (typeof overviewServices[number])[];

  return (
    <div className={`single-service single-service--${service.visual}`}>
      <section className="single-service__hero"><div className="container single-service__hero-grid">
        <Reveal className="single-service__hero-copy"><p className="eyebrow">Service · {service.index}</p><h1>{service.title}</h1><p className="single-service__statement">{service.detail}</p><p className="single-service__description">{service.description}</p><div className="hero-actions"><TallyButton className="btn btn-primary">Start a conversation <span aria-hidden="true">↗</span></TallyButton></div></Reveal>
        <Reveal className="single-service__hero-visual"><ServiceVisual type={service.visual} /></Reveal>
      </div></section>
      <section className="single-service__problem"><div className="container single-service__problem-grid">
        <Reveal className="single-service__section-intro"><p className="eyebrow">The problem</p><h2>{content.problemTitle}</h2></Reveal>
        <div className="single-service__pain-list">{content.problems.map((problem: string, index: number) => <Reveal as="div" className="single-service__pain" key={problem}><span>0{index + 1}</span><p>{problem}</p></Reveal>)}</div>
      </div></section>
      <section className="single-service__capabilities"><div className="container">
        <Reveal className="single-service__cap-head"><p className="eyebrow">What we help with</p><h2>Focused expertise, connected from start to finish.</h2></Reveal>
        <div className="single-service__cap-list">{content.capabilities.map((capability: { title: string; description: string }, index: number) => <Reveal as="article" className="single-service__cap" key={capability.title}><span>0{index + 1}</span><h3>{capability.title}</h3><p>{capability.description}</p></Reveal>)}</div>
      </div></section>
      <section className="single-service__feature" aria-label={`${service.title} visual example`}><div className="container">
        <Reveal className="single-service__feature-head"><p className="eyebrow">In practice</p><p>{content.visualCaption}</p></Reveal><Reveal className="single-service__feature-canvas"><ServiceVisual type={service.visual} /></Reveal>
      </div></section>
      <section className="single-service__fit"><div className="container single-service__fit-grid"><Reveal><p className="eyebrow">Best for</p><h2>{content.bestForTitle}</h2></Reveal><Reveal as="ul">{content.bestFor.map((item: string) => <li key={item}>{item}</li>)}</Reveal></div></section>
      <section className="single-service__process"><div className="container"><Reveal className="single-service__process-head"><p className="eyebrow">How we work</p><h2>A clear path, with no black box.</h2></Reveal><ol className="single-service__process-list">{content.process.map((step: { title: string; description: string }, index: number) => <Reveal as="li" key={step.title}><span>0{index + 1}</span><div><h3>{step.title}</h3><p>{step.description}</p></div></Reveal>)}</ol></div></section>
      <section className="single-service__proof"><div className="container single-service__proof-grid"><Reveal className="single-service__proof-main"><span className="single-service__placeholder">{content.proofLabels[0]}</span><ServiceVisual type={service.visual} /></Reveal><Reveal className="single-service__proof-side"><span className="single-service__placeholder">{content.proofLabels[1]}</span><div className="single-service__proof-lines"><i/><i/><i/><b>Visual proof<br/>coming soon.</b></div></Reveal></div></section>
      <section className="single-service__related"><div className="container"><Reveal className="single-service__related-head"><p className="eyebrow">Related services</p><h2>Support around the edges, too.</h2></Reveal><div className="single-service__related-list">{related.map((item) => <Reveal as="article" key={item.slug}><span>{item.index}</span><h3>{item.title}</h3><Link to={`/services/${item.slug}`}>Explore <span aria-hidden="true">↗</span></Link></Reveal>)}</div></div></section>
      <section className="single-service__cta"><div className="container"><Reveal><p className="eyebrow">Start a conversation</p><h2>{content.cta}</h2><p>Tell us where you are, what is getting in the way, and what a better outcome would look like.</p><TallyButton className="btn single-service__cta-button">Discuss your project <span aria-hidden="true">↗</span></TallyButton></Reveal></div></section>
    </div>
  );
}

const fractionalSituations = [
  "A product designer or developer is on leave",
  "The internal team is at capacity",
  "A launch or deadline needs additional support",
  "An agency needs reliable overflow capacity",
  "A founder needs experienced execution without building a full team",
  "A product needs continued design and development after launch",
  "The business needs specialized experience for a defined initiative",
  "A backlog is growing faster than the existing team can address it",
] as const;

const fractionalSupport = [
  { title: "Product Design Support", description: "Bring in experienced UX/UI and product design support for research, workflows, prototypes, design systems, product improvements, and new feature initiatives." },
  { title: "Development Support", description: "Add experienced development capacity for websites, web applications, frontend implementation, WordPress work, technical improvements, and ongoing product delivery." },
  { title: "Design and Development Together", description: "Keep product decisions and technical execution connected by bringing in both disciplines for a focused project or ongoing initiative." },
] as const;

const fractionalCapabilities = [
  { title: "Product Strategy and UX", items: ["Product discovery", "Feature definition", "User flows", "Information architecture", "UX reviews", "Product improvements", "MVP planning"] },
  { title: "Product and UI Design", items: ["Wireframes", "Interactive prototypes", "UX/UI design", "Responsive product interfaces", "Design systems", "Component libraries", "Developer-ready specifications"] },
  { title: "Development", items: ["Frontend development", "Web application development", "WordPress development", "Design implementation", "Component development", "Existing product improvements", "Bug fixes and technical refinements"] },
  { title: "Ongoing Support", items: ["Product backlog support", "Design and development retainers", "Temporary leave coverage", "Agency overflow", "Launch support", "Continued product iteration"] },
] as const;

const fractionalEngagements = [
  { title: "Focused Project", description: "Bring Fractionl in for a defined product feature, redesign, website, application, or technical initiative with a clear scope and outcome." },
  { title: "Embedded Support", description: "Add a product designer, developer, or connected design and development support alongside your existing team for a specific period or initiative." },
  { title: "Ongoing Partnership", description: "Keep experienced product and technical support available through a recurring engagement as priorities and needs evolve." },
] as const;

const fractionalProcess = [
  { title: "Understand", description: "We learn about the product, team, users, current challenges, technical environment, and the work that needs to move forward." },
  { title: "Align", description: "We clarify priorities, responsibilities, communication, deliverables, and how Fractionl will work alongside the people already involved." },
  { title: "Design and Build", description: "We complete the agreed product design, development, or connected delivery work while keeping decisions visible and communication clear." },
  { title: "Continue or Handoff", description: "We can remain involved for continued support or document and hand off the work cleanly to your internal team." },
] as const;

function FractionalProductServicePage({ service }: { service: typeof overviewServices[number] }) {
  return (
    <div className="single-service single-service--product fractional-service">
      <section className="single-service__hero"><div className="container single-service__hero-grid">
        <Reveal className="single-service__hero-copy"><p className="eyebrow">Fractional Product Design &amp; Development</p><h1>Experienced product support, without the full-time hire.</h1><p className="single-service__statement">Bring experienced product design, development, or both into your team for the work that needs to move forward.</p><p className="single-service__description">Fractionl Studio supports founders, businesses, agencies, and internal teams with flexible access to product thinking, UX/UI design, prototyping, frontend and web development, and ongoing digital execution.</p><div className="hero-actions"><TallyButton className="btn btn-primary">Discuss Your Needs <span aria-hidden="true">↗</span></TallyButton><Link className="btn btn-ghost" to="/work">Explore Our Work</Link></div></Reveal>
        <Reveal className="single-service__hero-visual"><ServiceVisual type={service.visual} /></Reveal>
      </div></section>

      <section className="single-service__problem"><div className="container"><Reveal className="single-service__cap-head"><p className="eyebrow">When extra capacity matters</p><h2>Support for the gaps your team needs to fill.</h2></Reveal><div className="single-service__cap-list">{fractionalSupport.map((item, index) => <Reveal as="article" className="single-service__cap" key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.description}</p></Reveal>)}</div></div></section>

      <section className="single-service__fit"><div className="container single-service__fit-grid"><Reveal><p className="eyebrow">Where we fit</p><h2>Flexible support for real team needs.</h2></Reveal><Reveal as="ul">{fractionalSituations.map((item) => <li key={item}>{item}</li>)}</Reveal></div></section>

      <section className="single-service__capabilities"><div className="container"><Reveal className="single-service__cap-head"><p className="eyebrow">How we can support you</p><h2>Product thinking, design, and development where you need it.</h2></Reveal><div className="fractional-service__capability-grid">{fractionalCapabilities.map((group, index) => <Reveal as="article" className="fractional-service__capability" key={group.title}><span>0{index + 1}</span><h3>{group.title}</h3><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></Reveal>)}</div></div></section>

      <section className="single-service__process fractional-service__engagements"><div className="container"><Reveal className="single-service__process-head"><p className="eyebrow">Flexible by design</p><h2>The right level of support for the work ahead.</h2></Reveal><div className="single-service__cap-list">{fractionalEngagements.map((item, index) => <Reveal as="article" className="single-service__cap" key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.description}</p></Reveal>)}</div></div></section>

      <section className="fractional-service__why"><div className="container fractional-service__why-grid"><Reveal><p className="eyebrow">Connected from thinking to execution</p><h2>Design and development that stay aligned.</h2></Reveal><Reveal className="fractional-service__why-copy"><p>Product work often slows down when strategy, design, and development are separated across different providers. Fractionl keeps the people shaping the experience connected to the people building it.</p><p>You receive experienced support without unnecessary management layers, disconnected handoffs, or the commitment of immediately expanding your full-time team.</p></Reveal></div></section>

      <section className="single-service__process"><div className="container"><Reveal className="single-service__process-head"><p className="eyebrow">How we work</p><h2>A practical process shaped around your team.</h2></Reveal><ol className="single-service__process-list">{fractionalProcess.map((step, index) => <Reveal as="li" key={step.title}><span>0{index + 1}</span><div><h3>{step.title}</h3><p>{step.description}</p></div></Reveal>)}</ol></div></section>

      <section className="single-service__cta"><div className="container"><Reveal><p className="eyebrow">Add the support your team needs</p><h2>Need a product designer, developer, or both?</h2><p>Tell us what your team is working on, where progress is getting stuck, and the type of support you need. We will help determine the most useful way for Fractionl to contribute.</p><div className="hero-actions fractional-service__cta-actions"><TallyButton className="btn single-service__cta-button">Discuss Your Needs <span aria-hidden="true">↗</span></TallyButton><a className="btn fractional-service__email" href="mailto:hello@fractionlstudio.com">hello@fractionlstudio.com</a></div></Reveal></div></section>
    </div>
  );
}

const serviceSpecificContent = {
  "technology-consulting": ["The costly part is rarely the code. It is choosing the wrong path before it.", ["The idea is clear, but the technical route is not.", "Platforms, vendors, and build options all sound equally plausible.", "A team needs an actionable plan before committing budget."], "For teams making a consequential technology decision.", ["Founders shaping an MVP", "Teams modernizing a system", "Businesses comparing build and buy options"], "Roadmaps and decision systems turn ambiguity into a sequence your team can act on.", ["Architecture direction", "Roadmap excerpt"], "Make the next technology decision with clarity."],
  "website-design-development": ["Your website should make the business easier to understand — and easier to choose.", ["The current site no longer reflects the quality of the business.", "Visitors cannot quickly find a reason or a path to act.", "Small updates depend on technical help every time."], "For businesses ready for a website that earns its place.", ["New and growing businesses", "Established brands ready for a redesign", "Service firms with a complex offer"], "Responsive screens, purposeful content, and conversion paths designed as one connected experience.", ["Desktop experience", "Responsive system"], "Build a website that feels as capable as your business."],
  "web-applications": ["When manual work becomes the system, growth starts creating more friction.", ["Important workflows live across spreadsheets and inboxes.", "Customers expect a clearer, self-serve experience.", "Existing software no longer fits how the team works."], "For teams turning repeated work into a dependable product.", ["SaaS founders", "Operations-heavy businesses", "Teams extending an existing application"], "Interfaces, workflows, and system states made tangible before and during the build.", ["Product interface", "Workflow detail"], "Turn the workflow into a product people want to use."],
  "fractional-product-design": ["The product needs senior design attention, but not another permanent seat.", ["A roadmap is moving faster than current design capacity.", "A critical project needs experienced product judgment.", "Developers need clearer flows, states, and handoff."], "For product teams that need senior momentum now.", ["SaaS and startup teams", "Leave or project coverage", "Agencies needing product design depth"], "Flows, interface systems, and collaborative handoff that fit into the way your team already ships.", ["Feature flow", "Design system"], "Add experienced product design without slowing down to hire."],
  "creative-retainer": ["Consistent creative work is hard when every request starts from zero.", ["Campaign needs arrive faster than internal capacity.", "Too many one-off partners create an inconsistent brand.", "Small but important deliverables keep getting deferred."], "For brands that need a reliable creative rhythm.", ["Lean marketing teams", "Growing brands with recurring needs", "Businesses without an in-house designer"], "A flexible mix of campaign, sales, social, and web assets — all speaking the same visual language.", ["Campaign system", "Deliverable detail"], "Give your creative work a consistent place to move."],
  "managed-hosting-support": ["A website should support the business, not quietly become another job.", ["Updates, backups, and security have no clear owner.", "Small issues linger until they become urgent.", "The team needs a real person to call when something breaks."], "For businesses that value quiet reliability.", ["Business-critical websites", "Teams without technical staff", "Sites that need ongoing improvement"], "Monitoring, maintenance, and responsive support working quietly in the background.", ["Service health", "Maintenance log"], "Keep your website healthy without keeping it on your mind."],
} as const;

const servicePageContent = Object.fromEntries(overviewServices.map((service) => {
  const [problemTitle, problems, bestForTitle, bestFor, visualCaption, proofLabels, cta] = serviceSpecificContent[service.slug];
  const descriptions = ["Define the right direction and remove uncertainty before execution.", "Shape a clear, usable experience around real business and user needs.", "Turn the plan into practical work that is ready to use and maintain.", "Keep decisions, details, and delivery connected as the work moves forward."];
  return [service.slug, { problemTitle, problems, bestForTitle, bestFor, visualCaption, proofLabels, cta, capabilities: service.includes.map((title, index) => ({ title, description: descriptions[index] })), process: [{ title: "Understand", description: "We align on the context, constraints, people, and outcome that matter." }, { title: "Plan", description: "We turn what we learn into priorities, scope, and a visible path forward." }, { title: service.visual === "strategy" ? "Recommend" : service.visual === "support" ? "Care" : "Design & build", description: "We make the work tangible, share progress, and refine it with you." }, { title: service.visual === "support" ? "Improve" : "Launch & support", description: "We help the work land well and stay useful after delivery." }], related: overviewServices.filter((item) => item.slug !== service.slug).slice(0, 3).map((item) => item.slug) }];
})) as Record<typeof overviewServices[number]["slug"], any>;

function ProcessPage() {
  return (
    <PageShell eyebrow="How we work" title="A simple, considered process">
      <ProcessSection standalone />
    </PageShell>
  );
}

function ProcessSection({ standalone = false }: { standalone?: boolean }) {
  const steps = standalone ? processSteps : [
    { index: "01", title: "Understand", description: "We learn about the business, the people involved, the current challenges, and what the work needs to accomplish." },
    { index: "02", title: "Shape", description: "We define the right direction through strategy, structure, user flows, content, prototypes, and visual design." },
    { index: "03", title: "Build", description: "We develop, test, refine, and launch the experience with clear communication throughout the project." },
    { index: "04", title: "Support", description: "Where it makes sense, we stay involved through hosting, maintenance, continued improvements, or ongoing design and development." },
  ];
  return (
    <section className={`process${standalone ? " page-section" : " process--preview"}`}>
      <div className="container">
        {!standalone ? (
          <SectionHeading
            eyebrow="How we work"
            title={<>A clear path from idea<br />to finished work.</>}
            twoLine
          />
        ) : null}
        <ol className={`process-list${!standalone ? " process-list--four" : ""}`}>
          {steps.map((step) => (
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
    <div className="work-page">
      <PageShell
        eyebrow="Selected work"
        title="Selected Work"
        intro="A mix of studio projects, founder work, and demos showing what we build."
      >
        <WorkSection title="Studio Work" items={studioWork} linkLabel="View Project" />
        <WorkSection title="Founder Work" items={founderWork} linkLabel="View Portfolio" alternate />
        <WorkSection
          title="Demo Sites"
          intro="Demos showing what we can build across different industries."
          items={sampleWebsites}
          linkLabel="View Demo"
        />
        <WorkFinalCta />
      </PageShell>
    </div>
  );
}

function SingleWorkPage() {
  const { projectSlug } = useParams();
  const project = caseStudies.find((item) => item.slug === projectSlug);
  if (!project) return <Navigate to="/work" replace />;

  const related = project.related.map((slug) => caseStudies.find((item) => item.slug === slug)).filter((item): item is CaseStudy => Boolean(item));
  return (
    <article className={`case-study case-study--${project.slug}`}>
      <Helmet><title>{project.seoTitle}</title><meta name="description" content={project.metaDescription} /><link rel="canonical" href={`${site.domain}/work/${project.slug}`} /></Helmet>
      <header className="case-hero container">
        <Reveal as="p" className="eyebrow">{project.eyebrow}</Reveal>
        <Reveal as="h1" className="case-hero__title">{project.title}</Reveal>
        <Reveal as="p" className="case-hero__intro">{project.introduction}</Reveal>
        <Reveal as="p" className="case-hero__summary">{project.summary}</Reveal>
        <Reveal as="dl" className="case-details">
          {project.details.map((detail) => <div key={detail.label}><dt>{detail.label}</dt><dd>{detail.url ? <a href={detail.url} target="_blank" rel="noreferrer">{detail.value} ↗</a> : detail.value}</dd></div>)}
        </Reveal>
      </header>
      <CaseVisual project={project} label="Project introduction" index={0} wide />
      {project.overview?.length ? <CaseText eyebrow="Project overview" title={project.overviewHeading ?? "A digital foundation built around the people using it."}>{project.overview.map((text) => <p key={text}>{text}</p>)}</CaseText> : null}
      {project.challenge ? <CaseText eyebrow={project.challenge.eyebrow} title={project.challenge.heading}>{project.challenge.paragraphs.map((text) => <p key={text}>{text}</p>)}{project.challenge.items ? <ul>{project.challenge.items.map((item) => <li key={item}>{item}</li>)}</ul> : null}</CaseText> : null}
      {project.goals ? <CaseText eyebrow="Project goals" title="What the work needed to accomplish."><ol className="case-numbered">{project.goals.map((goal, index) => <li key={goal}><span>{String(index + 1).padStart(2, "0")}</span>{goal}</li>)}</ol></CaseText> : null}
      {project.images?.[0] && project.visuals?.[0] ? <CaseVisual project={project} label={project.visuals[0].title} index={1} caption={project.visuals[0].caption} /> : null}
      {project.approach?.length ? <CaseText eyebrow="The approach" title="A considered path from context to execution."><div className="case-phases">{project.approach.map((phase) => <section key={phase.title}><h3>{phase.title}</h3><p>{phase.body}</p></section>)}</div></CaseText> : null}
      {project.solution ? <CaseText eyebrow="The solution" title={project.solution.heading}>{project.solution.paragraphs.map((text) => <p key={text}>{text}</p>)}{project.solution.highlights ? <ul>{project.solution.highlights.map((item) => <li key={item}>{item}</li>)}</ul> : null}</CaseText> : null}
      {project.images?.[1] && project.visuals?.[1] ? <CaseVisual project={project} label={project.visuals[1].title} index={2} caption={project.visuals[1].caption} wide /> : null}
      {project.images?.[2] && project.images?.[3] && project.visuals?.[2] ? <section className="case-gallery container" aria-label="Project visuals"><div className="case-gallery__heading"><p className="eyebrow">Project visuals</p><h2>{project.visuals[2].title}</h2><p>{project.visuals[2].caption}</p></div><div className="case-gallery__pair"><CaseVisualInner project={project} index={3} /><CaseVisualInner project={project} index={4} /></div></section> : null}
      {!project.visuals && project.images?.length ? <section className="case-image-showcase container" aria-label="Trifold brochure design"><div className="case-image-showcase__grid">{project.images.map((_, index) => <CaseVisualInner project={project} index={index + 1} key={project.images?.[index]} />)}</div></section> : null}
      {project.outcome ? <CaseText eyebrow="The outcome" title={project.outcome.heading}>{project.outcome.paragraphs.map((text) => <p key={text}>{text}</p>)}{project.outcome.improvements ? <ul>{project.outcome.improvements.map((item) => <li key={item}>{item}</li>)}</ul> : null}{project.results ? <ul>{project.results.map((item) => <li key={item}>{item}</li>)}</ul> : null}{project.testimonial ? <blockquote>“{project.testimonial.quote}”<cite>{project.testimonial.attribution}</cite></blockquote> : null}</CaseText> : null}
      {project.services.length ? <section className="case-services"><div className="case-copy"><p className="eyebrow">Services provided</p><div className="case-services__links">{project.services.map((service) => <Link to={service.href} key={service.href}>{service.label}<span>↗</span></Link>)}</div></div></section> : null}
      <section className="case-related container"><div className="case-gallery__heading"><p className="eyebrow">Related work</p><h2>More from the studio.</h2></div><div className="case-related__grid">{related.map((item) => <Link to={`/work/${item.slug}`} key={item.slug}><ProjectVisual title={item.title} alt={`${item.title} project preview`} /><span>{item.eyebrow}</span><h3>{item.title}</h3></Link>)}</div></section>
      <section className="case-cta"><div className="case-copy"><p className="eyebrow">{project.cta?.eyebrow ?? "Start a project"}</p><h2>{project.cta?.heading ?? "Have something similar in mind?"}</h2><p>{project.cta?.copy ?? "Tell us what you are building, what needs improvement, or where your team needs experienced support."}</p><div><TallyButton className="btn btn-primary">{project.cta?.primaryLabel ?? "Start a Project"}</TallyButton><Link className="btn btn-ghost" to="/work">{project.cta?.secondaryLabel ?? "View More Work"}</Link></div></div></section>
    </article>
  );
}

function CaseText({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) { return <section className="case-section"><Reveal className="case-copy"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2><div className="case-prose">{children}</div></Reveal></section>; }
function CaseVisual({ project, label, index, caption, wide = false }: { project: CaseStudy; label: string; index: number; caption?: string; wide?: boolean }) { return <Reveal className={`case-media${wide ? " case-media--wide" : ""}`}><CaseVisualInner project={project} index={index} /><div className="case-caption"><span>{String(index + 1).padStart(2, "0")}</span><p><strong>{label}</strong>{caption ? ` — ${caption}` : ""}</p></div></Reveal>; }
function CaseVisualInner({ project, index }: { project: CaseStudy; index: number }) {
  const image = index === 0 ? project.heroImage : project.images?.[index - 1];
  if (image) return <div className={`case-art case-art--image case-art--${project.slug} case-art--${index}`}><img src={image} alt={index === 0 ? project.imageAlt : project.imageAlts?.[index - 1] ?? `${project.title} project visual`} loading={index === 0 ? "eager" : "lazy"} decoding="async" /></div>;
  return <div className={`case-art case-art--${project.slug} case-art--${index}`} role="img" aria-label={`${project.title} interface visual`}><div className="case-art__window"><BrowserBar label={project.slug === "restaurant-website-redesign" ? "hudsonscanadaspub.com" : project.slug === "innquest-canada" ? "innquest.com" : "inphonite.com"} /><div className="case-art__ui"><small>{project.eyebrow}</small><strong>{index % 2 === 0 ? project.introduction : project.visuals?.[Math.min(index - 1, 2)]?.title ?? project.title}</strong><div className="case-art__lines"><i /><i /><i /></div><b>{index % 2 === 0 ? "Explore the experience" : "Continue"} →</b></div></div></div>;
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
    <section className={`work-collection work-collection--${title.toLowerCase().replaceAll(" ", "-")}${alternate ? " work-collection--alternate" : ""}`}>
      <div className="container">
        <SectionHeading eyebrow="Selected work" title={title} intro={intro} />
        <div className={`work-grid${items.length === 2 ? " work-grid--two" : ""}`}>
          {items.map((item) => (
            <Reveal as="article" className="work-card" key={item.title}>
              <ProjectVisual title={item.title} />
              <h3 className="work-title">{item.title}</h3>
              <p className="work-type">{item.businessType}</p>
              <p className="work-desc">{item.description}</p>
              {"slug" in item ? <Link className="card-link" to={`/work/${item.slug}`}>
                {linkLabel}<span className="link-arrow" aria-hidden="true">↗</span>
              </Link> : <a className="card-link" href={item.url} target="_blank" rel="noopener noreferrer">
                {linkLabel}<span className="link-arrow" aria-hidden="true">↗</span>
              </a>}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SampleWebsitesSection({ standalone = false }: { standalone?: boolean }) {
  const selectedWork = studioWork
    .map((project, displayOrder) => ({ project, displayOrder }))
    .filter(({ project }) => !("showOnHomepage" in project) || project.showOnHomepage !== false)
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .slice(0, 3)
    .map(({ project }) => project);

  return (
    <section className={`work-preview${standalone ? " page-section" : ""}`}>
      <div className="container">
        {!standalone ? (
          <SectionHeading
            eyebrow="Latest Work"
            title="Ideas made useful."
            intro="A selection of websites, digital products, product features, and creative work designed to make information clearer, experiences easier, and businesses more effective."
          />
        ) : null}
        <div className="work-grid work-grid--editorial">
          {selectedWork.map((project) => (
            <Reveal as="article" className="work-card" key={project.title}>
              <ProjectVisual title={project.title} alt={`${project.title} project preview`} />
              <h3 className="work-title">{project.title}</h3>
              <p className="work-type">{project.businessType}</p>
              <p className="work-desc">{project.description}</p>
              <Link className="card-link" to={`/work/${project.slug}`}>
                View Project<span className="link-arrow" aria-hidden="true">↗</span>
              </Link>
            </Reveal>
          ))}
        </div>
        {!standalone ? (
          <Reveal className="section-action">
            <Link className="text-link" to="/work">
              View All Work
            </Link>
          </Reveal>
        ) : null}
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

function TeamSection({ standalone = false }: { standalone?: boolean }) {
  return (
    <section className={`team${standalone ? " team--page page-section" : ""}`}>
      <div className="container">
        {!standalone ? (
          <SectionHeading
            eyebrow="The people behind Fractionl"
            title="Two disciplines. One connected studio."
            intro="Fractionl Studio combines Nicole’s experience in product, UX/UI, web, and visual design with Nick’s background in software, web application, and WordPress development. We stay closely involved from the first conversation through the final delivery, keeping decisions and execution connected along the way."
          />
        ) : (
          <Reveal className="section-head section-head--wide">
            <p className="eyebrow">The people</p>
            <h2 className="section-title">The people behind the work.</h2>
            <p className="section-intro page-intro">
              Fractionl Studio combines product design, web design, software development, and digital strategy. We stay closely involved in the work and bring in additional specialists only when a project genuinely requires them.
            </p>
          </Reveal>
        )}
        <div className={`team-grid${!standalone ? " team-grid--preview" : ""}`}>
          {team.map((member) => (
            <Reveal as="article" className="team-card" key={member.name}>
              <img className="team-photo" src={member.image} alt={member.imageAlt} loading="lazy" decoding="async" />
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
            <Link className="text-link" to="/about">
              Meet Nicole and Nick
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
            Tell us what you are building—or what is no longer working.
          </Reveal>
          <Reveal as="p" className="page-hero-sub contact-page-sub">
            Whether you are launching a new business, replacing an outdated website, building a digital product, or adding experienced capacity to your team, send us a short note about what you need.
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
          <SectionHeading eyebrow="Inquiry options" title="What can we help with?" />
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
            <h2 className="section-title">What should you include?</h2>
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
          <SectionHeading eyebrow="What happens next" title="A straightforward next step." />
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
            <h2 className="section-title">Prefer email?</h2>
            <p className="section-intro">You can also reach us directly.</p>
          </Reveal>
          <Reveal className="contact-direct">
            <p className="footer-label">Email</p>
            <a className="contact-direct__link" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            <p className="footer-label">Location</p>
            <p>{site.location}</p>
            <p>Working with clients across Canada and remotely.</p>
          </Reveal>
        </div>
      </section>

      <section className="contact">
        <div className="container contact-inner">
          <Reveal as="h2" className="contact-title">
            Ready to start?
          </Reveal>
          <Reveal as="p" className="contact-text">
            Use the inquiry button to tell us what you are working on. We will take it from there.
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
          Start a conversation
        </Reveal>
        <Reveal as="h2" className="contact-title">
          What are you trying to move forward?
        </Reveal>
        <Reveal as="p" className="contact-text">
          Tell us what you are building, improving, or trying to solve. We will help you make sense of the next step and whether Fractionl is the right fit for the work.
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
          <p>Digital design and development support for founders, growing businesses, agencies, and internal teams.</p>
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
        <p>&copy; {year} Fractionl Studio. All rights reserved.</p>
        <p>Designed &amp; built in Edmonton, AB.</p>
      </div>
    </footer>
  );
}

export default App;
