from flask import Blueprint, request, jsonify
import numpy as np
import tensorflow as tf

interpreter = tf.lite.Interpreter(model_path="kidcare.tflite")
interpreter.allocate_tensors()


prediction_routes = Blueprint('prediction_routes', __name__)

@prediction_routes.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        if 'JenisKelamin' not in data or 'Umur' not in data or 'TinggiBadan' not in data or 'BeratBadan' not in data or 'LingkarKepala' not in data:
            return jsonify({'error': 'Semua field (JenisKelamin, Umur, TinggiBadan, BeratBadan, LingkarKepala) harus diisi'}), 400

        if data['JenisKelamin'] not in ['Laki Laki', 'Perempuan']:
            return jsonify({'error': 'JenisKelamin harus "Laki Laki" atau "Perempuan"'}), 400

        jenis_kelamin = 1 if data['JenisKelamin'] == 'Laki Laki' else 0
        umur = data['Umur']
        tinggi_badan = data['TinggiBadan']
        berat_badan = data['BeratBadan']
        lingkar_kepala = data['LingkarKepala']

        input_data = np.array([jenis_kelamin, umur, tinggi_badan, berat_badan, lingkar_kepala], dtype=np.float32)
        input_data = np.expand_dims(input_data, axis=0) 

        input_details = interpreter.get_input_details()
        output_details = interpreter.get_output_details()

        interpreter.set_tensor(input_details[0]['index'], input_data)

        interpreter.invoke()

        output_data = interpreter.get_tensor(output_details[0]['index'])

        classes = ["Tidak Stunting", "Stunting"]
        if len(output_data[0]) == 2:
            predicted_class = classes[np.argmax(output_data[0])]
            probabilitas_stunting = output_data[0][1] * 100
            probabilitas_tidak_stunting = output_data[0][0] * 100

            status_gizi = "Stunting" if probabilitas_stunting > probabilitas_tidak_stunting else "Tidak Stunting"

            return jsonify({
                'nama_anak': data.get('Nama', 'Tidak diketahui'),
                'usia': data['Umur'],
                'probabilitas_stunting': f"{probabilitas_stunting:.2f}%",
                'probabilitas_tidak_stunting': f"{probabilitas_tidak_stunting:.2f}%",
                'status_gizi': status_gizi,
                'prediction': predicted_class
            })
        else:
            prediction_value = output_data[0][0]
            probabilitas_stunting = prediction_value * 100 
            probabilitas_tidak_stunting = (1 - prediction_value) * 100 

            status_gizi = "Stunting" if prediction_value > 0.5 else "Tidak Stunting"

            return jsonify({
                'nama_anak' : data.get('Nama', 'Tidak diketahui'),
                'usia': data['Umur'],
                'probabilitas_stunting': f"{probabilitas_stunting:.2f}%", 
                'probabilitas_tidak_stunting': f"{probabilitas_tidak_stunting:.2f}%", 
                'prediction': f"{prediction_value:.4f}",
                'status_gizi': status_gizi
            })

    except Exception as e:
        return jsonify({'error': str(e)}), 500
