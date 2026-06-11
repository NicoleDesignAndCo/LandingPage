import nickHeadshot from "../nick.avif";
import nicoleHeadshot from "../nicole.jpeg";

export const site = {
  name: "Nicole Design & Co.",
  domain: "https://nicoledesignandco.com",
  email: "hello@nicoledesignandco.com",
  location: "Edmonton, Alberta",
  tallyFormId: "xXzMGr",
  tallyUrl: "https://tally.so/r/xXzMGr",
};

export const services = [
  {
    index: "01",
    title: "Website Reliability",
    description: "Keep your website secure, updated, and online with hosting, backups, monitoring, bug fixes, and software updates.",
  },
  {
    index: "02",
    title: "Website Presence",
    description:
      "Keep your website current, professional, and aligned with your business through quarterly reviews and approved improvements to existing pages.",
  },
  {
    index: "03",
    title: "Growth Partner",
    description:
      "Your on-demand digital growth and support team for website updates, landing pages, marketing materials, social assets, and promotional support.",
  },
  {
    index: "04",
    title: "Product Design Partner",
    description:
      "Ongoing product design support for SaaS teams, startups, and founders who need UX/UI, prototypes, user flows, and developer handoff.",
  },
] as const;

export const sampleWebsites = [
  {
    title: "Maya Bennett Real Estate",
    businessType: "Independent Realtor",
    description:
      "A personal brand website for an independent realtor, featuring listings, buying and selling pages, lead capture, and a single property listing page.",
    url: "https://maya-bennett.vercel.app/",
  },
  {
    title: "Serene Paths Clinic",
    businessType: "Therapist / Coach / Wellness Provider",
    description:
      "A calm, professional website for a therapist, coach, or wellness provider, featuring services, resources, consultation booking, and trust-building content.",
    url: "https://serene-paths.vercel.app/",
  },
  {
    title: "North Peak Coffee Co.",
    businessType: "Local Ecommerce",
    description:
      "A small ecommerce website for a local coffee roaster, featuring product browsing, product detail pages, cart experience, and brand storytelling.",
    url: "https://north-peak-coffee-co.vercel.app/",
  },
] as const;

export const processSteps = [
  {
    index: "01",
    title: "Discover",
    description: "Understand goals, users, and opportunities before creating solutions.",
  },
  {
    index: "02",
    title: "Design",
    description: "Create thoughtful experiences that balance clarity, usability, and aesthetics.",
  },
  {
    index: "03",
    title: "Build",
    description: "Support implementation through development, collaboration, and execution.",
  },
] as const;

export const team = [
  {
    name: "Nicole Buloran",
    role: "Founder & Product Designer",
    bio: "9+ years designing SaaS products, websites, design systems, and digital experiences.",
    image: nicoleHeadshot,
    imageAlt: "Nicole Buloran",
    tags: ["Product Design", "UX/UI Design", "Web Design", "Product Strategy"],
    portfolio: "https://nicole-buloran.com/",
    linkedin: "https://www.linkedin.com/in/nicolebuloran/",
    email: "nicole@nicoledesignandco.com",
  },
  {
    name: "Nick Castillo",
    role: "Developer",
    bio: "Web development and software implementation.",
    image: nickHeadshot,
    imageAlt: "Nick Castillo",
    tags: ["Web Development", "Software Development"],
    portfolio: "https://nick-castillo.ca/",
    linkedin: "https://www.linkedin.com/in/nick-castillo-full-stack-developer/",
    email: "nickc@nicoledesignandco.com",
  },
] as const;
