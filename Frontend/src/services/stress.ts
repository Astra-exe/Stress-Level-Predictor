export async function getStressData() {
  const data = fetch('http://localhost:3000/predict')

  return data
}