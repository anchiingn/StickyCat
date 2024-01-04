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
    
    sticker2 = Sticker(
        ownerId=1, 
        title='Skating Ghost', 
        price= 2.99, 
        image='https://stickycat.s3.us-east-2.amazonaws.com/Skateboarding_Ghost.png', 
        height='1.5 inch',
        width='1 inch',
        message="Ghost can do skating too!",
        )
    
    sticker3 = Sticker(
        ownerId=2, 
        title='Apple Cat', 
        price= 1.99, 
        image='https://stickycat.s3.us-east-2.amazonaws.com/Cat_Apple_%F0%9F%8D%8E.png', 
        height='1.5 inch',
        width='1.5 inch',
        message="Yummy apple cat",
        )
    
    db.session.add(sticker1)
    db.session.add(sticker2)
    db.session.add(sticker3)

    db.session.commit()


def undo_stickers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.stickers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM stickers"))
        
    db.session.commit()