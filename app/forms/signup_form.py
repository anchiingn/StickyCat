import re
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


# def username_exists(form, field):
#     # Checking if username is already in use
#     username = field.data
#     user = User.query.filter(User.username == username).first()
#     if user:
#         raise ValidationError('Username is already in use.')
    
def password_length(form, field):
    password = field.data
    if len(password) < 8:
        raise ValidationError('Minimum password length must be 8 characters.')
    if not re.search("[a-z]", password):
        raise ValidationError('Password must contain at least one lowercase letter.')
    if not re.search("[A-Z]", password):
        raise ValidationError('Password must contain at least one uppercase letter.')
    if not re.search("[0-9]", password):
        raise ValidationError('Password must contain at least one digit.')
    

class SignUpForm(FlaskForm):
    firstname = StringField('firstname', validators=[DataRequired()])
    lastname = StringField('lastname', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired(), user_exists,Email()])
    password = StringField('password', validators=[DataRequired(), password_length])
