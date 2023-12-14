![Silver App Logo](/src/assets/images/silver-logo_white_font-color.png "Silver App Logo")
# Silver Express API

Silver Express is a taxicab company.

## Run the project

### Docker Setup

If you want to use Docker to set up the app, you can use the provided docker-compose.yml file. Run the following command:

```sh
docker compose up
```

### Manual Setup

Alternatively, if you want to run the project manually:

First open the terminal and start the project in docker with the following command line.

```sh
docker run --rm --name silver-postgres -e POSTGRES_PASSWORD=123456 -d -p 5431:5432 postgres
```

Then create the "silver" database in SQL.

```sh
create database silver;
```
Then, rename `.env.example` to `.env` and provide the appropriate **DB_USER**, **DB_PASSWORD**, **DB_HOST**, **DB_PORT**, **DB_NAME** and **PORT**.

If it is necessary to download the dependencies, run the command
```sh
npm install
```
Finally run the following command

```sh
npm start
```


## Completed Tasks

### Models:
- Car
- Detour
- Driver
- Enterprise
- FinanceDriver
- FinanceEnterprice
- Parking
- Reserve
- SilverCar
- Stop
- Toll
- TollMap
- Trip
- User

### Relations:
- Enterprise - User
- Reserve - User - Driver - Enterprise
- Reserve - Trip
- Car - Driver

### routers & services:
- Car
- Driver
- Enterprise
- Reserve
- SilverCar
- Trip
- User

### Bulks:
- Car
- Driver
- Enterprise
- Reserve
- SilverCar
- User

### Installed dependencies
- axios
- body-parser
- cookie-parser
- dotenv
- express
- express-oauth2-jwt-bearer
- morgan
- pg
- pg-hstore
- sequelize
- nodemon (dev dependencie)