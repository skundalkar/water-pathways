"use client";

import { useState, type ReactNode } from "react";

export function ConceptLab({ lessonId }: { lessonId: string }) {
  switch (lessonId) {
    case "pressure": return <PressureLab />;
    case "water-hammer": return <HammerLab />;
    case "backflow": return <BackflowLab />;
    case "d2-system-maps": return <MapLab />;
    case "main-disinfection": return <DisinfectionLab />;
    case "valve-inspection": return <ValveLab />;
    case "field-safety": return <SafetyLab />;
    case "main-repair": return <RepairLab />;
    default: return null;
  }
}

function Lab({ title, prompt, children }: { title: string; prompt: string; children: ReactNode }) {
  return <section className="concept-lab" aria-label={title}><div className="lab-heading"><div><p className="label">TRY THE CONCEPT</p><h3>{title}</h3></div><p>{prompt}</p></div>{children}</section>;
}

function PressureLab() {
  const [height, setHeight] = useState(60);
  const psi = Math.round(height * 0.433);
  return <Lab title="Pressure comes from elevation" prompt="Raise the water level and watch the pressure gauge respond."><div className="lab-controls"><label htmlFor="water-height">Water above the pipe <output>{height} ft</output><input id="water-height" type="range" min="0" max="120" value={height} onChange={e => setHeight(Number(e.target.value))} /></label></div><svg className="concept-diagram" viewBox="0 0 720 230" role="img" aria-label="Tank height creates pressure at a downstream gauge"><rect className="lab-tank" x="110" y="35" width="100" height="145" /><rect className="lab-water" x="116" y={174 - height} width="88" height={height} /><path className="lab-pipe" d="M160 180H530" /><circle className="lab-gauge" cx="555" cy="180" r="43" /><path className="gauge-hand" style={{ transform: `rotate(${Math.min(120, psi * 2)}deg)`, transformOrigin: "555px 180px" }} d="M555 180l25-25" /><text className="lab-label" x="104" y="210">storage tank</text><text className="lab-value" x="530" y="188">{psi} psi</text></svg><div className="lab-status"><strong>{psi} psi at the gauge</strong><span>About 0.433 psi is created by every foot of water height.</span></div></Lab>;
}

function HammerLab() {
  const [speed, setSpeed] = useState<"slow" | "fast">("slow");
  const surge = speed === "fast" ? "High pressure surge" : "Smaller pressure change";
  return <Lab title="Closing speed changes the surge" prompt="Compare a gradual valve closure with a sudden stop."><div className="lab-buttons"><button className={speed === "slow" ? "selected" : ""} onClick={() => setSpeed("slow")} aria-pressed={speed === "slow"}>Close slowly</button><button className={speed === "fast" ? "selected" : ""} onClick={() => setSpeed("fast")} aria-pressed={speed === "fast"}>Close suddenly</button></div><svg className="concept-diagram" viewBox="0 0 720 220" role="img" aria-label="Pressure wave moving toward a closed valve"><path className="lab-pipe" d="M70 125H650" /><circle className={speed === "fast" ? "lab-valve shut" : "lab-valve"} cx="590" cy="125" r="28" /><path className="valve-cross" d="M574 109l32 32m0-32l-32 32" />{[0, 1, 2].map(i => <path key={i} className={speed === "fast" ? "pressure-wave large" : "pressure-wave"} d={`M${450 - i * 80} 94q20 31 40 0q20 31 40 0`} />)}<text className="lab-label" x="75" y="165">moving water</text><text className="lab-label" x="552" y="175">valve</text></svg><div className="lab-status"><strong>{surge}</strong><span>{speed === "fast" ? "Stopping moving water quickly sends a stronger shock wave back through the pipe." : "Gradual closure gives moving water more time to slow down."}</span></div></Lab>;
}

