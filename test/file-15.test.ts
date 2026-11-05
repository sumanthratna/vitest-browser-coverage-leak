import { expect, test } from 'vitest';
import { commands } from 'vitest/browser';
import { count } from '../src/allocate';

test('allocates', async () => {
  await commands.logRetainedHeap();
  expect(count()).toBe(2_500_000);
});
