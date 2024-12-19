"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""

from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, FavoriteAnime
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import (
    create_access_token,
    get_jwt_identity,
    jwt_required,
    JWTManager,
)
import hashlib

api = Blueprint("api", __name__)

# Allow CORS requests to this API
CORS(api, resources={r"/api/*": {"origins": "*"}})


@api.route("/hello", methods=["POST", "GET"])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route("/signup", methods=["POST"])
def create_user():
    body = request.get_json()
    user_email = body["email"]
    user_password = hashlib.sha256(body["password"].encode("utf-8")).hexdigest()
    user = User(email=user_email, password=user_password)
    db.session.add(user)
    db.session.commit()

    return jsonify("User successfully created")


@api.route("/login", methods=["POST"])
def login():
    body = request.get_json()
    user_email = body["email"]
    user_password = hashlib.sha256(body["password"].encode("utf-8")).hexdigest()
    user = User.query.filter_by(email=user_email, password=user_password).first()
    if user and user.password == user_password:
        access_token = create_access_token(identity=user.email)
        return jsonify(access_token=access_token, user=user.serialize())
    else:
        return jsonify("user does not exist")


@api.route("/user", methods=["GET"])
@jwt_required()
def get_user():
    email = get_jwt_identity()
    print(email, "email!!!!!")
    user = User.query.filter_by(email=email).first()
    return jsonify(user.serialize())


# @api.route('/favoriteAnime', methods=['POST'])
# @jwt_required()
# def create_favanime():
#     user_email = get_jwt_identity()
#     user = User.query.filter_by(email=user_email).first()
#     request_fav_anime = request.get_json()

#     new_fav_anime = FavoriteAnime(user_id=user.id, anime_id=request_fav_anime["anime"])
#     db.session.add(new_fav_anime)
#     db.session.commit()

#     return jsonify(request_fav_anime), 200


@api.route("/favoriteAnime", methods=["POST"])
@jwt_required()
def create_favanime():
    try:
        # Debug Authorization header
        auth_header = request.headers.get("Authorization", "")
        print("Authorization header:", auth_header)

        # Decode token
        user_email = get_jwt_identity()
        print("Decoded user identity (email):", user_email)

        # Fetch user from database
        user = User.query.filter_by(email=user_email).first()
        if not user:
            return jsonify({"error": "User not found"}), 404

        # Debug request payload
        request_fav_anime = request.get_json()
        print("Request body:", request_fav_anime)

        # Validate 'anime' key
        anime_id = request_fav_anime.get("anime")
        if not anime_id:
            return jsonify({"error": "Missing 'anime' key in request body"}), 400

        # Add to favorites
        new_fav_anime = FavoriteAnime(user_id=user.id, anime_id=anime_id)
        db.session.add(new_fav_anime)
        db.session.commit()

        return (
            jsonify({"message": "Anime added to favorites", "anime_id": anime_id}),
            201,
        )

    except Exception as e:
        print("Error adding favorite:", str(e))
        return jsonify({"error": "Internal Server Error", "details": str(e)}), 500


# @api.route('/favoriteAnime', methods=['GET'])
# @jwt_required()
# def get_favanime():
#     user_email = get_jwt_identity()
#     user = User.query.filter_by(email = user_email)
#     fav_anime = FavoriteAnime.query.filter_by(user_id=user.id).all()
#     all_favanime = list(map(lambda x: x.serialize(), fav_anime))
#     return jsonify(all_favanime), 200


import requests  # Needed for external API calls


@api.route("/favoriteAnime", methods=["GET"])
@jwt_required()
def get_favanime():
    try:
        # Decode JWT and fetch user
        user_email = get_jwt_identity()
        user = User.query.filter_by(email=user_email).first()

        if not user:
            return jsonify({"error": "User not found"}), 404

        # Fetch favorite anime IDs for this user
        fav_anime = FavoriteAnime.query.filter_by(user_id=user.id).all()

        # Retrieve anime details from Jikan API
        detailed_favorites = []
        for fav in fav_anime:
            jikan_response = requests.get(
                f"https://api.jikan.moe/v4/anime/{fav.anime_id}"
            )
            if jikan_response.status_code == 200:
                anime_data = jikan_response.json()["data"]
                detailed_favorites.append(
                    {
                        "anime_id": fav.anime_id,
                        "title": anime_data.get("title"),
                        "image": anime_data["images"]["jpg"]["image_url"],
                    }
                )

        return jsonify(detailed_favorites), 200

    except Exception as e:
        print("Error fetching favorites:", str(e))
        return jsonify({"error": "Internal Server Error", "details": str(e)}), 500


@api.route("/favorite/anime/<int:anime_id>", methods=["DELETE"])
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