function BackflowLab() {
  const [protectedFlow, setProtectedFlow] = useState(true);
  const [drop, setDrop] = useState(false);
  const reverse = drop && !protectedFlow;
  return <Lab title="Keep flow moving the safe way" prompt="Create a pressure drop, then add or remove protection."><div className="lab-buttons"><button className={drop ? "selected" : ""} onClick={() => setDrop(!drop)} aria-pressed={drop}>Simulate pressure drop</button><button className={protectedFlow ? "selected" : ""} onClick={() => setProtectedFlow(!protectedFlow)} aria-pressed={protectedFlow}>{protectedFlow ? "Protection installed" : "Protection removed"}</button></div><svg className="concept-diagram" viewBox="0 0 720 220" role="img" aria-label="Public water main connected to a hose and bucket"><path className="lab-pipe" d="M65 130H340V175H540" /><path className={reverse ? "reverse-flow" : "forward-flow"} d={reverse ? "M510 175H120" : "M100 130H510"} /><rect className="lab-device" x="315" y="108" width="50" height="44" /><text className="device-symbol" x="331" y="138">{protectedFlow ? "✓" : "×"}</text><path className="bucket" d="M535 142h92l-12 55h-68z" /><path className="hose" d="M580 142v-50h75" /><text className="lab-label" x="62" y="105">public main</text><text className="lab-label" x="535" y="210">non-drinking source</text></svg><div className="lab-status"><strong>{reverse ? "Reverse flow can pull contamination toward the main" : drop ? "Protection prevents reverse flow" : "Normal pressure keeps water moving outward"}</strong><span>{reverse ? "This is the back-siphonage risk created by a pressure drop and an unprotected cross-connection." : "A backflow preventer is one layer of protection at a cross-connection."}</span></div></Lab>;
}

function MapLab() {
  const [valves, setValves] = useState<"none" | "near" | "wide">("none");
  const affected = valves === "near" ? "12 homes" : valves === "wide" ? "48 homes" : "0 homes";
  return <Lab title="Isolate the smallest repair area" prompt="A leak needs the right valves—not every nearby valve—closed."><div className="lab-buttons"><button className={valves === "near" ? "selected" : ""} onClick={() => setValves("near")} aria-pressed={valves === "near"}>Close nearby valves</button><button className={valves === "wide" ? "selected" : ""} onClick={() => setValves("wide")} aria-pressed={valves === "wide"}>Close wider area</button><button onClick={() => setValves("none")}>Reset</button></div><svg className="concept-diagram" viewBox="0 0 720 240" role="img" aria-label="Simplified distribution map with a main break and valves"><path className="map-main" d="M70 120H650M190 120V55M190 120v65M470 120V55M470 120v65" />{[190, 470].map(x => <circle key={x} className={valves === "near" ? "map-valve closed" : "map-valve"} cx={x} cy="120" r="13" />)}<circle className="map-break" cx="350" cy="120" r="16" /><path className="map-break-line" d="M340 110l20 20m0-20l-20 20" />{valves === "wide" && <rect className="map-shutoff" x="65" y="90" width="590" height="60" />}<text className="lab-label" x="310" y="92">main break</text><text className="lab-label" x="100" y="215">homes</text><text className="lab-label" x="520" y="215">homes</text></svg><div className="lab-status"><strong>{valves === "none" ? "Choose a valve strategy" : `${affected} without water during isolation`}</strong><span>{valves === "near" ? "Using the nearest isolation valves limits service interruption." : valves === "wide" ? "Closing extra valves isolates more customers than the repair requires." : "Maps help operators predict the effect before operating equipment."}</span></div></Lab>;
}

function DisinfectionLab() {
  const steps = ["Repair", "Disinfect", "Contact time", "Test", "Return to service"];
  const [step, setStep] = useState(0);
  return <Lab title="A repaired main needs more than a quick restart" prompt="Advance through the required safety gates before returning water to customers."><div className="lab-steps">{steps.map((label, index) => <button key={label} className={index <= step ? "selected" : ""} aria-pressed={index === step} onClick={() => setStep(index)}>{index + 1}. {label}</button>)}</div><svg className="concept-diagram" viewBox="0 0 720 160" role="img" aria-label="Main disinfection sequence"><path className="lab-pipe" d="M85 85H635" />{steps.map((label, index) => <g key={label}><circle className={index <= step ? "process-node complete" : "process-node"} cx={110 + index * 125} cy="85" r="25" /><text className="node-number" x={103 + index * 125} y="91">{index + 1}</text><text className="lab-label" x={78 + index * 125} y="135">{label}</text></g>)}</svg><div className="lab-status"><strong>{steps[step]}</strong><span>{step === 4 ? "Only after approved disinfection, contact time, and test results can a main return to service." : "Each gate protects water quality before the next step."}</span></div></Lab>;
}

