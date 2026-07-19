"use client";

import { useMemo, useState } from "react";
import { questionBank } from "../lib/question-bank";
import { Grade, MasteryRecord } from "../lib/types";
import { QuestionVisual } from "./question-visual";

const categories = ["disinfection", "hydraulics", "operations", "regulations-safety", "mains-piping", "water-quality"];

export function BankDiagnostic({ grade, mastery, setMastery }: { grade: Grade; mastery: MasteryRecord; setMastery: (value: MasteryRecord) => void }) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);
  const questions = useMemo(() => { const base = questionBank.filter((q) => q.id.endsWith("-1") && (q.grade === "Both" || q.grade === grade)); return categories.flatMap((category) => base.filter((q) => q.categoryId === category).slice(0, 3)); }, [grade]);
  const submit = () => { const next = { ...mastery }; questions.forEach((q) => { const prior = next[q.objectiveId] || { correct: 0, attempts: 0 }; next[q.objectiveId] = { attempts: prior.attempts + 1, correct: prior.correct + (answers[q.id] === q.answer ? 1 : 0) }; }); setMastery(next); setDone(true); };
  const correct = questions.filter((q) => answers[q.id] === q.answer).length;
  return <section className="page"><p className="eyebrow">PRACTICE BANK DIAGNOSTIC</p><h2>18 questions, balanced across the official categories</h2><p className="intro">This untimed diagnostic selects three original questions from each official category. Read the explanation after every answer; a miss is a study direction, not a grade.</p><section className="quiz">{questions.map((q, index) => <fieldset key={q.id} disabled={done}><legend><small>QUESTION {index + 1} OF {questions.length} · {q.categoryId.replaceAll("-", " ")}</small>{q.prompt}</legend><QuestionVisual categoryId={q.categoryId} objectiveId={q.objectiveId} />{q.choices.map((choice, choiceIndex) => <label key={choice} className={`${answers[q.id] === choiceIndex ? "chosen" : ""} ${done && choiceIndex === q.answer ? "correct" : ""} ${done && answers[q.id] === choiceIndex && choiceIndex !== q.answer ? "incorrect" : ""}`}><input type="radio" name={q.id} checked={answers[q.id] === choiceIndex} onChange={() => setAnswers({ ...answers, [q.id]: choiceIndex })} />{choice}</label>)}{done && <p className="explanation"><b>{answers[q.id] === q.answer ? "Correct. " : "Review this. "}</b>{q.explanation}</p>}</fieldset>)}{done ? <div className="score">You answered {correct} of {questions.length} correctly. Review the explanations, then return to the category path for any weak topic.</div> : <button className="primary" disabled={Object.keys(answers).length !== questions.length} onClick={submit}>See my diagnostic results</button>}</section></section>;
}
