from app.models.review import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
    review1 = Review(
            userId=1,
            stickerId=3,
            review='So cute',
            star= 5,
        )
    review2 = Review(
            userId=2,
            stickerId=1,
            review='nice sticker',
            star= 4,
        )
    review3 = Review(
            userId=3,
            stickerId=1,
            review='look weird',
            star= 3,
        )
    review4 = Review(
            userId=1,
            stickerId=4,
            review='look so so so weird',
            star= 3,
        )
    review5 = Review(
            userId=1,
            stickerId=3,
            review='cute cat',
            star= 4,
        )
    
    
    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)

    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))
        
    db.session.commit()