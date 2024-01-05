from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db
from app.forms.sticker_form import StickerForm
from app.models.sticker import Sticker
from app.models.user import User
from app.api.aws_helpers import upload_file_to_s3, remove_file_from_s3, get_unique_filename

sticker_routes = Blueprint('stickers', __name__)

@sticker_routes.route('/')
def get_stickers():
    stickers = Sticker.query.all()
    allStickers = [sticker.to_dict() for sticker in stickers]
    return allStickers


@sticker_routes.route('/<int:id>')
def get_single_sticker(id):
    sticker = Sticker.query.get(id)

    sticker_data = []
    data = sticker.to_dict()
    currentStickers = User.query.filter_by(id = sticker.ownerId).all()
    data['user'] = [user.to_dict() for user in currentStickers]
    sticker_data.append(data)

    return sticker_data


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


@sticker_routes.route('/new', methods=["POST"])
def post_new_stickers():
    form = StickerForm()

    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():

        image=form.data['image']
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        print(upload)

        if "url" not in upload:
            return jsonify(message='url not found')

        new_sticker = Sticker(
            ownerId=current_user.id,
            title=form.data['title'],
            image=upload['url'],
            price=form.data['price'],
            height=form.data['height'],
            width=form.data['width'],
            message=form.data['message']
        )

        db.session.add(new_sticker)
        db.session.commit()
        return new_sticker.to_dict()
    else:
        return jsonify(message='Bad Data')