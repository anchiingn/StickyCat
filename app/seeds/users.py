from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        firstname='Demo', lastname='Mode', email='demo@aa.io', password='password')
    
    marnie = User(
        firstname='Marnie', lastname='Garcie', email='marnie@aa.io', password='password')
    
    bobbie = User(
        firstname='Bobbie', lastname='Brown', email='bobbie@aa.io', password='password')
    
    emma = User(
        firstname='Emma', lastname='Rodriguez', email='emma@aa.io', password='password')
    
    ren = User(
        firstname='Ren', lastname='Ito', email='ren@aa.io', password='password')
    
    jane = User(
        firstname='Jane', lastname='Doe', email='jane@aa.io', password='password')

    john = User(
        firstname='John', lastname='Smith', email='john@aa.io', password='password')

    alice = User(
        firstname='Alice', lastname='Johnson', email='alice@aa.io', password='password')

    mark = User(
        firstname='Mark', lastname='Lee', email='mark@aa.io', password='password')

    sophia = User(
        firstname='Sophia', lastname='Martinez', email='sophia@aa.io', password='password')

    

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(emma)
    db.session.add(ren)
    db.session.add(jane)
    db.session.add(john)
    db.session.add(alice)
    db.session.add(mark)
    db.session.add(sophia)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()
