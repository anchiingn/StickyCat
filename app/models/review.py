from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    stickerId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('stickers.id')))
    review = db.Column(db.String(100))
    star = db.Column(db.Integer)
    createAt = db.Column(db.Date, default=datetime.now())
    updateAt = db.Column(db.Date, default=datetime.now()) 

    user_review = db.relationship('User', back_populates = 'review_user')
    sticker_review = db.relationship('Sticker', back_populates = 'review_sticker')  

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'stickerId': self.stickerId,
            'review': self.review,
            'star': self.star,
            'createAt': self.createAt,
            'updateAt': self.updateAt
        }