import { describe, expect, it } from "vitest";
import { distributionBlueprint } from "./blueprint";
import { questionBank, questionBankByCategory } from "./question-bank";

describe("practice question bank", () => {
  it("contains more than 500 original scenario variations", () => expect(questionBank.length).toBeGreaterThanOrEqual(500));
  it("covers every official exam category", () => ["disinfection", "hydraulics", "operations", "regulations-safety", "mains-piping", "water-quality"].forEach((category) => expect(questionBankByCategory(category).length).toBeGreaterThan(0)));
  it("has complete answer data", () => questionBank.forEach((question) => { expect(question.choices).toHaveLength(4); expect(question.answer).toBeGreaterThanOrEqual(0); expect(question.answer).toBeLessThan(question.choices.length); expect(question.explanation.length).toBeGreaterThan(20); }));
  it("includes applied system-choice scenarios without presenting them as final engineering design", () => {
    const scenarioQuestions = questionBank.filter((question) => question.prompt.toLowerCase().includes("scenario:"));
    expect(scenarioQuestions.length).toBeGreaterThanOrEqual(80);
    expect(scenarioQuestions.some((question) => question.prompt.includes("pipe"))).toBe(true);
    expect(scenarioQuestions.some((question) => question.prompt.includes("valve"))).toBe(true);
    expect(scenarioQuestions.some((question) => question.prompt.includes("SCADA") || question.prompt.includes("control"))).toBe(true);
    scenarioQuestions.forEach((question) => expect(question.explanation).toMatch(/utility|engineering|design|procedure/i));
  });
  it("maps every published-app objective to practice and keeps D2-only practice out of D1", () => {
    const objectives = distributionBlueprint.flatMap((category) => category.objectives);
    objectives.forEach((objective) => {
      const mapped = questionBank.filter((question) => question.objectiveId === objective.id);
      expect(mapped.length, objective.id).toBeGreaterThan(0);
      if (objective.grade === "D2") expect(mapped.every((question) => question.grade === "D2")).toBe(true);
    });
  });
});
