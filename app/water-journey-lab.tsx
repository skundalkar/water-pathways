"use client";

import { useEffect, useState } from "react";

type Scenario = "normal" | "closed-valve" | "main-break";

const scenarioCopy: Record<Scenario, { title: string; detail: string }> = {
  normal: { title: "Water reaches the home", detail: "The valve is open, so treated water can move from storage through the distribution main and service line." },
  "closed-valve": { title: "Flow stops at the valve", detail: "A closed valve blocks the route. The tank can be full while the home still has little or no water." },
  "main-break": { title: "Water escapes before the home", detail: "A break wastes water and can reduce pressure downstream. Operators isolate the damaged section before repair." },
};

export function WaterJourneyLab() {
  const [scenario, setScenario] = useState<Scenario>("normal");
  const [tankLevel, setTankLevel] = useState(72);
  const [motionAllowed, setMotionAllowed] = useState(false);
  const flowReachesHome = scenario === "normal" && tankLevel > 5;
  const hasFlow = scenario !== "closed-valve" && tankLevel > 5;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setMotionAllowed(!media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return <section className="journey-lab" aria-labelledby="journey-lab-title">
    <div className="lab-heading"><div><p className="label">TRY THE SYSTEM</p><h3 id="journey-lab-title">Trace water from storage to a home</h3></div><p>Change one condition, then watch where water can—and cannot—go.</p></div>
    <div className="journey-controls" aria-label="Water system conditions">
      {(["normal", "closed-valve", "main-break"] as Scenario[]).map((option) => <button key={option} type="button" className={scenario === option ? "selected" : ""} aria-pressed={scenario === option} onClick={() => setScenario(option)}>{option === "normal" ? "Normal flow" : option === "closed-valve" ? "Close valve" : "Create main break"}</button>)}
      <label htmlFor="tank-level">Tank level <output>{tankLevel}%</output><input id="tank-level" type="range" min="0" max="100" value={tankLevel} onChange={(event) => setTankLevel(Number(event.target.value))} /></label>
    </div>
    <svg className="journey-diagram" viewBox="0 0 760 330" role="img" aria-labelledby="journey-diagram-title journey-diagram-desc">
      <title id="journey-diagram-title">Drinking water route from a tank through a distribution main to a home</title>
      <desc id="journey-diagram-desc">A simplified water system showing source water, a pump, storage tank, distribution main, valve, and home. The selected condition changes where water flows.</desc>
      <path className="ground" d="M30 255H730" /><path className="route" d="M55 210H125H180V220H645" /><path className="route route-tank" d="M250 160V220" />
      <circle className="source" cx="55" cy="210" r="25" /><path className="source-wave" d="M38 210q8-10 16 0t16 0" />
      <circle className="pump" cx="150" cy="210" r="24" /><path className="pump-mark" d="M140 210h20M150 200v20" />
      <path className="tank-outline" d="M215 87h70v136h-70zM215 87q35-26 70 0" /><rect className="tank-water" x="220" y={218 - tankLevel * 1.25} width="60" height={tankLevel * 1.25} /><path className="tank-top" d="M211 87h78M250 61v26" />
      <g className={scenario === "closed-valve" ? "valve valve-closed" : "valve"}><circle cx="500" cy="220" r="29" /><path d="M481 201l38 38M519 201l-38 38" /></g>
      <path className="service" d="M560 220v35h94v-35" /><path className="house" d="M625 173l42 32v50h-84v-50zM615 205l52-42 52 42" /><path className="door" d="M655 255v-28h20v28" />
      {scenario === "main-break" && <g className="break"><path d="M390 214l9 13 8-13 9 13 9-13" /><path d="M403 230v31" /><path d="M393 248l10 8 10-8 10 8" /></g>}
      {hasFlow && <WaterParticles motionAllowed={motionAllowed} reachesHome={flowReachesHome} />}
      {scenario === "closed-valve" && <text className="diagram-alert" x="456" y="279">closed: flow stops</text>}{scenario === "main-break" && <text className="diagram-alert" x="361" y="279">water escapes</text>}
      <g className="diagram-labels"><text x="30" y="280">Source</text><text x="123" y="280">Pump</text><text x="212" y="42">Storage tank</text><text x="442" y="196">Valve</text><text x="625" y="148">Home</text><text x="328" y="244">Distribution main</text></g>
    </svg>
    <div className="journey-status" aria-live="polite"><strong>{scenarioCopy[scenario].title}</strong><span>{scenarioCopy[scenario].detail}</span></div>
  </section>;
}

function WaterParticles({ motionAllowed, reachesHome }: { motionAllowed: boolean; reachesHome: boolean }) {
  const path = reachesHome ? "M55 210H125H180V220H645" : "M55 210H125H180V220H470";
  if (!motionAllowed) return <circle className="water-dot" cx={reachesHome ? 620 : 445} cy="220" r="7" />;
  return <g>{["0s", "-1.1s", "-2.2s", "-3.3s"].map((begin) => <circle key={begin} className="water-dot" r="7"><animateMotion dur="4.4s" begin={begin} repeatCount="indefinite" path={path} /></circle>)}</g>;
}
