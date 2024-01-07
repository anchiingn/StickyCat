from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db
from app.models.cart import Cart
from app.models.user import User

cart_routes = Blueprint('carts', __name__)
