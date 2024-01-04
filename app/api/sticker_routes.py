from flask import Blueprint, jsonify
from flask_login import login_required
from app.models.sticker import Sticker

sticker_routes = Blueprint('stickers', __name__)

@sticker_routes.route('/')
def get_stickers():
    stickers = Sticker.query.all()
    allStickers = [sticker.to_dict() for sticker in stickers]
    return allStickers
