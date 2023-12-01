const { Router } = require("express");
const { requiredScopes } = require('express-oauth2-jwt-bearer');
const jwtCheck = require('../../jwtCheck');
const EnterpriseService = require('../service/EnterpriseService');

const getAll = async (req, res) => {
  try {
    const enterprises = await EnterpriseService.getAll();
    return res.status(200).json(enterprises);
    } catch (error) {
      return res.status(400).json({ error: error.message });
  }
};

const get = async (req, res) => {
  const {id} = req.params;
  try {
    if (!id) throw new Error("Missing data");
    const enterprise = await EnterpriseService.get(id);
    return res.status(200).json(enterprise);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const create = async (req, res) => {
  const {
    ruc,
    name,
    address,
  } = req.body;
  try {
    const enterprise = await EnterpriseService.create(
      ruc,
      name,
      address,
      );
      return res.status(201).json(enterprise);
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
  };

  const update = async (req, res) => {
    const {id} = req.params;
    const {
      ruc,
      name,
      address,
    } = req.body;
    try {
      if (!id) throw new Error("Missing data");
      const updatedEnterprise = await EnterpriseService.update(
          id,
          ruc,
          name,
          address,
      );
      return res.status(200).json(updatedEnterprise);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };

  const erase = async (req, res) => {
    const { id } = req.params;
    try {
      if (!id) throw new Error("Missing data");
      await EnterpriseService.erase(id);
      return res.status(204).json();
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };

  const EnterpriseRouter = Router();

  EnterpriseRouter.get('/', jwtCheck, requiredScopes('admin'), getAll);
  EnterpriseRouter.post('/', jwtCheck, requiredScopes('admin'), create);
  EnterpriseRouter.get('/:id', jwtCheck, requiredScopes('admin'), get);
  EnterpriseRouter.put('/:id', jwtCheck, requiredScopes('admin'), update);
  EnterpriseRouter.delete('/:id', jwtCheck, requiredScopes('admin'), erase);
  
  module.exports = EnterpriseRouter;