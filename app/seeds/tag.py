from app.models.sticker import db, Tag, environment, SCHEMA
from sqlalchemy.sql import text

def seed_tags():
    tag1 = Tag(
            stickerId=1,
            tag='cool'
        )
    
    tag2 = Tag(
            stickerId=2,
            tag='cool'
        )
    
    tag3 = Tag(
            stickerId=3,
            tag='cute'
        )
    
    
    db.session.add(tag1)
    db.session.add(tag2)
    db.session.add(tag3)


    db.session.commit()


def undo_tags():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tags RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tags"))
        
    db.session.commit()