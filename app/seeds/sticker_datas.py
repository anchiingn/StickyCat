from app.models.sticker import db, Sticker, environment, SCHEMA
from sqlalchemy.sql import text

def seed_stickers():
    demo1 = Sticker(
        ownerId=1, 
        title='Skating Banana', 
        price= 2.99, 
        image='https://stickycat.s3.us-east-2.amazonaws.com/StickyCat_stcickers/Skateboarding_Banana__040623.png', 
        height='1.5',
        width='1',
        message="The Skating Banana is all about spreading good vibes and a dash of fruity fun wherever it goes. Whether you're a skateboarding fanatic or simply love quirky stickers, this one's bound to make you grin. Stick it on your board, laptop, water bottle wherever you need a bit of cheer!",
        )
    
    demo2 = Sticker(
        ownerId=1, 
        title='Skating Ghost', 
        price= 2.99, 
        image='https://stickycat.s3.us-east-2.amazonaws.com/StickyCat_stcickers/Skateboarding_Ghost__040323.png', 
        height='1.5',
        width='1',
        message="Meet the Skating Ghost, gliding through with spectral style! This sticker embodies playful spookiness, bringing a touch of whimsy to any surface. Whether you're a phantom fanatic or simply love unique stickers, this spirited skater is sure to charm. Stick it on your gear, laptop, or journal for a hauntingly good time!",
        )
    
    marnie1 = Sticker(
        ownerId=2, 
        title='Bunny Girl', 
        price= 1.99, 
        image='https://stickycat.s3.us-east-2.amazonaws.com/StickyCat_stcickers/Headshot_Designs+1.png', 
        height='1.5',
        width='1.25',
        message="Introducing the Bunny Girl Head sticker — A fusion of cute and trendy! This sticker embodies playful charm, perfect for those who adore kawaii aesthetics or simply seek something unique.",
        )
    
    emma1 = Sticker(
        ownerId=4, 
        title='Apple Cat', 
        price= 1.99, 
        image='https://stickycat.s3.us-east-2.amazonaws.com/StickyCat_stcickers/Cat_Apple_%F0%9F%8D%8E__092123.png', 
        height='1.5',
        width='1.5',
        message="In a sun-kissed orchard, Whiskers the cat bit into a mystical apple, transforming into the Apple Cat! With a charming apple-shaped mark, she frolicked among the trees, spreading fruity cheer. Captivated by her tale, artists crafted a delightful sticker, immortalizing her playful spirit in a fruity embrace.",
        )
    
    demo3 = Sticker(
        ownerId=1, 
        title='Skating Octopus', 
        price= 2.99, 
        image='https://stickycat.s3.us-east-2.amazonaws.com/StickyCat_stcickers/Skateboarding_Octopus__040923.png', 
        height='1.5',
        width='1',
        message="Behold the Skating Octopus, an eight-legged maestro on wheels! This sticker is an embodiment of playful marine magic, adding a splash of whimsy to your belongings. Whether you adore cephalopods or simply crave quirky stickers, this charming skater will surely catch your eye. Stick it on your skateboard, laptop, or water bottle for a delightful wave of fun!",
        )
    
    ren1 = Sticker(
        ownerId=5, 
        title='Egg Sandwich', 
        price= 2.99, 
        image='https://stickycat.s3.us-east-2.amazonaws.com/StickyCat_stcickers/Breads__012322+1.png', 
        height='1.5',
        width='1',
        message="Begin your day deliciously with the Morning Delights sticker, celebrating breakfast bliss! This sticker features a scrumptious mix of morning favorites for early birds and breakfast enthusiasts. Place it on your mug, journal, or laptop to savor delightful vibes every morning. Let this sticker remind you that a delightful day starts with a delectable bite! 🥞☕️✨",
        )
    
    ren2 = Sticker(
        ownerId=5, 
        title='Chicken Waffel', 
        price= 2.99, 
        image='https://stickycat.s3.us-east-2.amazonaws.com/StickyCat_stcickers/Breads__012322+2.png', 
        height='1.5',
        width='1',
        message="Begin your day deliciously with the Morning Delights sticker, celebrating breakfast bliss! This sticker features a scrumptious mix of morning favorites for early birds and breakfast enthusiasts. Place it on your mug, journal, or laptop to savor delightful vibes every morning. Let this sticker remind you that a delightful day starts with a delectable bite! 🥞☕️✨",
        )
    
    bobbie1 = Sticker(
        ownerId=3, 
        title='Dog in Boots', 
        price= 2.99, 
        image='https://stickycat.s3.us-east-2.amazonaws.com/StickyCat_stcickers/Dog_In_Boots__030923.png', 
        height='1.5',
        width='1',
        message="A playful portrayal of a pooch strutting in style! This adorable sticker captures the whimsy of a canine companion donning fashionable boots, bringing a blend of charm and delightful cheer. Perfect for dog enthusiasts or anyone seeking a touch of whimsical fun.",
        )
    
    marnie2 = Sticker(
        ownerId=2, 
        title='Gothic Girl', 
        price= 1.99, 
        image='https://stickycat.s3.us-east-2.amazonaws.com/StickyCat_stcickers/Headshot_Designs+2.png', 
        height='1.5',
        width='1.25',
        message="Unveiling the Gothic Girl Head sticker—an embodiment of dark elegance and mystery! This sticker captures a hauntingly beautiful aesthetic, perfect for those drawn to the enigmatic.",
        )
    
    marnie3 = Sticker(
        ownerId=2, 
        title='Sleepy Girl', 
        price= 1.99, 
        image='https://stickycat.s3.us-east-2.amazonaws.com/StickyCat_stcickers/Headshot_Designs.png', 
        height='1.5',
        width='1.25',
        message="Introducing the Sleeping Girl Head sticker—serene and dreamy! This sticker embodies tranquil beauty, perfect for those who cherish moments of calm.",
        )
    
    emma2 = Sticker(
        ownerId=4, 
        title='Banana Cat', 
        price= 1.99, 
        image='https://stickycat.s3.us-east-2.amazonaws.com/StickyCat_stcickers/Cat_Banana_%F0%9F%8D%8C__092023.png', 
        height='1.5',
        width='1.5',
        message="Amidst a tropical haven, Felix the cat discovered a mystical banana, morphing into the Banana Cat! With a peel-shaped mark, he joyfully pranced amidst banana groves, radiating tropical delight. Enthralled by his tale, artists crafted a whimsical sticker, capturing his playful essence in a peel-tastic embrace.",
        )
    
    ren3 = Sticker(
        ownerId=5, 
        title='Hot Dog', 
        price= 2.99, 
        image='https://stickycat.s3.us-east-2.amazonaws.com/StickyCat_stcickers/Breads__012322.png', 
        height='1.5',
        width='1',
        message="Begin your day deliciously with the Morning Delights sticker, celebrating breakfast bliss! This sticker features a scrumptious mix of morning favorites for early birds and breakfast enthusiasts. Place it on your mug, journal, or laptop to savor delightful vibes every morning. Let this sticker remind you that a delightful day starts with a delectable bite! 🥞☕️✨",
        )
    
    marnie4 = Sticker(
        ownerId=2, 
        title='Crying Boy', 
        price= 1.99, 
        image='https://stickycat.s3.us-east-2.amazonaws.com/StickyCat_stcickers/Headshot_Designs+3.png', 
        height='1.5',
        width='1.25',
        message="Introducing the Crying Boy Head sticker—expressive and emotive! This sticker encapsulates raw feelings, resonating with those who appreciate honest emotions.",
        )
    
    bobbie2 = Sticker(
        ownerId=3, 
        title='Good Day', 
        price= 2.99, 
        image='https://stickycat.s3.us-east-2.amazonaws.com/StickyCat_stcickers/Good_Day__120823.png', 
        height='1.5',
        width='1',
        message='"Good day," said the cat with an expression as blank as a canvas. Yet beneath the stoic facade lay wishes for a day filled with tranquil moments and subtle joys. Embracing simplicity, the cat whispered its greeting, hoping your day would be as serene as its calm demeanor.',
        )
    
    bobbie3 = Sticker(
        ownerId=3, 
        title='Clinging Octopus', 
        price= 2.99, 
        image='https://stickycat.s3.us-east-2.amazonaws.com/StickyCat_stcickers/Clinging_Octopus__030323.png', 
        height='1.5',
        width='1',
        message="This adorable sticker captures the charm of an octopus with its clingy nature, perfect for adding playful fun to your belongings.",
        )
    
    emma3 = Sticker(
        ownerId=4, 
        title='Capybara', 
        price= 2.99, 
        image='https://stickycat.s3.us-east-2.amazonaws.com/StickyCat_stcickers/Capybara__111123.png', 
        height='1.5',
        width='1',
        message="A heartwarming portrayal of an unlikely yet adorable friendship! This delightful sticker captures the charm of a capybara and a cat bonding together in harmony, spreading warmth and joy",
        )
    
    emma4 = Sticker(
        ownerId=4, 
        title='Pear Cat', 
        price= 1.99, 
        image='https://stickycat.s3.us-east-2.amazonaws.com/StickyCat_stcickers/Cat_Pear_%F0%9F%8D%90__092323.png', 
        height='1.5',
        width='1.5',
        message="In a serene orchard, Luna the cat stumbled upon a magical pear, transforming into the Pear Cat! With a pear-shaped mark, she danced gracefully among pear trees, exuding fruity charm. Enchanting artists with her tale, they crafted a whimsical sticker, immortalizing Luna's playful spirit in a pear-fect embrace.",
        )
    
    bobbie4 = Sticker(
        ownerId=3, 
        title='Teddy Bear', 
        price= 1.99, 
        image='https://stickycat.s3.us-east-2.amazonaws.com/StickyCat_stcickers/Teddy_Bear__022423.png', 
        height='1.5',
        width='1.5',
        message="Embrace the warmth of our 'Bear Hug', a tender depiction of a boy cherishing his teddy bear! This heartwarming sticker captures the love and comfort found in a simple hug. ",
        )
    
    emma5 = Sticker(
        ownerId=4, 
        title='Cherry Cats', 
        price= 1.99, 
        image='https://stickycat.s3.us-east-2.amazonaws.com/StickyCat_stcickers/Cherries_%F0%9F%8D%92__102323.png', 
        height='1.5',
        width='1.5',
        message="Where mischievous felines hang on for fruity fun, our 'Cherry Cat' sticker captures playful cats struggling to grasp dangling cherries! This whimsical scene blends mischief with charm, perfect for cat lovers or anyone craving playful joy.",
        )
    
    bobbie5 = Sticker(
        ownerId=3, 
        title='Bear Backpack', 
        price= 1.99, 
        image='https://stickycat.s3.us-east-2.amazonaws.com/StickyCat_stcickers/020923.png', 
        height='1.5',
        width='1.5',
        message="A cute and charming addition to your style! This adorable sticker features a delightful pink bear backpack, perfect for adding a touch of whimsy to your belongings.",
        )
    

    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(marnie1)
    db.session.add(emma1)
    db.session.add(demo3)
    db.session.add(ren1)
    db.session.add(ren2)
    db.session.add(bobbie1)
    db.session.add(marnie2)
    db.session.add(marnie3)
    db.session.add(emma2)
    db.session.add(ren3)
    db.session.add(marnie4)
    db.session.add(bobbie2)
    db.session.add(bobbie3)
    db.session.add(emma3)
    db.session.add(emma4)
    db.session.add(bobbie4)
    db.session.add(emma5)
    db.session.add(bobbie5)

    db.session.commit()


def undo_stickers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.stickers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM stickers"))
        
    db.session.commit()