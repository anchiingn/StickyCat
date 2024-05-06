from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Sticker(db.Model):
    __tablename__ = 'stickers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    ownerId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    title = db.Column(db.String(50))
    price = db.Column(db.Float)
    image = db.Column(db.String)
    height = db.Column(db.Float)
    width = db.Column(db.Float)
    message = db.Column(db.String(500))
    createAt = db.Column(db.Date, default=datetime.now())
    updateAt = db.Column(db.Date, default=datetime.now())

    user_sticker = db.relationship('User', back_populates='sticker_user')
    cart_sticker = db.relationship('Cart', back_populates='sticker_cart', cascade='delete')
    review_sticker = db.relationship('Review', back_populates='sticker_review', cascade='delete')
    favorite_sticker = db.relationship('Favorite', back_populates='sticker_favorite', cascade='delete')

    def to_dict(self):
        return {
            'id': self.id,
            'ownerId': self.ownerId,
            'title': self.title,
            'price': "%.2f" % self.price,
            'image': self.image,
            'height': self.height,
            'width': self.width,
            'message': self.message,
            'createAt': self.createAt,
            'updateAt': self.updateAt,
            'user': {
                'firstname': self.user_sticker.firstname,
                'lastname': self.user_sticker.lastname
            },
            
            'star': [review.star for review in self.review_sticker],
            'review': [review.review for review in self.review_sticker],
            'favorited' : [favorite.favorite for favorite in self.favorite_sticker]
        }
    

