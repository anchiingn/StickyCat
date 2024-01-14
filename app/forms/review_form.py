from flask_wtf import FlaskForm
from wtforms import TextAreaField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, URL


class ReviewForm(FlaskForm):
    review=TextAreaField('review', validators=[DataRequired()])
    star=IntegerField('star')
    