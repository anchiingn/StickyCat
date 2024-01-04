from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError

class StickerForr(FlaskForm):
    title=StringField('title')
    price=IntegerField('price')
    image=
    height=IntegerField('height')
    width=IntegerField('width')
    message=TextAreaField('message')