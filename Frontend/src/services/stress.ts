export async function getStressData({userData}) {
  const data = fetch('http://localhost:3000/predict', {
    headers: {
      "Content-Type": "application/json",
    },
    method: 'GET',
    body: JSON.stringify(userData)
  })
  console.log(data);
  return data
}