from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db
from app.models.favorite import Favorite
from app.models.sticker import Sticker
from app.models.user import User

favorite_routes = Blueprint('favorites', __name__)

@favorite_routes.route('/my-favorite-stickers')
def get_favorite_stickers():
    favorite_stickers = Favorite.query.filter_by(favorite = True).all()
    favorite_data = []
    for favorite_sticker in favorite_stickers:
        data = favorite_sticker.to_dict()
        stickers = Sticker.query.filter_by(id = favorite_sticker.stickerId).all()
        data['stickers'] = [sticker.to_dict() for sticker in stickers]
        favorite_data.append(data)
    return favorite_data

@favorite_routes.route('<int:id>', methods=['POST'])
def add_to_favorite(id):
    favorite_sticker = Favorite.query.filter_by(userId = current_user.id, stickerId = id).first()

    if not favorite_sticker:
        add_favorite_sticker = Favorite(
            userId = current_user.id,
            stickerId = id,
            favorite = True
        )
        db.session.add(add_favorite_sticker)
        db.session.commit()
        return jsonify(message='Add to favorite successfully')
    return jsonify(message='Sticker already favorited')

@favorite_routes.route('<int:id>/remove', methods=['DELETE'])
def remove_favorite(id):
    favorite_sticker = Favorite.query.get(id)

    if favorite_sticker:
        db.session.delete(favorite_sticker)
        db.session.commit()
        return jsonify(message='Remove from favorite successfully')
    
    return jsonify(message='Sticker not found')