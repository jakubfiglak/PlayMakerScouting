# Playmaker Pro Scouting ⚽

![home-screen](https://user-images.githubusercontent.com/55458549/110521328-e451f100-810f-11eb-9916-9af1257a28c5.PNG)

## Table of contents

- [Overview 🔭](#overview-🔭)
- [Live 💥](#live-💥)
- [Tech stack 🔨](#tech-stack-🔨)
  - [Backend ⚙️](#backend-️⚙️)
  - [Frontend 💻](#frontend-💻)
- [Screenshots 📷](#screenshots-📷)
  - [Players table](#players-table)
  - [New player form](#new-player-form)
  - [Reports table](#reports-table)
  - [New report form](#new-report-form)
  - [Report printing](#report-printing)
- [How to use 💾](#how-to-use-💾)

## Overview 🔭

The main purpose of this product is to make scouting football players easier. Users can create their own database of football clubs and players they are interested in and create scouting reports.

## Live 💥

You can see live version of this project [here](https://playmakerscouting.herokuapp.com/)

### ❗ Test user credentials:

Registering new users is blocked in the test version of the app. If you want to log in, please use test user credentials:

```
login: playmakertest@example.com
password: SomePassword12345
```

## Tech stack 🔨

### Backend ⚙️

- **Framework**: [Express](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/3)
- **ODM**: [Mongoose](https://mongoosejs.com/)

### Frontend 💻

- **Framework**: [React](https://pl.reactjs.org/) with [Typescript](https://www.typescriptlang.org/)
- **State Management**: React Context API with Hooks
- **UI Library**: [Material UI](https://material-ui.com/)

## Screenshots 📷

### Players table

![players_table](https://user-images.githubusercontent.com/55458549/110527456-46622480-8117-11eb-83cd-ecc41785988b.PNG)

### New player form

![new_player_form](https://user-images.githubusercontent.com/55458549/110527562-672a7a00-8117-11eb-9030-eb8bb4cd7716.PNG)

### Reports table

![reports_table](https://user-images.githubusercontent.com/55458549/110527681-8e814700-8117-11eb-8d0f-55dcb2a56a8a.PNG)

### New report form

![new_report_form](https://user-images.githubusercontent.com/55458549/110527838-bd97b880-8117-11eb-84bc-9fe51dd9a955.PNG)

### Report printing

![report_printing](https://user-images.githubusercontent.com/55458549/110528151-1bc49b80-8118-11eb-8888-05b1027be489.PNG)

## How to use 💾

If you want to play with this project locally on your machine, feel free to copy or download this repository. Then, you have to complete the following steps:

1. Run `npm install` in the root folder and in the `/client` folder
2. Go to the `/config` folder, rename `config.example.env` to `config.env` and set the following environment variables:

```
DB_CONNECT='your_mongodb_connection_string'
JWT_SECRET='your_supersecret_key'
SENDGRID_API_KEY='your_sendgrid_api_key'
```

3. ...and you are ready to go! All you need to do now is run `npm run dev` in the project root folder - this script will start the server and the client concurrently.
