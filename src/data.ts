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
    description: "Designing user-centered products that balance business goals, usability, and scalability.",
  },
  {
    index: "02",
    title: "UX / UI Design",
    description: "Creating intuitive interfaces for web applications, software products, and websites.",
  },
  {
    index: "03",
    title: "Web Design",
    description: "Designing responsive websites that communicate clearly and support business growth.",
  },
  {
    index: "04",
    title: "Development",
    description: "Building reliable websites and digital experiences through front-end, WordPress, and custom development.",
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
