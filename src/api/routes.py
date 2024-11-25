"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
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
def create_favpeople():
    request_fav_people = request.get_json()

    new_fav_people = FavoritePeople(user_id=request_fav_people["user"], people_id=request_fav_people["people"])
    db.session.add(new_fav_people)
    db.session.commit()

    return jsonify(request_fav_people), 200 


@app.route('/favoritePeople', methods=['GET'])
def get_favpeople():

    fav_people = FavoritePeople.query.all()
    all_favpeople = list(map(lambda x: x.serialize(), fav_people))
    return jsonify(all_favpeople), 200 


@app.route('/<int:user_id>/favoritePeople', methods=['GET'])
def get_user_favpeople(user_id):

    userfav_people = FavoritePeople.query.filter_by(user_id=user_id).all()

    if not userfav_people:
        return {"message": "Este user no ha marcado ningún personaje favorito"}, 404
   
    serialized_favorite_people = [{
        "ID": favorite.people_id,
        "Character's name": People.query.get(favorite.people_id).name
    } for favorite in userfav_people]

    return {'Personajes favoritos del usuario': serialized_favorite_people}, 200

@app.route('/user/<int:user_id>/people/<int:people_id>', methods=['POST'])
def post_user_favpeople(user_id, people_id):

    user = User.query.get(user_id)
    if not user:
        return {"error": "El usuario no existe"}, 404
    
    people = People.query.get(people_id)
    if not people:
        return {"error": "El personaje no existe"}, 404
    
    new_fav_people = FavoritePeople(user_id=user_id, people_id=people_id)
    db.session.add(new_fav_people)
    db.session.commit()
    
    return {"message": "Personaje agregado como favorito existosamente"}

@app.route('/favorite/people/<int:people_id>', methods=['DELETE'])
def delete_favpeople(people_id):

    favpeople = FavoritePeople.query.filter_by(people_id=people_id).all()
    if not favpeople:
        return {"Error": "No hay registros de favoritos de este personaje"}
    
    for person in favpeople:
        db.session.delete(person)
    db.session.commit()

    return {"message": "Registros de este personaje eliminados de favoritos"}, 200