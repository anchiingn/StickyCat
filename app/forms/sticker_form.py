from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, FloatField
from wtforms.validators import DataRequired, Email, ValidationError, URL
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.aws_helpers import ALLOWED_EXTENSIONS

class StickerForm(FlaskForm):
    title=StringField('title', validators=[DataRequired()])
    price=FloatField('price', validators=[DataRequired()])
    image = FileField("image", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    height=IntegerField('height')
    width=IntegerField('width')
    message=TextAreaField('message', validators=[DataRequired()])


