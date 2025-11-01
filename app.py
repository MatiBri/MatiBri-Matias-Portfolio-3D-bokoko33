# app.py
from flask import Flask, request, jsonify
from flask_mail import Mail, Message
from dotenv import load_dotenv
import os, traceback

load_dotenv()

app = Flask(__name__)

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = app.config['MAIL_USERNAME']

mail = Mail(app)

@app.route('/ping', methods=['GET'])
def ping():
    return jsonify({'status': 'ok'}), 200

@app.route('/send_email', methods=['POST'])
def send_email():
    try:
        nombre = request.form.get('nombre', '')
        correo = request.form.get('correo', '')
        mensaje = request.form.get('mensaje', '')

        print("Datos recibidos:", nombre, correo, mensaje)  # debugging

        msg = Message('Nuevo mensaje de contacto',
                      sender=app.config['MAIL_USERNAME'],
                      recipients=[app.config['MAIL_USERNAME']])
        msg.body = f"Nombre: {nombre}\nCorreo: {correo}\nMensaje: {mensaje}"

        mail.send(msg)
        return jsonify({'status': 'success', 'message': 'Mensaje enviado correctamente'}), 200

    except Exception:
        traceback.print_exc()
        return jsonify({'status': 'error', 'message': 'Ocurrió un error al enviar el mensaje'}), 500

if __name__ == "__main__":
    app.run(debug=True, host='127.0.0.1', port=5000)
