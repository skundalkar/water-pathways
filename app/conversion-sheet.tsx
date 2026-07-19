const officialSheet = "https://www.waterboards.ca.gov/drinking_water/certlic/occupations/documents/opcert/new-conversionsheet.pdf";
const examples = [
  { title: "Pipe capacity", formula: "Cylinder gallons = .785 × D² × length × 7.48 (D in feet)", example: "A 12-inch pipe is 100 feet long: 12 inches = 1 foot; .785 × 1² × 100 × 7.48 = about 587 gallons.", why: "Use it before disinfecting or flushing a main so you know how much water is inside." },
  { title: "Flow rate", formula: "gpm = gallons ÷ minutes", example: "500 gallons collected in 5 minutes: 500 ÷ 5 = 100 gpm.", why: "Flow tells you how much water moves past a point each minute." },
  { title: "Pressure and head", formula: "feet of head = psi × 2.31", example: "40 psi × 2.31 = 92.4 feet of head.", why: "This links a pressure-gauge reading with the height of water creating that push." },
  { title: "Chlorine dosage", formula: "Dosage = demand + residual", example: "If demand is 1.2 mg/L and desired residual is 0.8 mg/L, dosage is 2.0 mg/L.", why: "The dose must satisfy what the water uses up and leave the needed protective residual." },
  { title: "Chemical pounds per day", formula: "lb/day = MGD × mg/L × 8.34", example: "1.5 MGD × 2 mg/L × 8.34 = 25.02 lb/day.", why: "This estimates daily chemical need; approved operating procedures determine the actual feed setup." },
  { title: "Velocity", formula: "Velocity = 0.4085 × gpm ÷ D²", example: "100 gpm in an 8-inch pipe: 0.4085 × 100 ÷ 8² = about 0.64 ft/sec.", why: "Velocity describes how fast water moves, which affects flushing, pressure loss, and system operation." },
  { title: "Dilution and blending", formula: "C1 × V1 = C2 × V2", example: "To make 10 gallons of 1% solution from 10% stock: 10% × V1 = 1% × 10 gal, so V1 = 1 gallon of stock.", why: "This is the basic relationship for mixing a stronger solution into a weaker one." },
  { title: "Force on a valve", formula: "pounds force = psi × area (in²)", example: "40 psi on a 12-inch circular face: area = .785 × 12² = 113 in²; force ≈ 4,520 lb.", why: "It explains why pressure can make a large valve difficult and hazardous to handle." }
];

export function FormulaReference() {
  return <section className="math-reference">
    <details className="math-disclosure">
      <summary><span><b>2</b> Learn the formula</span><small>Plain-language examples for the formulas students use most</small></summary>
      <div className="formula-examples"><p className="label">READ THE FORMULA LIKE A FIELD TOOL</p><h3>Worked examples, step by step</h3><p>Open this when you want the “why” behind a calculator answer. Write the units at every step.</p><div>{examples.map((item) => <article key={item.title}><h4>{item.title}</h4><code>{item.formula}</code><p><b>Example:</b> {item.example}</p><small>{item.why}</small></article>)}</div></div>
    </details>
    <details className="math-disclosure official-reference">
      <summary><span><b>3</b> Check the official exam sheet</span><small>The actual State Water Board conversion reference</small></summary>
      <section className="official-sheet">
        <div><strong>State Water Resources Control Board · revised June 2, 2025</strong><a href={officialSheet} target="_blank" rel="noreferrer">Open the official sheet in a new tab ↗</a></div>
        <iframe title="California Drinking Water Operator Exam Conversion Sheet" src={`${officialSheet}#view=FitH`} loading="lazy">Your browser cannot display the PDF. <a href={officialSheet} target="_blank" rel="noreferrer">Open the official conversion sheet.</a></iframe>
      </section>
      <p className="schedule-note">The official sheet includes formulas used across drinking-water exams, including subjects beyond D1/D2. Water Pathways highlights the D1/D2-relevant formulas above.</p>
    </details>
  </section>;
}
