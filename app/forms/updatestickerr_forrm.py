from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, FloatField


class UpdateStickerForm(FlaskForm):
    title=StringField('title')
    price=IntegerField('price')
    height=IntegerField('height')
    width=IntegerField('width')
    message=TextAreaField('message')
