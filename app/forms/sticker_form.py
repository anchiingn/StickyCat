from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, FloatField
from wtforms.validators import DataRequired, Email, ValidationError, URL
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.aws_helpers import ALLOWED_EXTENSIONS

class StickerForm(FlaskForm):
    title=StringField('title')
    price=FloatField('price')
    image = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    # image=StringField('image')
    height=IntegerField('height')
    width=IntegerField('width')
    message=TextAreaField('message')