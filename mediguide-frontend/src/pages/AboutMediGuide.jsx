export default function AboutMediGuide() {
  return (
    <div className="about-content">
      <h1>About MediGuide</h1>
      <p className="subtitle">How the prediction works</p>
      <p>
        MediGuide takes a list of symptoms and predicts the most likely disease using a trained
        <strong> Support Vector Classifier (SVC)</strong>. Each symptom is mapped to a fixed position in a
        132-dimension binary vector - 1 if present, 0 if not - which the model uses to classify across
        41 possible conditions.
      </p>
      <p>
        Once a disease is predicted, the app looks up a description, precautions, recommended
        medications, diet, and workout guidance from a curated dataset and returns everything as one
        structured result.
      </p>
      <p>
        <strong>Disclaimer:</strong> This tool is for educational purposes only and is not a substitute
        for professional medical advice.
      </p>
    </div>
  )
}
