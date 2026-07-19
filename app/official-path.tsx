const phases = [
  [1, "Disinfection", "15 D1 · 20 D2"],
  [2, "System design & hydraulics", "20 D1 · 20 D2"],
  [3, "Equipment, maintenance & inspections", "20 D1 · 20 D2"],
  [4, "Regulations, management & safety", "15 D1 · 10 D2"],
  [5, "Water mains & piping", "20 D1 · 20 D2"],
  [6, "Water quality & water source", "10 D1 · 10 D2"]
] as const;

export function OfficialPath({ activePhase, onSelect }: { activePhase: number; onSelect: (phase: number) => void }) {
  return <section className="official-path" aria-label="Official D1/D2 exam categories">
    <div><p className="eyebrow">YOUR EXAM PATH</p><h2>Study by official category</h2><p>Orientation comes first. Then choose any official category to study in the order that works for you.</p></div>
    <div className="official-path-grid">{phases.map(([number, title, count]) => <button key={number} className={activePhase === number ? "active" : ""} onClick={() => onSelect(number)}><b>{number}</b><span>{title}</span><small>{count} questions on the official exam</small></button>)}</div>
  </section>;
}