function ValveLab() {
  const [type, setType] = useState<"gate" | "ball" | "check">("gate");
  const copy = { gate: ["Gate valve", "A sliding gate is used mainly for on/off isolation."], ball: ["Ball valve", "A quarter-turn ball quickly aligns or blocks its opening."], check: ["Check valve", "A flap opens with forward flow and closes if water tries to reverse."] } as const;
  return <Lab title="Valves change the water route" prompt="Select a valve type to see how its moving part controls flow."><div className="lab-buttons">{(["gate", "ball", "check"] as const).map(item => <button key={item} className={type === item ? "selected" : ""} aria-pressed={type === item} onClick={() => setType(item)}>{item} valve</button>)}</div><svg className="concept-diagram" viewBox="0 0 720 200" role="img" aria-label="Valve cross section showing how each valve operates"><path className="lab-pipe" d="M80 100H640" /><rect className="valve-body" x="285" y="55" width="150" height="90" />{type === "gate" && <path className="valve-part" d="M338 30h44v75h-44zM325 25h70v13h-70z" />}{type === "ball" && <g><circle className="valve-part" cx="360" cy="100" r="48" /><rect className="bore" x="348" y="52" width="24" height="96" rx="8" /></g>}{type === "check" && <path className="valve-part" d="M322 66l80 34l-80 34z" />}<text className="lab-label" x="305" y="180">{copy[type][0]}</text></svg><div className="lab-status"><strong>{copy[type][0]}</strong><span>{copy[type][1]}</span></div></Lab>;
}

function SafetyLab() {
  const [safe, setSafe] = useState(false);
  return <Lab title="Pause before a routine job becomes dangerous" prompt="Compare a rushed excavation with a prepared work zone."><div className="lab-buttons"><button className={!safe ? "selected" : ""} onClick={() => setSafe(false)} aria-pressed={!safe}>Rushed setup</button><button className={safe ? "selected" : ""} onClick={() => setSafe(true)} aria-pressed={safe}>Use protections</button></div><svg className="concept-diagram" viewBox="0 0 720 220" role="img" aria-label="Work zone with trench and traffic protection"><path className="road" d="M40 150H680" /><path className="trench" d="M300 90h130l-20 90H320z" />{safe && <g className="barriers"><path d="M250 145h60m-50-20v40m120-20h60m-50-20v40" /><path d="M95 135l25 15l-25 15M625 135l-25 15l25 15" /></g>}{!safe && <path className="hazard" d="M350 48l34 58h-68z" />}<text className="lab-label" x="310" y="205">excavation</text></svg><div className="lab-status"><strong>{safe ? "Protection is in place" : "Hazard: unprotected work area"}</strong><span>{safe ? "Traffic control and excavation protection are part of the job, not optional extras." : "Stop and use the required safety procedure before beginning work."}</span></div></Lab>;
}

function RepairLab() {
  const steps = ["Expose", "Bedding", "Repair", "Backfill", "Disinfect"];
  const [step, setStep] = useState(0);
  return <Lab title="Support the pipe through every repair stage" prompt="Move through the repair sequence to see why a shortcut can cause a repeat failure."><div className="lab-steps">{steps.map((label, index) => <button key={label} className={index === step ? "selected" : ""} aria-pressed={index === step} onClick={() => setStep(index)}>{label}</button>)}</div><svg className="concept-diagram" viewBox="0 0 720 220" role="img" aria-label="Pipe repair cross section showing bedding and backfill"><path className="ground" d="M55 55H665" /><path className="trench" d="M195 55l45 130h240l45-130" />{step >= 1 && <path className="bedding" d="M240 170h240l-18 20H258z" />}{step >= 2 && <path className="repair-pipe" d="M265 145H455" />}{step >= 3 && <path className="backfill" d="M222 75h276l-18 85H240z" />}{step >= 4 && <path className="repair-water" d="M275 145H445" />}<text className="lab-label" x="305" y="210">{steps[step]}</text></svg><div className="lab-status"><strong>{steps[step]}</strong><span>{step === 1 ? "Even bedding supports the pipe so it does not shift under load." : step === 3 ? "Backfill is placed carefully to protect the repair and the ground above it." : step === 4 ? "A repair also needs approved disinfection and testing before service returns." : "Each stage affects the reliability and safety of the finished repair."}</span></div></Lab>;
}
