const { Router } = require("express");
const { requiredScopes } = require('express-oauth2-jwt-bearer');
const jwtCheck = require('../../jwtCheck');
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
    const user = await UserService.create(
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
      return res.status(201).json(user);
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
    return res.status(200).json(updatedUser);
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
const getUserByName = async (req, res) => {
  const { query } = req.query;
    try {
    if (!query) throw new Error("Missing data");
    const users = await UserService.getUserByName(query);
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  } 
};

const UserRouter = Router();

UserRouter.get('/passengers', jwtCheck, requiredScopes('admin'), getUserByName);
UserRouter.get('/', jwtCheck, requiredScopes('admin'), getAll);
UserRouter.get('/:id', jwtCheck, requiredScopes('admin'), get);
UserRouter.post('/', jwtCheck, requiredScopes('admin'), create);
UserRouter.patch('/:id', jwtCheck, requiredScopes('admin'), update);
UserRouter.delete('/:id', jwtCheck, requiredScopes('admin'), erase);

module.exports = UserRouter;