import { ElementType, ReactNode, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, Navigate, NavLink, Route, Routes, useLocation } from "react-router-dom";
import { processSteps, sampleWebsites, services, site, team } from "./data";
import { useReveal, useScrolled } from "./hooks";

const navItems = [
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/work", label: "Work" },
  { to: "/process", label: "How We Work" },
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
    title: "Work | Nicole Design & Co.",
    description: "Sample website concepts from Nicole Design & Co. for service businesses, real estate, and hospitality brands.",
  },
  "/team": {
    title: "Team | Nicole Design & Co.",
    description: "Meet Nicole Buloran and Nick Castillo, the design and development team behind Nicole Design & Co.",
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
        <Route path="/work" element={<WorkPage />} />
        <Route path="/team" element={<TeamPage />} />
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
      <SampleWebsitesSection />
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
          Product design, websites, and development for businesses ready to build better digital experiences.
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
                Nicole Design &amp; Co. is a small design and development studio helping businesses create clearer, more useful digital experiences.
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
          <Link className="btn btn-primary custom-quote-btn" to="/contact">
            Request a Custom Quote
          </Link>
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
          <Link className="btn btn-primary btn-lg" to="/contact">
            Start a Project
          </Link>
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
            title={<>Services built around<br />your business</>}
            intro="A brief look at the ways we help teams plan, design, build, and maintain better digital experiences."
            twoLine
          />
        ) : null}
        <div className="services-grid">
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
        {!standalone ? (
          <Reveal className="section-action">
            <Link className="text-link" to="/process">
              See the process
            </Link>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

function WorkPage() {
  return (
    <PageShell eyebrow="Selected work" title="Sample websites with a practical point of view">
      <SampleWebsitesSection standalone />
    </PageShell>
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
              <p className="work-desc">{website.description}</p>
              <a className="card-link" href={website.url} target="_blank" rel="noopener">
                View Demo<span className="link-arrow" aria-hidden="true">↗</span>
              </a>
            </Reveal>
          ))}
        </div>
        {!standalone ? (
          <Reveal className="section-action">
            <Link className="text-link" to="/work">
              View sample work
            </Link>
          </Reveal>
        ) : null}
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
