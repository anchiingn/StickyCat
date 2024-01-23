from flask_wtf import FlaskForm
from wtforms import TextAreaField, IntegerField, validators
from wtforms.validators import DataRequired, Email, ValidationError, URL


class ReviewForm(FlaskForm):
    review=TextAreaField('review', validators=[DataRequired(), validators.Length(max=100)])
    star=IntegerField('star')
    