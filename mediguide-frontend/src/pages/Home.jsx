import { predictDisease } from '../api'
import ResultsGrid from '../components/ResultsGrid'
import { useState, useEffect } from 'react'

export default function Home() {
  const [symptoms, setSymptoms] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [allSymptoms, setAllSymptoms] = useState([])

  useEffect(() => {
  fetch('http://127.0.0.1:8000/api/symptoms/')
    .then(res => res.json())
    .then(data => setAllSymptoms(data.symptoms))
    .catch(err => console.error('Failed to load symptoms:', err))
}, [])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!symptoms.trim()) return

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const data = await predictDisease(symptoms)
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <h1>Describe your symptoms</h1>
      <p className="subtitle">Get a predicted condition with precautions, medication, diet, and workout guidance.</p>

      <form className="input-card" onSubmit={handleSubmit}>
        <label htmlFor="symptoms">Symptoms (comma-separated)</label>
        <textarea
          id="symptoms"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="itching, skin_rash, high_fever"
        />
        <p className="hint">Use underscores for multi-word symptoms, separated by commas - e.g. skin_rash, joint_pain, headache</p>
        <button className="predict-btn" type="submit" disabled={loading || !symptoms.trim()}>
          {loading ? 'Analyzing...' : 'Predict'}
        </button>

        {error && <div className="error-box">{error}</div>}
      </form>

      <ResultsGrid result={result} />
    </>
  )
}
