// global.d.ts

export {};

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (
        siteKey: string,
        options?: { action: string }
      ) => Promise<string>;
      render: (...args: any[]) => any;
      reset: (...args: any[]) => void;
      getResponse: (...args: any[]) => string;
    };
  }
}


