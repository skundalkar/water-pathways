export function gallonsInPipe(diameterInches: number, lengthFeet: number) {
  const diameterFeet = diameterInches / 12;
  return Math.PI * (diameterFeet / 2) ** 2 * lengthFeet * 7.48052;
}
export function pressureToHead(psi: number) { return psi * 2.31; }
export function scorePercent(correct: number, total: number) { return total ? Math.round((correct / total) * 100) : 0; }
