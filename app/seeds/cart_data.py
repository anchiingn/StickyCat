from app.models.cart import db, Cart, environment, SCHEMA
from sqlalchemy.sql import text

def seed_carts():
    cart1 = Cart(
            userId=1,
            stickerId=1,
        )
    
    
    db.session.add(cart1)

    db.session.commit()


def undo_carts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.carts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM carts"))
        
    db.session.commit()