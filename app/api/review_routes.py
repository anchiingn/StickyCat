from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db
from app.models.review import Review
from app.models.user import User
from app.forms.review_form import ReviewForm

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/<int:id>')
def get_reviews(id):
    reviews = Review.query.filter_by(stickerId=id).all() #get review by stickerID
    
    review_data = []
    for review in reviews:
        data = review.to_dict() 
        user = User.query.get(review.userId)
        data['user'] = user.to_dict() if user else {}
        review_data.append(data)

    return review_data
    
@review_routes.route('/<int:id>/edit-review', methods=["PUT"])
def edit_reviews(id):
    review = Review.query.get(id)

    form = ReviewForm()

    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():

        review.review=form.data['review']
        review.star=form.data['star']

        db.session.commit()
        return review.to_dict()
    else:
        return form.errors, 401
    

@review_routes.route('/<int:id>/delete-review', methods=["DELETE"])
def delete_reviews(id):
    review = Review.query.get(id)
    
    if review:
        db.session.delete(review)
        db.session.commit()
        return jsonify({'message': 'Review removed successfully'})

    return jsonify({'message': 'Review not found'})