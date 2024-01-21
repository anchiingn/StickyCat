from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db
from app.models.cart import Cart
from app.models.sticker import Sticker
from app.models.user import User

cart_routes = Blueprint('carts', __name__)


@cart_routes.route('/my-cart')
def get_cart_stickers():
    cart_stickers = Cart.query.filter_by(cart = True).all()
    cart_data = []
    for cart_sticker in cart_stickers:
        data = cart_sticker.to_dict()
        stickers = Sticker.query.filter_by(id = cart_sticker.stickerId).all()
        data['stickers'] = [sticker.to_dict() for sticker in stickers]
        cart_data.append(data)
    return cart_data

@cart_routes.route('/')
def get_cart_sticker():
    cart_stickers = Cart.query.all()  

    # for cart_sticker in cart_stickers:
    #     data = cart_sticker.to_dict()
    #     stickers = Sticker.query.filter_by(id = cart_sticker.stickerId).all()
    #     data['stickers'] = [sticker.to_dict() for sticker in stickers]
    #     cart_data.append(data)
    return [cart_sticker.to_dict() for cart_sticker in cart_stickers]

@cart_routes.route('<int:id>', methods=['POST'])
def add_to_cart(id):
    cart_sticker = Cart.query.filter_by(userId = current_user.id, stickerId = id).first()

    if not cart_sticker:
        add_cart_sticker = Cart(
            userId = current_user.id,
            stickerId = id,
            cart = True,
            quantity = 1
        )
        db.session.add(add_cart_sticker)
        db.session.commit()
        return jsonify(message='Add to cart successfully')
    else:
        cart_sticker.quantity += 1
        db.session.commit()
        return jsonify(message='increase the quantity by 1')
    
@cart_routes.route('<int:id>/remove', methods=['DELETE'])
def remove_cart(id):
    cart_sticker = Cart.query.get(id)

    if cart_sticker:
        db.session.delete(cart_sticker)
        db.session.commit()
        return jsonify(message='Remove from cart successfully')
    
    return jsonify(message='Sticker not found')

@cart_routes.route('<int:id>/one-sticker', methods=['DELETE'])
def remove_one_sticker(id):
    cart_sticker = Cart.query.get(id)

    if cart_sticker.quantity > 1:
        cart_sticker.quantity -= 1
        db.session.commit()
        return jsonify(message='decrease the quantity by 1')
    
    if cart_sticker.quantity == 1:
        db.session.delete(cart_sticker)
        db.session.commit()
        return jsonify(message='decrease the quantity by 1')
    
    return jsonify(message='Sticker not found')

@cart_routes.route('/remove-all-stickers', methods=['DELETE'])
def remove_all_sticker():
    cart_stickers = Cart.query.all()  

    if cart_stickers:
        ''' have to iterate to delete all'''
        for sticker in cart_stickers:  
            db.session.delete(sticker)
        db.session.commit()
        return jsonify(message='Remove All Stickers in cart')
    
    
    return jsonify(message='Stickers not found')