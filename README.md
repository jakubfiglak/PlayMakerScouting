# Node app - user authentication and more! :rocket:

## Overview :telescope:

This is the template meant to make Node.js apps development easier. It gives you predefined authentication controllers and routes ready to use in any Node.js app.

## Features :hammer:

### Authentication routes and controllers

- register user with jsonwebtoken,
- user login,
- get account details (logged in users only),
- account details update (logged in users only),
- password update (logged in users only),
- basic password reset flow with nodemailer

### Users routes and controllers (admin only)

- get all users,
- get single user by id,
- delete user

### Authorization middlewares

- protect - only authenticated users can visit certain routes, eg.

`router.get('/account', protect, account);`

- authorize - only users with certain roles can visit certain routes, eg.

```router.use(protect);
router.use(authorize('admin'));

router.get('/', getUsers);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);
```

## How to use :floppy_disk:

This is a template repository, so you can create your own repo based on it by clicking `Use this template`

### Create config.env file in config directory

```NODE_ENV=development
PORT=5000

BASE_URL=/api/v1

DB_CONNECT=your mongoDB connection string

JWT_SECRET=somejwtsecret
JWT_EXPIRE=30d

SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_EMAIL=
SMTP_PASSWORD=
FROM_EMAIL=
FROM_NAME=
```

## Credits :raised_hands:

Credits to [Brad Traversy](https://www.traversymedia.com/) - this project is based on his course [Node.js API Masterclass](https://www.udemy.com/course/nodejs-api-masterclass/)
