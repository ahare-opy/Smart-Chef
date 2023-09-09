from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app)

@app.route('/predict/', methods=['POST'])
def predict():
    try:
        # Load the model
        model = joblib.load('model.pkl')

        # Get the request data
        data = request.get_json()

        # Extract the input features
        servingSize = data.get('servingSize')
        dairyProduct = data.get('dairyProduct')
        salt = data.get('salt')
        potato = data.get('potato')
        vegetables = data.get('vegetables')
        sugar = data.get('sugar')
        chicken = data.get('chicken')
        oil = data.get('oil')
        beef = data.get('beef')
        fruits = data.get('fruits')
        egg = data.get('egg')
        mutton = data.get('mutton')
        rice = data.get('rice')
        carbs = data.get('carbs')
        fish = data.get('fish')
        driedFish = data.get('driedFish')

        # Perform prediction
        prediction = model.predict([[servingSize, dairyProduct, salt, potato, vegetables, sugar, chicken, oil, beef, fruits, egg, mutton, rice, carbs, fish, driedFish]])

        # Prepare the response
        result = {'result': int(prediction[0])}

        return jsonify(result)
    
    except Exception as e:
        error = {'error': str(e)}
        return jsonify(error), 500

if __name__ == '__main__':
    app.run()
