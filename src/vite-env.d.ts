/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GA_MEASUREMENT_ID?: string;
  readonly VITE_GA_DEBUG?: string;
}

interface Window {
  dataLayer?: unknown[][];
  gtag?: (...args: unknown[]) => void;
}
