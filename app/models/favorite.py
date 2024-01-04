from .db import db, environment, SCHEMA, add_prefix_for_prod

class Favorite(db.Model):
    __tablename__ = 'favorites'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    stickerId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('stickers.id')))
    favorite = db.Column(db.Boolean, default=False)

    user_favorite = db.relationship('User', back_populates = 'favorite_user')
    sticker_favorite = db.relationship('Sticker', back_populates = 'favorite_sticker')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'stickerId': self.stickerId,
            'favorite': self.favorite
        }