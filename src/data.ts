import nickHeadshot from "../nick.avif";
import nicoleHeadshot from "../nicole.jpeg";

export const site = {
  name: "Nicole Design & Co.",
  domain: "https://nicoledesignandco.com",
  email: "hello@nicoledesignandco.com",
  location: "Edmonton, Alberta",
  tallyFormId: "xXzMGr",
};

export const services = [
  {
    index: "01",
    title: "Product Design",
    description: "Shape product ideas into clear, usable experiences that support real business goals.",
  },
  {
    index: "02",
    title: "UX/UI Design",
    description: "Plan flows, interfaces, and design systems that make digital products easier to use.",
  },
  {
    index: "03",
    title: "Web Design & Development",
    description: "Design and build responsive websites that communicate clearly and are easy to maintain.",
  },
  {
    index: "04",
    title: "Marketing Materials & Digital Assets",
    description: "Create polished digital assets for launches, campaigns, presentations, and ongoing brand needs.",
  },
  {
    index: "05",
    title: "Digital Support Packages",
    description: "Ongoing design and development support for businesses that need a dependable digital partner.",
  },
] as const;

export const sampleWebsites = [
  {
    title: "Maya Bennett Real Estate",
    description: "A polished real estate website concept built around trust, local expertise, and clear property discovery.",
    url: "https://maya-bennett.vercel.app/",
  },
  {
    title: "Serene Paths Clinic",
    description: "A calm clinic website concept with accessible service information and a warm path toward booking.",
    url: "https://serene-paths.vercel.app/",
  },
  {
    title: "North Peak Coffee Co.",
    description: "A focused coffee brand website concept with product storytelling, location details, and ecommerce-ready structure.",
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
