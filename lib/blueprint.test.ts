import { describe, expect, it } from "vitest";
import { distributionBlueprint, totalExamQuestions, totalTargetRange } from "./blueprint";

describe("D1/D2 curriculum blueprint", () => {
  it("matches the published 100-question D1 and D2 allocation", () => { expect(totalExamQuestions("D1")).toBe(100); expect(totalExamQuestions("D2")).toBe(100); });
  it("sets a question bank large enough for varied practice", () => { const [minimum, maximum] = totalTargetRange(); expect(minimum).toBeGreaterThanOrEqual(350); expect(maximum).toBeGreaterThanOrEqual(500); });
  it("has unique learning objectives", () => { const ids = distributionBlueprint.flatMap((category) => category.objectives.map((objective) => objective.id)); expect(new Set(ids).size).toBe(ids.length); });
});
