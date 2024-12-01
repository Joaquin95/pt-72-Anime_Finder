"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, FavoriteAnime
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
import hashlib

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def create_user():
    body = request.get_json()
    user_email = body['email']
    user_password =  hashlib.sha256(body['password'].encode("utf-8")).hexdigest()
    user = User(email = user_email, password = user_password)
    db.session.add(user)
    db.session.commit()

    return jsonify("User successfully created")

@api.route('/login', methods=['POST'])
def login():
    body = request.get_json()
    user_email = body['email']
    user_password = hashlib.sha256(body['password'].encode("utf-8")).hexdigest()
    user = User.query.filter_by(email = user_email, password = user_password).first()
    if user and user.password == user_password:
        access_token = create_access_token(identity = user.email)
        return jsonify(access_token = access_token, user = user.serialize())
    else:
        return jsonify("user does not exist")

@api.route('/user', methods=['GET'])
@jwt_required()
def get_user():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    return jsonify(user.serialize())

@api.route('/favoriteAnime', methods=['POST'])
@jwt_required()
def create_favanime():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    request_fav_anime = request.get_json()

    new_fav_anime = FavoriteAnime(user_id=user.id, anime_id=request_fav_anime["anime"])
    db.session.add(new_fav_anime)
    db.session.commit()

    return jsonify(request_fav_anime), 200 

@api.route('/favoriteanime', methods=['GET'])
@jwt_required()
def get_favanime():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email = user_email)
    fav_anime = FavoriteAnime.query.filter_by(user_id=user.id).all()
    all_favanime = list(map(lambda x: x.serialize(), fav_anime))
    return jsonify(all_favanime), 200 


@api.route('/favorite/anime/<int:anime_id>', methods=['DELETE'])
@jwt_required()
def delete_favanime(anime_id):
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    favanime = FavoriteAnime.query.filter_by(anime_id=anime_id, user_id=user.id).first()
    if not favanime:
        return jsonify({"error": "No favorite records found for this anime"}), 404
    
    db.session.delete(favanime)
    db.session.commit()
    
    return jsonify({"message": "Anime removed from favorites"}), 200
