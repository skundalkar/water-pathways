import { describe, expect, it } from "vitest";
import { gallonsInPipe, pressureToHead, scorePercent } from "./math";
describe("water math", () => { it("calculates head from pressure", () => expect(pressureToHead(40)).toBeCloseTo(92.4)); it("calculates pipe volume", () => expect(gallonsInPipe(12, 10)).toBeCloseTo(58.75, 1)); it("scores attempts", () => expect(scorePercent(3, 4)).toBe(75)); });
