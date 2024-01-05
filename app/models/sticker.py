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
    height = db.Column(db.Integer)
    width = db.Column(db.Integer)
    message = db.Column(db.String(300))
    shipdate = db.Column(db.Date)
    createAt = db.Column(db.Date, default=datetime.now())
    updateAt = db.Column(db.Date, default=datetime.now())

    user_sticker = db.relationship('User', back_populates='sticker_user')
    cart_sticker = db.relationship('Cart', back_populates='sticker_cart')
    review_sticker = db.relationship('Review', back_populates='sticker_review')
    favorite_sticker = db.relationship('Favorite', back_populates='sticker_favorite')

    def to_dict(self):
        return {
            'id': self.id,
            'ownerId': self.ownerId,
            'title': self.title,
            'price': self.price,
            'image': self.image,
            'height': self.height,
            'width': self.width,
            'message': self.message,
            'shipdate': self.shipdate,
            'createAt': self.createAt,
            'updateAt': self.updateAt
        }