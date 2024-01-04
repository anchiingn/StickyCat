from app.models.sticker import db, Sticker, environment, SCHEMA
from sqlalchemy.sql import text

def seed_stickers():
    sticker1 = Sticker(
        ownerId=1, 
        title='Skating Banana', 
        price= 2.99, 
        image='https://stickycat.s3.us-east-2.amazonaws.com/Skateboarding_Banana.png', 
        height='1.5 inch',
        width='1 inch',
        message="The Skating Banana is all about spreading good vibes and a dash of fruity fun wherever it goes. Whether you're a skateboarding fanatic or simply love quirky stickers, this one's bound to make you grin. Stick it on your board, laptop, water bottle wherever you need a bit of cheer!",
        )
    
    db.session.add(sticker1)
    db.session.commit()


def undo_stickers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.stickers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM stickers"))
        
    db.session.commit()