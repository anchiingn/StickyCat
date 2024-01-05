from app.models.favorite import db, Favorite, environment, SCHEMA
from sqlalchemy.sql import text

def seed_favorites():
    favorite1 = Favorite(
           userId=1,
           stickerId=3,
           favorite= True
        )
    
    
    
    db.session.add(favorite1)

    db.session.commit()


def undo_favorites():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.favorites RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM favorites"))
        
    db.session.commit()