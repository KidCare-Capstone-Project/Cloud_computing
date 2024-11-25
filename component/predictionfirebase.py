from flask import Blueprint, request, jsonify
import numpy as np
import tensorflow as tf
import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate('key.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

interpreter = tf.lite.Interpreter(model_path="kidcare.tflite")
interpreter.allocate_tensors()


prediction_routes_firabase = Blueprint('prediction_routes_firebase', __name__)

@prediction_routes_firabase.route('/predict/<anak_id>', methods=['POST'])
def predict_by_id(anak_id):
    try:
        anak_ref = db.collection('anak').document(anak_id) 
        anak = anak_ref.get().to_dict()

        if not anak:
            return jsonify({'error': f'Data anak dengan ID {anak_id} tidak ditemukan'}), 404

        if 'JenisKelamin' not in anak or 'Umur' not in anak or 'TinggiBadan' not in anak or 'BeratBadan' not in anak or 'LingkarKepala' not in anak:
            return jsonify({'error': 'Data anak tidak lengkap'}), 400

        jenis_kelamin = 1 if anak['JenisKelamin'] == 'Laki Laki' else 0
        umur = anak['Umur']
        tinggi_badan = anak['TinggiBadan']
        berat_badan = anak['BeratBadan']
        lingkar_kepala = anak['LingkarKepala']

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
            probabilitas_stunting = output_data[0][1]
            probabilitas_tidak_stunting = output_data[0][0]

            anak_ref.update({
                'prediction': predicted_class,
                'probabilitas_stunting': f"{probabilitas_stunting:.4f}",
                'probabilitas_tidak_stunting': f"{probabilitas_tidak_stunting:.4f}",
                'status_gizi': "Stunting" if probabilitas_stunting > probabilitas_tidak_stunting else "Tidak Stunting"
            })

            return jsonify({
                'prediction': predicted_class,
                'probabilitas_stunting': f"{probabilitas_stunting:.4f}",
                'probabilitas_tidak_stunting': f"{probabilitas_tidak_stunting:.4f}",
                'status_gizi': "Stunting" if probabilitas_stunting > probabilitas_tidak_stunting else "Tidak Stunting",
            })

        else:
            prediction_value = output_data[0][0]

            anak_ref.update({
                'prediction': f"{prediction_value:.4f}",
                'status_gizi': "Stunting" if prediction_value > 0.5 else "Tidak Stunting"
            })

            return jsonify({
                'prediction': f"{prediction_value:.4f}",
                'status_gizi': "Stunting" if prediction_value > 0.5 else "Tidak Stunting"
            })

    except Exception as e:
        return jsonify({'error': str(e)}), 500