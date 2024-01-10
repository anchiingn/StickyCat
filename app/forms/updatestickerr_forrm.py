from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, FloatField
from wtforms.validators import DataRequired, Email, ValidationError, URL


class UpdateStickerForm(FlaskForm):
    title=StringField('title', validators=[DataRequired()])
    price=IntegerField('price', validators=[DataRequired()])
    height=IntegerField('height', validators=[DataRequired()])
    width=IntegerField('width', validators=[DataRequired()])
    message=TextAreaField('message')
