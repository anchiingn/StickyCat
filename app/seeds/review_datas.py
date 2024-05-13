from app.models.review import db, Review, environment, SCHEMA
from .reviews.SkatingGhost import SkatingGhost
from .reviews.SkatingBanana import SkatingBanana
from .reviews.BunnyGirl import BunnyGirl
from .reviews.SpleeyGirl import SleepyGirl
from .reviews.DogInBoots import DogInBoots
from .reviews.EggSandwich import EggSandwich
from .reviews.ChickenWaffle import ChickenWaffle
from .reviews.GothicGirl import GothicGirl
from sqlalchemy.sql import text

def seed_reviews():
    
    for stickerReviews in [SkatingBanana, SkatingGhost, BunnyGirl, SleepyGirl, DogInBoots, EggSandwich, ChickenWaffle, GothicGirl]:
        for reviews in stickerReviews:
            review_seed = Review(
                    userId= reviews['userId'],
                    stickerId= reviews['stickerId'],
                    review=reviews['review'],
                    star=reviews['star'],
                )
            db.session.add(review_seed)
    # db.session.add(review1)
    # db.session.add(review2)
    # db.session.add(review3)
    # db.session.add(review4)
    # db.session.add(review5)

    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))
        
    db.session.commit()