const { Router } = require("express");

const getUsersController = require("../../../services/User/getUsersController");
const postUserController = require("../../../services/User/postUserController.js");
const getUserByIdController = require("../../../services/User/getUserByIdController.js");
const putUserController = require("../../../services/User/putUserController.js");
const deleteUserController = require("../../../services/User/deleteUserController.js");

const getUsersHandler = async (req, res) => {
  try {
    const users = await getUsersController();
    return res.status(200).json(users);
    } catch (error) {
      return res.status(400).json({ error: error.message });
  }
};
const postUserHandler = async (req, res) => {
  const {
    role,
    name,
    last_name,
    dni,
    ruc,
    phone_number,
    email,
    address,
    rating,
    enterprise_ruc
    } = req.body;
    try {
      const newUser = await postUserController(
        role,
        name,
        last_name,
        dni,
        ruc,
        phone_number,
        email,
        address,
        rating,
        enterprise_ruc
        );
      return res.status(201).json({created: newUser.created});
      } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const getUserByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) throw new Error("Missing data");
    const user = await getUserByIdController(id);
    return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
  }
};

const putUserHandler = async (req, res) => {
  const {
    id,
    role,
    name,
    last_name,
    dni,
    ruc,
    phone_number,
    email,
    address,
    rating,
    enterprise_ruc
  } = req.body;
  try {
    if (!id) throw new Error("Missing data");
    const userUpdate = await putUserController(
      id,
      role,
      name,
      last_name,
      dni,
      ruc,
      phone_number,
      email,
      address,
      rating,
      enterprise_ruc,
      );
    return res.status(200).json(userUpdate);
    } catch (error) {
      return res.status(400).json({ error: error.message });
  }
};

const deleteUserHandler = async (req, res) => {
  const { id } = req.body;
  try {
    if (!id) throw new Error("Missing data");
    const deletedUser = await deleteUserController(id);
    return res.status(200).json(deletedUser);
    } catch (error) {
      return res.status(400).json({ error: error.message });
  }
};

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