const categories = [
  ["Disinfection", "15", "20", "60–80"],
  ["Design & hydraulics", "20", "20", "70–90"],
  ["Operations & maintenance", "20", "20", "70–90"],
  ["Regulations, management & safety", "15", "10", "55–75"],
  ["Water mains & piping", "20", "20", "60–80"],
  ["Water quality & sources", "10", "10", "40–60"]
];

export function ExamInfo() {
  return <section className="page">
    <p className="eyebrow">EXAM BLUEPRINT</p>
    <h2>Know what the exam expects</h2>
    <p className="intro">The official D1 and D2 exams contain 100 questions. This page separates the State Board’s question allocation from the larger original practice bank we are building for reliable preparation.</p>
    <section className="exam-breakdown">
      <h3>Official exam categories</h3>
      <table><thead><tr><th>Area</th><th>D1 exam</th><th>D2 exam</th><th>App target bank</th></tr></thead><tbody>{categories.map(row => <tr key={row[0]}>{row.map(cell => <td key={cell}>{cell}</td>)}</tr>)}</tbody></table>
      <p className="schedule-note">The app target is 350–500 original questions total, so students can practice several versions of an idea rather than memorize one answer.</p>
    </section>
    <section className="prep">
      <h3>Grading and readiness</h3>
      <p>The State Board provides a pass/fail result after its computer-based exam and does not publish a fixed passing-question count. In this app, aim for at least 80% across each category and 90% on calculations before relying on a diagnostic result.</p>
      <ol><li><b>Learn:</b> complete every objective’s plain-language lesson and worked example.</li><li><b>Practice:</b> answer fresh questions in each category, not just repeated favorites.</li><li><b>Review:</b> revisit a missed objective until you can explain the reason in your own words.</li><li><b>Diagnose:</b> take mixed-category practice only after completing the category lessons.</li></ol>
    </section>
  </section>;
}
