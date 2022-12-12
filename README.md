# 💬 HETIC Messenger 💬

## Getting Started

1. Run `docker-compose up -d` to start the symfony app
2. If u have nvm installed, run `nvm use` or download `node@16.17.0`
3. Run `cd frontend`
4. Run `npm install` to install dependencies
5. Run `npm run dev` to start the frontend app
6. In another terminal, run `cd mobile`
7. Run `yarn install` to install dependencies
8. Run `yarn start` to start the mobile app

### It's the first time you start the project ?

Don't forget to install composer dependencies

1. Run `docker ps` to and search the id of the `hetic-messenger-symfony` container
2. Run `docker exec -ti [container-id] bash` to enter the container's CLI
3. Run `cd symfony`
4. Run `composer i` to install dependencies
5. Run `symfony console d:d:c` to create your database
6. Run `symfony console d:m:m` to make database migrations
7. Run `symfony console d:f:l` to load fixtures

**Enjoy!**

## Copyrights ©

Maxence BREUILLES ([@MisterAzix](https://github.com/MisterAzix))<br />
Julian LABALLE ([@Triips-TheCoder](https://github.com/Triips-TheCoder))<br />
Anis Coquelet ([@aniscoquelet](https://github.com/aniscoquelet))
