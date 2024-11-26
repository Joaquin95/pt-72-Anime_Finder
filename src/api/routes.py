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

@app.route('/favoritePeople', methods=['POST'])
def create_favanime():
    request_fav_anime = request.get_json()

    new_fav_anime = FavoriteAnime(user_id=request_fav_anime["user"], people_id=request_fav_anime["people"])
    db.session.add(new_fav_anime)
    db.session.commit()

    return jsonify(request_fav_anime), 200 

@app.route('/favoriteanime', methods=['GET'])
def get_favanime():

    fav_anime = FavoriteAnime.query.all()
    all_favanime = list(map(lambda x: x.serialize(), fav_anime))
    return jsonify(all_favanime), 200 

@app.route('/<int:user_id>/favoriteAnime', methods=['GET'])
def get_user_favanime(user_id):

    userfav_anime = FavoriteAnime.query.filter_by(user_id=user_id).all()

    if not userfav_anime:
        return {"message": "Favonite is not recognized"}, 404
   
    serialized_favorite_anime = [{
        "ID": favorite.anime_id,
        "Anime's name": anime.query.get(favorite.anime_id).name
    } for favorite in userfav_anime]

    return {'Personal favorites': serialized_favorite_anime}, 200

@app.route('/user/<int:user_id>/anime/<int:anime_id>', methods=['POST'])
def post_user_favanime(user_id, anime_id):

    user = User.query.get(user_id)
    if not user:
        return {"error": "the favorite does not exist"}, 404
    
    anime = anime.query.get(anime_id)
    if not anime:
        return {"error": "the anime does not exist"}, 404
    
    new_fav_anime = FavoriteAnime(user_id=user_id, anime_id=anime_id)
    db.session.add(new_fav_anime)
    db.session.commit()
    
    return {"message": "the users favorites do not exist"}

@app.route('/favorite/anime/<int:anime_id>', methods=['DELETE'])
def delete_favanime(anime_id):

    favanime = FavoriteAnime.query.filter_by(anime_id=anime_id).all()
    if not favanime:
        return {"Error": "There are no favorite records for this character"}
    
    for person in favanime:
        db.session.delete(anime)
    db.session.commit()

    return {"message": "Records of this character removed from favorites"}, 200