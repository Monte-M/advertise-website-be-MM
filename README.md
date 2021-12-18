# HOW TO START BACK-END:

## Option #1:

Use this link to see remote working website https://compassionate-rosalind-8e4c77.netlify.app/

## Option #2 (with local back-end and remote database):

1. Open this repository in your source-code editor;
2. Run npm install;
3. Fill .env example file with database details which I will provide to you directly
4. Change .env example to .env;
5. Run nodemon src/server OR node src/server;
6. Go to website and enjoy it.

## Option #3 (with local back-end and database):

1. Open this repository in your source-code editor;
2. Run npm install;
3. Upload SQL to your database (local or remote) from src/database/DB.sql;
4. Fill .env example file with your database details
6. Change .env example to .env;
6. Run your database;
7. Run nodemon src/server OR node src/server;
8. Go to website and enjoy it.

### P.S required applications, which will be installed during "npm install":
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^10.0.0",
    "express": "^4.17.1",
    "joi": "^17.5.0",
    "jsonwebtoken": "^8.5.1",
    "morgan": "^1.10.0",
    "multer": "^1.4.4",
    "mysql2": "^2.3.0"
