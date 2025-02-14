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
    "Heart Rate": userData.heartRatio,
  }
  const URL = 'https://stress-predictor-api.onrender.com/predict'
  const data = await fetch(URL, {
    headers: {
      "Content-Type": "application/json",
    },
    method: 'POST',
    body: JSON.stringify(requestDataFormated)
  })
  const jsonData = await data.json()
  return jsonData
}