const { Router } = require("express");
const UserService = require('../service/UserService');

const getAll = async (req, res) => {
  try {
    const users = await UserService.getAll();
    return res.status(200).json(users);
    } catch (error) {
      return res.status(400).json({ error: error.message });
  }
};

const get = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) throw new Error("Missing data");
    const user = await UserService.get(id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const create = async (req, res) => {
  const {
    enterpriseId,
    role,
    name,
    lastName,
    dni,
    ruc,
    phoneNumber,
    email,
    address,
  } = req.body;
  try {
    await UserService.create(
      enterpriseId,
      role,
      name,
      lastName,
      dni,
      ruc,
      phoneNumber,
      email,
      address,
      );
      return res.status(201).json();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const update = async (req, res) => {
  const {id} = req.params;
  const {
    enterpriseId,
    role,
    name,
    lastName,
    dni,
    ruc,
    phoneNumber,
    email,
    address,
  } = req.body;
  try {
    if (!id) throw new Error("Missing data");
    const updatedUser = await UserService.update(
      id,
      enterpriseId,
      role,
      name,
      lastName,
      dni,
      ruc,
      phoneNumber,
      email,
      address,
    );
    return res.status(201).json(updatedUser);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const erase = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) throw new Error("Missing data");
    await UserService.erase(id);
    return res.status(204).json();
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

const UserRouter = Router();

/* driverRouter.get("/", jwtCheck, getDriversHandler); */
UserRouter.get('/', getAll);
UserRouter.post('/', create);
UserRouter.get('/:id', get);
UserRouter.patch('/:id', update);
UserRouter.delete('/:id', erase);

module.exports = UserRouter;