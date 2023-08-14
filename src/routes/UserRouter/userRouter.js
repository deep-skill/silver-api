const { Router } = require("express");

const {
  getUsersHandler,
  postUserHandler,
  getUserByIdHandler,
  putUserHandler,
  deleteUserHandler,
} = require("../../handlers/User/userHandler");

const { auth } = require('express-oauth2-jwt-bearer');
const jwtCheck = auth({
  audience: 'http://localhost:5000',
  issuerBaseURL: 'https://dev-4aecm50nap6pl2q5.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

const userRouter = Router();

/* userRouters.get("/", jwtCheck, getUsersHandler); */
userRouter.get('/',  getUsersHandler);
userRouter.post('/', postUserHandler);
userRouter.get('/:id', getUserByIdHandler);
userRouter.put('/', putUserHandler);
userRouter.delete('/', deleteUserHandler);

module.exports = userRouter;