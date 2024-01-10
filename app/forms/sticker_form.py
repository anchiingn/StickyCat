from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, FloatField
from wtforms.validators import DataRequired, Email, ValidationError, URL
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.aws_helpers import ALLOWED_EXTENSIONS
from app.models.sticker import Sticker



class StickerForm(FlaskForm):
    title=StringField('title', validators=[DataRequired()])
    price=FloatField('price', validators=[DataRequired()])
    image = FileField("image", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    height=IntegerField('height', validators=[DataRequired()])
    width=IntegerField('width', validators=[DataRequired()])
    message=TextAreaField('message')


