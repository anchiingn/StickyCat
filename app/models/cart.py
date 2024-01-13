from .db import db, environment, SCHEMA, add_prefix_for_prod

class Cart(db.Model):
    __tablename__ = 'carts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    stickerId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('stickers.id')))
    cart = db.Column(db.Boolean, default=False)
    quantity = db.Column(db.Integer, default=1)

    user_cart = db.relationship('User', back_populates='cart_user', cascade='delete')
    sticker_cart = db.relationship('Sticker', back_populates='cart_sticker')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'stickerId': self.stickerId,
            'cart': self.cart,
            'quantity': self.quantity
        }