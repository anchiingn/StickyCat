from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db
from app.forms.sticker_form import StickerForm
from app.forms.updatestickerr_forrm import UpdateStickerForm
from app.forms.review_form import ReviewForm
from app.models.sticker import Sticker
from app.models.review import Review
from app.models.user import User
from app.models.favorite import Favorite
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
    favorites = Favorite.query.filter_by(stickerId = sticker.id).all()
    reviews = Review.query.filter_by(stickerId = sticker.id).all()

    data['user'] = [user.to_dict() for user in currentStickers]
    data['favorited'] = [favorite.to_dict() for favorite in favorites]
    data['reviews'] = [review.to_dict() for review in reviews]
    sticker_data.append(data)

    return sticker_data


@sticker_routes.route('/my-stickers')
# @login_required
def get_current_stickers():
    
    stickers = Sticker.query.filter_by(ownerId = current_user.id).all()

    sticker_data = []
    for sticker in stickers:
        data = sticker.to_dict()
        currentStickers = User.query.filter_by(id = sticker.ownerId).all()
        data['user'] = [user.to_dict() for user in currentStickers]
        sticker_data.append(data)

    return sticker_data


@sticker_routes.route('/new-sticker', methods=["POST"])
def create_new_stickers():
    form = StickerForm()

    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():

        image=form.data['image']
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        print('Aaaaaaaaaaaaa', upload)

        if "url" not in upload:
            return {'errors': upload}

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
        return form.errors, 401
    

@sticker_routes.route('/<int:id>/edit-sticker', methods=["PUT"])
def update_stickers(id):
    sticker = Sticker.query.get(id)

    form = UpdateStickerForm()

    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():

        # image=form.data['image']
        # image.filename = get_unique_filename(image.filename)
        # upload = upload_file_to_s3(image)

        # if "url" not in upload:
        #     return {'errors': upload}
        # else:
        #     remove_file_from_s3(sticker.image)
        #     sticker.image = upload('url')

        
        sticker.title=form.data['title']
        # sticker.image=upload['url'],
        sticker.price=form.data['price']
        sticker.height=form.data['height']
        sticker.width=form.data['width']
        sticker.message=form.data['message']
        
        db.session.commit()
        return sticker.to_dict()
    else:
        return form.errors, 401
    

@sticker_routes.route('/<int:id>/delete-sticker', methods=["DELETE"])
def delete_sticker(id):
    sticker = Sticker.query.get(id)

    db.session.delete(sticker)
    db.session.commit()
    
    return jsonify(message='Sucessfully delete sticker')


@sticker_routes.route('/<int:id>/new-review', methods=["POST"])
def create_new_reviews(id):
    form = ReviewForm()

    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():

        new_review = Review(
            userId=current_user.id,
            stickerId=id,
            review=form.data['review'],
            star=form.data['star'],
        )

        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict()
    else:
        return jsonify(message='Bad Data')
