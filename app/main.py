import firebase_admin
from firebase_admin import credentials, auth
from flask import Blueprint, request, jsonify, send_from_directory, current_app
import os

# Initialize Firebase Admin SDK
cred = credentials.Certificate(os.getenv('GOOGLE_APPLICATION_CREDENTIALS'))
firebase_admin.initialize_app(cred)

bp = Blueprint('main', __name__)

@bp.route('/secure', methods=['GET'])
def secure():
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return jsonify({'error': 'Unauthorized'}), 401

    id_token = auth_header.split('Bearer ')[1]

    try:
        decoded_token = auth.verify_id_token(id_token)
        user = decoded_token.get('name')
        return jsonify({'message': f'Hello {user}'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 401

@bp.route('/', methods=['GET'])
def index():
    return send_from_directory(current_app.root_path + '/static', 'index.html')
