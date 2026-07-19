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
  return <aside className="question-visual" aria-label={`${visual.label} visual support`}><span aria-hidden="true">{visual.icon}</span><div><strong>{visual.label}</strong><small>{objectiveId.replaceAll("-", " ")} · {visual.detail}</small></div></aside>;
}
