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
    
    
    db.session.add(review1)

    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))
        
    db.session.commit()