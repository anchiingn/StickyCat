from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models.sticker import Sticker
from app.models.user import User

sticker_routes = Blueprint('stickers', __name__)

@sticker_routes.route('/')
def get_stickers():
    stickers = Sticker.query.all()
    allStickers = [sticker.to_dict() for sticker in stickers]
    return allStickers

@sticker_routes.route('/<int:id>')
def get_single_sticker(id):
    sticker = Sticker.query.get(id)
    return sticker.to_dict()

@sticker_routes.route('/my-stickers')
@login_required
def get_current_stickers():
    stickers = Sticker.query.all()

    sticker_data = []
    for sticker in stickers:
        data = sticker.to_dict()
        currentStickers = User.query.filter_by(id = sticker.ownerId).all()
        data['user'] = [user.to_dict() for user in currentStickers]
        sticker_data.append(data)

    return sticker_data

