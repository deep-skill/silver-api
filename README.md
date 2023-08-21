![Silver App Logo](/src/assets/images/silver-logo_white_font-color.png "Silver App Logo")
# Silver Express API

Silver Express is a taxicab company.

## Run the project

To run the project:

First open the terminal and start the project in docker with the following command line.

```sh
docker run --rm --name silver-postgres -e POSTGRES_PASSWORD=123456 -d -p 5431:5432 postgres
```

Then create the "silver" database in SQL.

```sh
create database silver;
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