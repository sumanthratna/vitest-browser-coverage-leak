declare module 'vitest/browser' {
  interface BrowserCommands {
    logRetainedHeap: () => Promise<void>;
  }
}
export {};
