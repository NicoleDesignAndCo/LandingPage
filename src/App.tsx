import { ElementType, ReactNode, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import { processSteps, services, site, team } from "./data";
import { useReveal, useScrolled } from "./hooks";

const navItems = [
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/process", label: "How We Work" },
  { to: "/team", label: "Team" },
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
  "/team": {
    title: "Team | Nicole Design & Co.",
    description: "Meet the design and development team behind Nicole Design & Co.",
  },
  "/contact": {
    title: "Contact | Nicole Design & Co.",
    description: "Start a project with Nicole Design & Co. or email hello@nicoledesignandco.com.",
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
        <Route path="/team" element={<TeamPage />} />
        <Route path="/contact" element={<ContactPage />} />
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
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
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

function TallyButton({ children, className }: { children: ReactNode; className: string }) {
  return (
    <button
      type="button"
      className={className}
      data-tally-open={site.tallyFormId}
      data-tally-emoji-text="👋"
      data-tally-emoji-animation="wave"
    >
      {children}
    </button>
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
      <TeamSection />
      <ContactSection />
    </>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <Reveal as="p" className="eyebrow">
          Design. Develop. Support. <span className="italic">Growing Businesses</span>
        </Reveal>
        <Reveal as="h1" className="hero-title">
          Nicole Design <span className="amp">&amp;</span> Co.
        </Reveal>
        <Reveal as="p" className="hero-sub">
          We help businesses create, improve, and maintain their digital presence through thoughtful design, reliable development, and ongoing
          support. Whether you're launching something new, improving an existing website, or looking for a long-term partner to support your
          business, we're here to help.
        </Reveal>
        <Reveal className="hero-actions">
          <TallyButton className="btn btn-primary">Start a Project</TallyButton>
          <Link to="/team" className="btn btn-ghost">
            Meet the Team
          </Link>
        </Reveal>
      </div>
      <Reveal className="container hero-meta">
        <div className="meta-rule" />
        <ul className="hero-disciplines">
          <li>Product Design</li>
          <li>UX / UI</li>
          <li>Web Design</li>
          <li>Development</li>
        </ul>
      </Reveal>
    </section>
  );
}

function AboutPage() {
  return (
    <PageShell eyebrow="About the studio" title="Your Design & Development Partner">
      <AboutSection standalone />
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
          <h2 className="about-lead">Your Design &amp; Development Partner</h2>
          <p className="about-text">Nicole Design &amp; Co. partners with businesses to bring ideas to life and support their growth online.</p>
          <p className="about-text">
            From websites and software to marketing materials and ongoing improvements, we combine design thinking with technical expertise to
            create solutions that are both effective and easy to maintain.
          </p>
          <p className="about-text">Our goal is simple: help businesses move forward with confidence.</p>
        </Reveal>
      </div>
    </section>
  );
}

function ServicesPage() {
  return (
    <PageShell eyebrow="What we do" title="Services built around your business">
      <ServicesSection standalone />
    </PageShell>
  );
}

function ServicesSection({ standalone = false }: { standalone?: boolean }) {
  return (
    <section className={`services${standalone ? " page-section" : ""}`}>
      <div className="container">
        {!standalone ? (
          <SectionHeading eyebrow="What we do" title={<>Services built around<br />your business</>} twoLine />
        ) : null}
        <div className="services-grid">
          {services.map((service) => (
            <Reveal as="article" className="service-card" key={service.title}>
              <span className="service-index">{service.index}</span>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.description}</p>
            </Reveal>
          ))}
        </div>
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
          <SectionHeading eyebrow="How we work" title={<>A simple,<br />considered process</>} twoLine />
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
      </div>
    </section>
  );
}

function TeamPage() {
  return (
    <PageShell eyebrow="The people" title="The people behind the work.">
      <TeamSection standalone />
    </PageShell>
  );
}

function TeamSection({ standalone = false }: { standalone?: boolean }) {
  return (
    <section className={`team${standalone ? " page-section" : ""}`}>
      <div className="container">
        {!standalone ? (
          <SectionHeading
            eyebrow="The people"
            title="The people behind the work."
            intro="Nicole Design & Co. combines design strategy and development expertise. Explore our individual portfolios to learn more about our experience and selected projects."
          />
        ) : (
          <Reveal className="section-head section-head--wide">
            <p className="section-intro page-intro">
              Nicole Design &amp; Co. combines design strategy and development expertise. Explore our individual portfolios to learn more about
              our experience and selected projects.
            </p>
          </Reveal>
        )}
        <div className="team-grid">
          {team.map((member) => (
            <Reveal as="article" className="team-card" key={member.name}>
              <img className="team-photo" src={member.image} alt={member.imageAlt} />
              <div className="team-info">
                <h3 className="team-name">{member.name}</h3>
                <p className="team-role">{member.role}</p>
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
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactPage() {
  return <ContactSection standalone />;
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

function PageShell({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
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
