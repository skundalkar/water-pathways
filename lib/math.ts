export function gallonsInPipe(diameterInches: number, lengthFeet: number) {
  const diameterFeet = diameterInches / 12;
  return Math.PI * (diameterFeet / 2) ** 2 * lengthFeet * 7.48052;
}
export function pressureToHead(psi: number) { return psi * 2.31; }
export function scorePercent(correct: number, total: number) { return total ? Math.round((correct / total) * 100) : 0; }
export function pipeArea(diameterInches: number) { return Math.PI * (diameterInches / 2) ** 2; }
export function flowGpm(volumeGallons: number, minutes: number) { return minutes > 0 ? volumeGallons / minutes : 0; }
export function velocityFps(flowGpmValue: number, diameterInches: number) { return diameterInches > 0 ? (0.4085 * flowGpmValue) / diameterInches ** 2 : 0; }
export function chemicalPoundsPerDay(mgL: number, mgd: number) { return mgL * mgd * 8.34; }
export function forceOnValve(psi: number, diameterInches: number) { return psi * pipeArea(diameterInches); }
