import { describe, expect, it } from "vitest";
import { questionBank, questionBankByCategory } from "./question-bank";

describe("practice question bank", () => {
  it("contains more than 500 original scenario variations", () => expect(questionBank.length).toBeGreaterThanOrEqual(500));
  it("covers every official exam category", () => ["disinfection", "hydraulics", "operations", "regulations-safety", "mains-piping", "water-quality"].forEach((category) => expect(questionBankByCategory(category).length).toBeGreaterThan(0)));
  it("has complete answer data", () => questionBank.forEach((question) => { expect(question.choices).toHaveLength(4); expect(question.answer).toBeGreaterThanOrEqual(0); expect(question.answer).toBeLessThan(question.choices.length); expect(question.explanation.length).toBeGreaterThan(20); }));
});
