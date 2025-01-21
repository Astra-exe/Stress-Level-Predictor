from flask import Flask, request, jsonify
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import joblib
import pandas as pd

#Load the ML model
model = joblib.load('stress_predict.pkl')

#Create a Flask app
app = Flask(__name__)

#Rate limit the API
limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits= ["20 per minute"]
)


#Create an API endpoint
@app.route('/predict', methods=['GET'])
@limiter.limit("10 per minute")
def predict():
    try:
        #get data entry from the user
        input_data = request.get_json(force=True)

        #Convert the data into a pandas DataFrame
        input_data = pd.DataFrame([input_data])

        #Make a prediction
        prediction = model.predict(input_data)

        #Return the prediction in JSON format
        return jsonify({'stress_level': int(prediction[0])})
        #HTML format
        # return '<h1>The stress level is: ' + str(int(prediction[0])) + '</h1>'
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(port=3000, debug=True)
