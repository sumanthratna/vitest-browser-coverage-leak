// About 10 MB that lives as long as the test file's iframe.
export const rows: number[] = new Array(2_500_000).fill(7);

export function count(): number {
  return rows.length;
}
