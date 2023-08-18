const { Router } = require("express");
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
    console.log(id);
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

  /* EnterpriseRouters.get("/", jwtCheck, getEnterpriseHandler); */
  EnterpriseRouter.get('/',  getAll);
  EnterpriseRouter.post('/', create);
  EnterpriseRouter.get('/:id', get);
  EnterpriseRouter.put('/:id', update);
  EnterpriseRouter.delete('/:id', erase);
  
  module.exports = EnterpriseRouter;