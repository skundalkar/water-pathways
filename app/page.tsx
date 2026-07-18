"use client";

import { useEffect, useMemo, useState } from "react";
import { certificationGuide, glossary, lessons } from "../lib/content";
import { gallonsInPipe, pressureToHead, scorePercent } from "../lib/math";
import { Grade, MasteryRecord, Question } from "../lib/types";

type View = "learn" | "diagnostic" | "calculator" | "guide" | "glossary";
const storageKey = "water-pathways-progress-v1";

export default function Home() {
  const [view, setView] = useState<View>("learn");
  const [grade, setGrade] = useState<Grade>("D1");
  const [lessonIndex, setLessonIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [mastery, setMastery] = useState<MasteryRecord>({});

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) { try { setMastery(JSON.parse(saved)); } catch { /* start fresh */ } }
  }, []);
  useEffect(() => { localStorage.setItem(storageKey, JSON.stringify(mastery)); }, [mastery]);

  const availableLessons = useMemo(() => lessons.filter((lesson) => lesson.grade === "Both" || lesson.grade === grade), [grade]);
  const lesson = availableLessons[Math.min(lessonIndex, availableLessons.length - 1)];
  const needsReview = Object.entries(mastery).filter(([, value]) => value.attempts > 0 && value.correct / value.attempts < 0.7).length;

  function selectGrade(next: Grade) { setGrade(next); setLessonIndex(0); setAnswers({}); setSubmitted(false); }
  function submitQuiz() {
    if (Object.keys(answers).length !== lesson.questions.length) return;
    const next = { ...mastery };
    lesson.questions.forEach((q) => { const prior = next[q.objectiveId] || { correct: 0, attempts: 0 }; next[q.objectiveId] = { attempts: prior.attempts + 1, correct: prior.correct + (answers[q.id] === q.answer ? 1 : 0) }; });
    setMastery(next); setSubmitted(true);
  }
  function nextLesson() { setLessonIndex((n) => (n + 1) % availableLessons.length); setAnswers({}); setSubmitted(false); window.scrollTo({ top: 0, behavior: "smooth" }); }

  return <main>
    <header className="topbar"><a className="brand" href="#top" onClick={() => setView("learn")}><span>◒</span> Water Pathways</a><nav>{(["learn", "diagnostic", "calculator", "guide", "glossary"] as View[]).map((item) => <button key={item} className={view === item ? "active" : ""} onClick={() => setView(item)}>{item === "learn" ? "Learn" : item[0].toUpperCase() + item.slice(1)}</button>)}</nav></header>
    <section className="hero" id="top"><div><p className="eyebrow">CALIFORNIA WATER DISTRIBUTION • BEGINNER FRIENDLY</p><h1>Learn the water system.<br /><em>One clear step at a time.</em></h1><p className="lede">Build confidence for California D1 and D2 with everyday examples, field stories, and practice that explains every answer.</p></div><div className="progress-card"><span>Your study path</span><strong>{grade} preparation</strong><div className="meter"><i style={{ width: `${Math.min(100, Object.keys(mastery).length * 20)}%` }} /></div><small>{Object.keys(mastery).length} objectives practiced · {needsReview} need review</small></div></section>
    <section className="grade-picker" aria-label="Choose certificate level"><span>Preparing for</span><button className={grade === "D1" ? "selected" : ""} onClick={() => selectGrade("D1")}>D1 Foundation</button><button className={grade === "D2" ? "selected" : ""} onClick={() => selectGrade("D2")}>D2 Advanced</button><p>New here? Begin with D1. D2 adds more application, equipment, and map-reading depth.</p></section>
    {view === "learn" && <LessonScreen lesson={lesson} answers={answers} setAnswers={setAnswers} submitted={submitted} submitQuiz={submitQuiz} nextLesson={nextLesson} />}
    {view === "diagnostic" && <Diagnostic grade={grade} mastery={mastery} setMastery={setMastery} />}
    {view === "calculator" && <Calculator />}
    {view === "guide" && <Guide />}
    {view === "glossary" && <Glossary />}
    <footer><strong>Water Pathways</strong><p>A study aid, not an official State Water Board application or accredited course. Always confirm current rules, forms, fees, and exam requirements with the official source.</p></footer>
  </main>;
}

