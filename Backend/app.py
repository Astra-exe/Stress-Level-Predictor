from flask import Flask, request, jsonify
from flask_limiter import Limiter
from flask_cors import CORS
from flask_limiter.util import get_remote_address
import joblib
import pandas as pd
import os
from dotenv import load_dotenv
import google.generativeai as genai

#Load the environment variables
load_dotenv()
api_key = os.getenv('API_KEY_GOOGLE')

#configure the generative AI
genai.configure(api_key=api_key)
g_model = genai.GenerativeModel('gemini-2.0-flash')

def calculate_bmi(weight, height):
    weight = int(weight)
    height = float(height)
    #converto int and float
    bmi = weight / (height ** 2)
    if bmi < 25:
        return 0 #normal
    elif 25 <= bmi < 30:
        return 1 #overweight
    else:
        return 2 #obese
    
#generate recommendations based on the stress level, BMI category, and sleep duration
def recommendations(stress_level, bmi, sleep_duration):
    # Mapear nivel de estrés a términos cualitativos
    stress_labels = {
        3: "bajo",
        4: "bajo",
        5: "moderado",
        6: "moderado",
        7: "elevado",
        8: "elevado"
    }
    stress_label = stress_labels[stress_level]
    #dos decimales
    bmi_n = round(float(bmi), 2)

    prompt = f"""
    <h1>Encabezado (máximo 200 caracteres):</h1>
    <p>Después analizar tus datos, parece que tu nivel de estrés está clasificado como <strong>{stress_label.upper()}</strong>.<br>
    [Aquí un análisis original, puedes tomar como ejemplo: Combinado con un indice de masa corporal: {bmi_n:.2f} lo cual indica que estás en [aquí categorízalo] y solo {sleep_duration}h de sueño, es clave actuar hoy 🌱]</p>

    <h2>Recomendaciones (ordenadas por prioridad):</h2>
    <ol class="prioridades">
        <li>
            <strong>Manejo del estrés</strong> (¡Enfóquemonos aquí!):
            <ul class="sub-recomendacion">
                <li>2 técnicas comprobadas para nivel {stress_label}</li>
                <li>Ejemplo concreto: método paso a paso + frecuencia</li>
            </ul>
        </li>
        
        <li>
            <strong>Apoyo físico</strong> (Para un BMI: {bmi_n} [categorízalo]):
            <ul class="sub-recomendacion">
                <li>1 alimento antiestrés con receta rápida</li>
                <li>1 micro-actividad física (aprox 10 min/día)</li>
            </ul>
        </li>
        
        <li>
            <strong>Recuperación nocturna</strong> ({sleep_duration}h):
            <ul class="sub-recomendacion">
                <li>1 ajuste en tu ambiente de sueño</li>
                <li>1 hábito pre-cama para mejorar calidad</li>
            </ul>
        </li>
    </ol>

    <p class="cierre-motivador"><strong>Cierre motivador</strong><br>
    [Toma como ejemplo: Pequeños cambios generan grandes resultados. ¡Hoy es tu día! 💪]</p>

    Reglas:
    - Lenguaje cercano y positivo (tuteo).
    - Énfasis en estrés como factor principal.
    - Usar negritas solo en títulos y los titulos los puedes iterar y acomodar el copy que mejor se ajuste.
    - Evita usar los titulos de ejemplo, sé original los ejemplos solo están para guiar.
    - Incluir 1 emoji por sección.
    - Evitar términos numéricos del estrés (solo "elevado", etc).
    - Trata de ser variado al dar las recomendaciones.
    - Evita tus mensajes de respuesta (ejemplo: Aqui tienes, claro) limitate a responder en el formato dado
    """
    response = g_model.generate_content(prompt)
    return response.text
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
@app.route('/', methods=['GET'])
def index():
    return "Welcome to the Stress Prediction API"
@app.route('/predict', methods=['POST'])
def predict():
    try:
        #get data entry from the user
        input_data = request.get_json(force=True)

        #Convert the data into a pandas DataFrame
        input_data = pd.DataFrame([input_data])

        # Calculate the BMI category
        input_data['BMI_category_encoded'] = input_data.apply(lambda x: calculate_bmi(x['Weight'], x['Height']), axis=1)
        weight_ind = float(input_data['Weight'].iloc[0])
        height_ind = float(input_data['Height'].iloc[0])
        bmi_ind = weight_ind / height_ind ** 2

        #drop the weight and height columns
        input_data = input_data.drop(['Weight', 'Height'], axis=1)

        #make sure that the data is in the correct order
        input_data = input_data[['Age', 'Sleep Duration', 'Heart Rate', 'Daily Steps', 'Occupation_encoded', 'BMI_category_encoded','Gender_encoded']]
        input_data['Sleep Duration'] = input_data['Sleep Duration'].astype(float)
        #Make a prediction
        prediction = model.predict(input_data)
        stress_level = int(prediction[0])
        make_recommendations = recommendations(
            stress_level, 
            bmi_ind, 
            int(input_data['Sleep Duration'].iloc[0])
        )
        make_recommendations = make_recommendations.replace('\n','')
        make_recommendations = make_recommendations.replace('```','')
        make_recommendations = make_recommendations.replace('html','')
        #Return the prediction in JSON format
        return jsonify({'stress_level': int(prediction[0]),
                        'recommendations': make_recommendations
                        })
    
    except Exception as e:
        print(str(e))
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(port=3000)
