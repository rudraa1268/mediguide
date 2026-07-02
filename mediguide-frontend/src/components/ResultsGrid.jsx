function ListBox({ title, items }) {
  return (
    <div className="result-box">
      <h3>{title}</h3>
      {items && items.length > 0 ? (
        <ul>
          {items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      ) : (
        <p style={{ color: 'var(--text-dim)' }}>No data available</p>
      )}
    </div>
  )
}

export default function ResultsGrid({ result }) {
  if (!result) return null

  return (
    <>
      <div className="disease-banner">{result.disease}</div>

      <div className="result-box" style={{ marginTop: 16 }}>
        <h3>Description</h3>
        <p>{result.description || 'No description available'}</p>
      </div>

      <div className="results-grid">
        <ListBox title="Precautions" items={result.precautions} />
        <ListBox title="Medications" items={result.medications} />
        <ListBox title="What to Eat" items={result.diet} />
        <ListBox title="Workout" items={result.workout} />
      </div>
    </>
  )
}