function LessonScreen({ lesson, answers, setAnswers, submitted, submitQuiz, nextLesson }: { lesson: typeof lessons[number]; answers: Record<string, number>; setAnswers: (v: Record<string, number>) => void; submitted: boolean; submitQuiz: () => void; nextLesson: () => void }) {
  const ready = Object.keys(answers).length === lesson.questions.length;
  return <section className="lesson-wrap"><aside className="path"><p>YOUR PATH</p>{["Start here", "System basics", "Water quality", "Hydraulics", "Safe operations", "D2 readiness"].map((phase, i) => <div key={phase} className={i + 1 === lesson.phase ? "current" : i + 1 < lesson.phase ? "done" : ""}><b>{i + 1}</b>{phase}</div>)}</aside><article className="lesson"><p className="eyebrow">PHASE {lesson.phase} · {lesson.objective.category.toUpperCase()}</p><h2>{lesson.title}</h2><p className="intro">{lesson.intro}</p><section className="analogy"><span>✦</span><div><p className="label">MAKE IT FAMILIAR</p><h3>{lesson.analogy.title}</h3><p>{lesson.analogy.text}</p></div></section><section className="system-visual" aria-label="Concept diagram">{lesson.visual.map((item, i) => <div key={item}><b>{i + 1}</b><span>{item}</span>{i < lesson.visual.length - 1 && <i>→</i>}</div>)}</section><section className="copy-block"><p className="label">WHY IT MATTERS IN THE FIELD</p><p>{lesson.application}</p></section>{lesson.example && <section className="worked"><p className="label">WORK IT OUT, STEP BY STEP</p><h3>{lesson.example.title}</h3><ol>{lesson.example.steps.map((step) => <li key={step}>{step}</li>)}</ol><strong>{lesson.example.answer}</strong></section>}<section className="anecdote"><p className="label">FIELD STORY · {lesson.anecdote.title}</p><p>“{lesson.anecdote.story}”</p><strong>Remember: {lesson.anecdote.takeaway}</strong></section><Quiz questions={lesson.questions} answers={answers} setAnswers={setAnswers} submitted={submitted} submitQuiz={submitQuiz} ready={ready} />{submitted && <button className="next" onClick={nextLesson}>Continue to the next concept <span>→</span></button>}</article></section>;
}

function Quiz({ questions, answers, setAnswers, submitted, submitQuiz, ready }: { questions: Question[]; answers: Record<string, number>; setAnswers: (v: Record<string, number>) => void; submitted: boolean; submitQuiz: () => void; ready: boolean }) { const correct = questions.filter((q) => answers[q.id] === q.answer).length; return <section className="quiz"><p className="eyebrow">QUICK CHECK</p><h2>Let’s make it stick.</h2><p>There is no penalty for a miss. Read the explanation—this is where learning happens.</p>{questions.map((q, qi) => <fieldset key={q.id} disabled={submitted}><legend>{qi + 1}. {q.prompt}</legend>{q.choices.map((choice, ci) => <label key={choice} className={`${answers[q.id] === ci ? "chosen" : ""} ${submitted && ci === q.answer ? "correct" : ""} ${submitted && answers[q.id] === ci && ci !== q.answer ? "incorrect" : ""}`}><input type="radio" name={q.id} checked={answers[q.id] === ci} onChange={() => setAnswers({ ...answers, [q.id]: ci })} />{choice}</label>)}{submitted && <p className="explanation"><b>{answers[q.id] === q.answer ? "Correct. " : "Helpful correction. "}</b>{q.explanation}</p>}</fieldset>)}{submitted ? <div className="score">You got {correct} of {questions.length} right. {correct === questions.length ? "Excellent work." : "Keep going—review builds confidence."}</div> : <button className="primary" disabled={!ready} onClick={submitQuiz}>{ready ? "See my answers" : "Answer each question to continue"}</button>}</section> }

