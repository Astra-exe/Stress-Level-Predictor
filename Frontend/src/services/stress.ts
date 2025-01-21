export async function getStressData({userData}) {
  const data = await fetch('http://127.0.0.1:3000/predict', {
    headers: {
      "Content-Type": "application/json",
    },
    method: 'POST',
    body: JSON.stringify(userData)
  })
  const jsonData = await data.json()
  return jsonData
}