import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';
import type { BrowserCommand } from 'vitest/node';

// Forces a full GC in the page, then prints the JS heap still in use.
const logRetainedHeap: BrowserCommand<[]> = async ({ page, testPath }) => {
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('HeapProfiler.collectGarbage');
  const { usedSize } = await cdp.send('Runtime.getHeapUsage');
  await cdp.detach();
  console.error(`retained heap: ${Math.round(usedSize / 2 ** 20)} MB before ${testPath?.split('/').pop()}`);
};

export default defineConfig({
  test: {
    fileParallelism: false,
    coverage: { provider: 'v8', include: ['src/**'] },
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
      commands: { logRetainedHeap },
    },
  },
});
