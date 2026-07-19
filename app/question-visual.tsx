const visualCopy: Record<string, { label: string; detail: string; icon: string }> = {
  disinfection: { label: "Water-quality sequence", detail: "Treat → allow contact time → test → release safely", icon: "✦" },
  hydraulics: { label: "Hydraulic system", detail: "Elevation, pressure, flow direction, and restrictions work together", icon: "↔" },
  operations: { label: "Equipment in the system", detail: "Confirm the asset and predict its system effect before operating", icon: "◉" },
  "regulations-safety": { label: "Safe work decision", detail: "Identify the hazard, use required protection, then proceed", icon: "⚠" },
  "mains-piping": { label: "Pipe support and repair", detail: "Support, connect, backfill, and verify the main", icon: "━" },
  "water-quality": { label: "Water-quality check", detail: "Observe, sample correctly, and protect the source", icon: "≈" },
};

export function QuestionVisual({ categoryId, objectiveId }: { categoryId: string; objectiveId: string }) {
  const visual = visualCopy[categoryId];
  if (!visual) return null;
  return <aside className="question-visual" aria-label={`${visual.label} visual support`}><MiniDiagram categoryId={categoryId} /><div><strong>{visual.label}</strong><small>{objectiveId.replaceAll("-", " ")} · {visual.detail}</small></div></aside>;
}

function MiniDiagram({ categoryId }: { categoryId: string }) {
  if (categoryId === "hydraulics") return <svg viewBox="0 0 150 72" role="img" aria-label="Elevated tank feeds a pipe and pressure gauge"><rect x="14" y="11" width="28" height="45" className="mini-outline" /><rect x="17" y="23" width="22" height="30" className="mini-water" /><path d="M28 56H110" className="mini-pipe" /><circle cx="124" cy="56" r="14" className="mini-gauge" /><path d="M124 56l7-7" className="mini-hand" /><text x="113" y="61" className="mini-text">psi</text></svg>;
  if (categoryId === "disinfection") return <svg viewBox="0 0 150 72" role="img" aria-label="Disinfection sequence from treatment through testing"><path d="M20 36H130" className="mini-pipe" />{[28, 62, 96, 128].map((x, index) => <g key={x}><circle cx={x} cy="36" r="10" className={index < 3 ? "mini-water" : "mini-gauge"} /><text x={x - 3} y="40" className="mini-text">{index + 1}</text></g>)}</svg>;
  if (categoryId === "operations") return <svg viewBox="0 0 150 72" role="img" aria-label="Valve controlling flow in a distribution pipe"><path d="M16 36H134" className="mini-pipe" /><circle cx="75" cy="36" r="20" className="mini-gauge" /><path d="M61 22l28 28m0-28L61 50" className="mini-hand" /><path d="M20 21h28" className="mini-flow" /></svg>;
  if (categoryId === "regulations-safety") return <svg viewBox="0 0 150 72" role="img" aria-label="Protected excavation work zone"><path d="M14 54H136" className="mini-road" /><path d="M58 20h34l-6 34H64z" className="mini-trench" /><path d="M43 54v-20m14 20v-20m35 20v-20m14 20v-20" className="mini-barrier" /></svg>;
  if (categoryId === "mains-piping") return <svg viewBox="0 0 150 72" role="img" aria-label="Pipe supported by bedding in a trench"><path d="M15 16H135" className="mini-road" /><path d="M42 16l12 42h42l12-42" className="mini-trench" /><path d="M56 48H94" className="mini-pipe" /><path d="M53 56h44" className="mini-water" /></svg>;
  return <svg viewBox="0 0 150 72" role="img" aria-label="Water sample taken from a protected source"><path d="M16 54h118" className="mini-pipe" /><path d="M56 54V24h45v30" className="mini-outline" /><path d="M62 38h33v16H62z" className="mini-water" /><path d="M114 22v29" className="mini-hand" /><circle cx="114" cy="18" r="6" className="mini-gauge" /></svg>;
}
