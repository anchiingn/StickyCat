# Hello from StickyCat!
StickyCat website: https://stickycat.onrender.com

## About StickyCat
StickyCat is a platform that  showcasing adorable, whimsical stickers that spread joy far and wide. StickyCat isn't just about stickers; it's a magical realm where creators and brands craft enchanting collections, aiming to sprinkle the world with sweetness, one sticker at a time.

## Technologies Used
### Frameworks and Libraries:
Python, Flask, Javascript, React, Redux, CSS, HTML

### Database:
PostgreSQL

### Hosting:
Render

# Index

[Feature List](https://github.com/anchiingn/StickyCat/wiki/Feature-List) | [Database Schema](https://github.com/anchiingn/StickyCat/wiki/Database-Schema) | [User Stories](https://github.com/anchiingn/StickyCat/wiki/User-Stories) | [Wireframes](https://github.com/anchiingn/StickyCat/wiki/WireFrames)

# Landing Page
<img width="1500" alt="Screen Shot 2024-02-01 at 11 34 48 PM" src="https://github.com/anchiingn/StickyCat/assets/132519374/4c5f7070-7a56-40ba-a2e6-92bf9afc129a">

# Explored Sticker Page
<img width="1500" alt="Screen Shot 2024-02-01 at 11 34 26 PM" src="https://github.com/anchiingn/StickyCat/assets/132519374/22539998-6b00-4ef5-a427-cb9fd5d70aae">

# Create Sticker
<img width="1500" alt="Screen Shot 2024-02-01 at 11 34 18 PM" src="https://github.com/anchiingn/StickyCat/assets/132519374/a96eec55-3db5-4d3b-8d76-ee86d464c607">

# Sticker Detail Page 
<img width="1500" alt="Screen Shot 2024-02-01 at 11 38 17 PM" src="https://github.com/anchiingn/StickyCat/assets/132519374/0d0d2ac2-1086-4262-8e2d-4ae7f7df74e0">

# Sign In/Up Page
<img width="900" alt="Screen Shot 2024-02-01 at 11 35 00 PM" src="https://github.com/anchiingn/StickyCat/assets/132519374/d94fb2cd-8e6b-468c-bed3-538fe32207fa">

## Getting started

1. Clone this repository (only this branch).

2. Install dependencies.

   ```bash
   pipenv install -r requirements.txt
   ```

3. Create a __.env__ file based on the example with proper settings for your
   development environment.

4. Make sure the SQLite3 database connection URL is in the __.env__ file.

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention.**

6. Get into your pipenv, migrate your database, seed your database, and run your
   Flask app:

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. The React frontend has no styling applied. Copy the __.css__ files from your
   Authenticate Me project into the corresponding locations in the
   __react-vite__ folder to give your project a unique look.

8. To run the React frontend in development, `cd` into the __react-vite__
   directory and run `npm i` to install dependencies. Next, run `npm run build`
   to create the `dist` folder. The starter has modified the `npm run build`
   command to include the `--watch` flag. This flag will rebuild the __dist__
   folder whenever you change your code, keeping the production version up to
   date.

