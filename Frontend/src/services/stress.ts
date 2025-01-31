import { StressFormData } from "../types"

export async function getStressData(userData: StressFormData) {
  const requestDataFormated = {
    Age: userData.age,
    Gender_encoded: userData.gender,
    Height: userData.height,
    Weight: userData.weight,
    Occupation_encoded: userData.job,
    "Sleep Duration": userData.sleepHours,
    "Daily Steps": userData.stepsByDay,
    "Heart Ratio": userData.heartRatio,
  }
  const data = await fetch('http://127.0.0.1:3000/predict', {
    headers: {
      "Content-Type": "application/json",
    },
    method: 'POST',
    body: JSON.stringify(requestDataFormated)
  })
  const jsonData = await data.json()
  return jsonData
}