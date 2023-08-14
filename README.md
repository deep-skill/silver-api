![Silver App Logo](/src/assets/images/silver-logo_white_font-color.png "Silver App Logo")
# Silver Express API

Silver Express is a taxicab company.

## Run the project

To run the project:

```sh
npm start
```

## Completed Tasks

### Models: 
- Detour
- Driver
- Enterprise
- FinanceDriver
- FinanceEnterprice
- Parking
- Reserve
- Stop
- Toll
- TollMap
- Trip
- User

### Relations:
- Enterprise - User
- Reserve - User - Driver - Enterprise

### Handlers & Controllers:
- Enterprise
- User

### Routes:
- Enterprise
- User
- Driver
- Reserve

### Bulks:
- Enterprise
- User
- Driver

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