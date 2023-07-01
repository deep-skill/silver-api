const { Router } = require("express");

const {
    getUsersHandler,
    getUserDataHandler,
    putStatusUserHandler,
    putUserDataHandler
} = require("../../handlers/Users/usersHandler");

const userRouters = Router();

userRouters.put("/update", putUserDataHandler);
userRouters.put("/status", putStatusUserHandler);
userRouters.get("/", getUsersHandler);
userRouters.get("/:id", getUserDataHandler);

module.exports = userRouters;
