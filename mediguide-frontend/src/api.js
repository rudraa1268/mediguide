const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

export async function predictDisease(symptomsText) {
  const res = await fetch(`${API_URL}/api/predict/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ symptoms: symptomsText }),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error || 'Prediction failed')
  }

  return data
}
