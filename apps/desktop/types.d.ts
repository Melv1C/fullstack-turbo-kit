declare global {
  interface Window {
    bridge: {
      ping: () => string;
    };
  }
}

export {};