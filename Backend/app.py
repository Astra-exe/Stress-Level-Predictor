from flask import Flask, request, jsonify
from flask_limiter import Limiter
from flask_cors import CORS
from flask_limiter.util import get_remote_address
#from openai import OpenAI
import joblib
import pandas as pd
import random

def calculate_bmi(weight, height):
    bmi = weight / (height ** 2)
    if bmi < 25:
        return 0 #normal
    elif 25 <= bmi < 30:
        return 1 #overweight
    else:
        return 2 #obese
    
#generate recommendations based on the stress level, BMI category, and sleep duration
def recommendations(stress_level, bmi_category, sleep_duration):
    recommendations = {
        "low": [
            "Parece que estás manejando bien el estrés. ¡Sigue así!",
            "Recuerda tomarte momentos para disfrutar actividades que te hagan feliz.",
            "Incorpora una caminata diaria para mantener el buen ánimo y la salud."
        ],
        "moderate": [
            "Empieza a ponerle atención. Prueba con ejercicios de respiración profunda.",
            "Reduce el tiempo frente a pantallas antes de dormir para mejorar tu descanso.",
            "Intenta una actividad relajante como yoga o meditación para despejarte."
        ],
        "high": [
            "Esto no debería pasar. Habla con un amigo o ser querido para desahogarte.",
            "Prueba técnicas como mindfulness para reducir la tensión diaria.",
            "Evita sobrecargarte de tareas y prioriza lo que realmente importa."
        ]
    }

    #sleep recommendations
    if sleep_duration < 6:
        sleep_tip = "Es importante mejorar la calidad del sueño. Intenta dormir al menos 7 horas."
    elif sleep_duration > 8:
        sleep_tip = "Dormir demasiado puede causar cansancio. Intenta mantener un horario constante."
    else:
        sleep_tip = "Tu sueño parece adecuado. Sigue manteniendo un buen ritmo."
    
    #bmi recommendations
    if bmi_category == 0:
        bmi_tip = "Tu peso está en un rango saludable. ¡Sigue cuidándote!"
    elif bmi_category == 1:
        bmi_tip = "Intenta mantener una dieta balanceada y hacer ejercicio regularmente."
    else:
        bmi_tip = "Es importante cuidar tu salud. Consulta a un profesional para mejorar tu alimentación."
    
    #make a random choice for a stress recommendation
    if stress_level <= 4:
        stress_tips = '¡Estrés bajo!' + random.choice(recommendations["low"])
    elif stress_level <= 6:
        stress_tips = '¡Estrés moderado!' + random.choice(recommendations["moderate"])
    else:
        stress_tips = '¡Cuidado estrés elevado!' + random.choice(recommendations["high"])
    
    #mix all the recommendations
    return {
        "stress_tip": stress_tips,
        "bmi_tip": bmi_tip,
        "sleep_tip": sleep_tip
    }

#Load the ML model
model = joblib.load('stress_predict.pkl')

#Create a Flask app
app = Flask(__name__)

#Allow Cross-Origin requests
CORS(app)

#Rate limit the API
limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits= ["20 per minute"]
)


#Create an API endpoint
@app.route('/predict', methods=['POST'])
def predict():
    try:
        #get data entry from the user
        input_data = request.get_json(force=True)

        #Convert the data into a pandas DataFrame
        input_data = pd.DataFrame([input_data])

        # Calculate the BMI category
        input_data['BMI_category_encoded'] = input_data.apply(lambda x: calculate_bmi(x['Weight'], x['Height']), axis=1)


        bmi = input_data['Weight'] / (input_data['Height'] ** 2)

        #drop the weight and height columns
        input_data = input_data.drop(['Weight', 'Height'], axis=1)

        #make sure that the data is in the correct order
        input_data = input_data[['Age', 'Sleep Duration', 'Heart Rate', 'Daily Steps', 'Occupation_encoded', 'BMI_category_encoded','Gender_encoded']]

        #Make a prediction
        prediction = model.predict(input_data)
        stress_level = int(prediction[0])
        make_recommendations = recommendations(
            stress_level, 
            int(input_data['BMI_category_encoded']), 
            int(input_data['Sleep Duration'])
        )
        #recomendations = recommendations(int(prediction), bmi, input_data['Sleep Duration'])

        #Return the prediction in JSON format
        return jsonify({'stress_level': int(prediction[0]),
                        'stress_tip': make_recommendations['stress_tip'],
                        'bmi_tip': make_recommendations['bmi_tip'],
                        'sleep_tip': make_recommendations['sleep_tip']
                        })
    
    except Exception as e:
        print(str(e))
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(port=3000)