function Diagnostic({ grade, mastery, setMastery }: { grade: Grade; mastery: MasteryRecord; setMastery: (v: MasteryRecord) => void }) { const pool = lessons.filter((l) => l.grade === "Both" || l.grade === grade).flatMap((l) => l.questions); const [answers, setAnswers] = useState<Record<string, number>>({}); const [done, setDone] = useState(false); const submit = () => { const next = { ...mastery }; pool.forEach(q => { const prior = next[q.objectiveId] || { correct: 0, attempts: 0 }; next[q.objectiveId] = { attempts: prior.attempts + 1, correct: prior.correct + (answers[q.id] === q.answer ? 1 : 0) }; }); setMastery(next); setDone(true); }; const score = pool.filter(q => answers[q.id] === q.answer).length; return <section className="page"><p className="eyebrow">UNTIMED PRACTICE</p><h2>Find your best next study step</h2><p className="intro">This is a low-pressure diagnostic, not an official exam simulation. Answer what you know and use the result to choose where to focus.</p><Quiz questions={pool} answers={answers} setAnswers={setAnswers} submitted={done} submitQuiz={submit} ready={Object.keys(answers).length === pool.length} />{done && <div className="results"><h3>{scorePercent(score, pool.length)}% diagnostic score</h3><p>{scorePercent(score, pool.length) >= 70 ? "You have a solid foundation. Revisit any explanation that surprised you." : "Your recommended next step is to return to Learn and build the foundations one small concept at a time."}</p></div>}</section> }

function Calculator() { const [diameter, setDiameter] = useState(12); const [length, setLength] = useState(100); const [psi, setPsi] = useState(40); return <section className="page"><p className="eyebrow">GUIDED REFERENCE</p><h2>Calculator, with the why included</h2><p className="intro">Use these as learning tools. Every answer shows the unit and the idea behind it.</p><div className="calculator-grid"><section><h3>Water in a pipe</h3><label>Pipe diameter (inches)<input type="number" value={diameter} min="0" onChange={e => setDiameter(Number(e.target.value))} /></label><label>Pipe length (feet)<input type="number" value={length} min="0" onChange={e => setLength(Number(e.target.value))} /></label><output>{gallonsInPipe(diameter, length).toFixed(1)} gallons</output><p>A pipe is a long cylinder. This finds its cylinder volume, then converts cubic feet to gallons.</p></section><section><h3>Pressure to head</h3><label>Pressure (psi)<input type="number" value={psi} onChange={e => setPsi(Number(e.target.value))} /></label><output>{pressureToHead(psi).toFixed(1)} feet of head</output><p>In water, one psi is approximately 2.31 feet of head. This connects a gauge reading to the height of water creating that push.</p></section></div></section> }

function Guide() { return <section className="page"><p className="eyebrow">OFFICIAL-PROCESS GUIDE</p><h2>Your D1/D2 certification checklist</h2><p className="intro">This guide makes the process easier to understand. The State Water Board’s current instructions always control.</p><div className="guide-list">{certificationGuide.map((entry, i) => <article key={entry.title}><b>{i + 1}</b><div><h3>{entry.title}</h3><p>{entry.body}</p><small>Last verified: {entry.verified} · {entry.source}</small><a href={entry.url} target="_blank" rel="noreferrer">Open official resource ↗</a></div></article>)}</div></section> }

function Glossary() { return <section className="page"><p className="eyebrow">PLAIN-LANGUAGE GLOSSARY</p><h2>Words you can use with confidence</h2><p className="intro">No unexplained jargon. Each definition is written for someone seeing the term for the first time.</p><div className="glossary">{glossary.map(term => <article key={term.term}><h3>{term.term} {term.pronunciation && <small>({term.pronunciation})</small>}</h3><p>{term.definition}</p><a href={`#${term.lessonId}`}>Study the related lesson →</a></article>)}</div></section> }
