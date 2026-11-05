# Vitest Browser Mode + coverage-v8 retains finished iframes

20 identical test files each import a module holding a 10 MB array. `fileParallelism: false` runs them in one page. At the start of each file, a browser command forces a GC and prints the page's retained JS heap.

```sh
pnpm install
pnpm exec playwright install chromium
pnpm test            # retained heap: 18 MB for every file
pnpm test:coverage   # retained heap grows by about 11 MB per file
```
