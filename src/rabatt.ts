export function studentPris(pris: number): number {
  return Number.parseFloat((pris * (1 - 10 / 100)).toFixed(2));
}
