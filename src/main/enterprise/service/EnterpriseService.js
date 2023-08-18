const { Enterprise } = require("../../../database");

const getAll = async () => {
  return Enterprise.findAll();
};

const get = async (id) => {
  return Enterprise.findOne({ where: { id } });
};

const create = async (
  ruc,
  name,
  address,
) => {
  return Enterprise.create({
    ruc,
    name,
    address,
  });
};

const update = async (
  id,
  ruc,
  name,
  address,
) => {
  const enterprise = await Enterprise.findOne({where: {id}});
  ruc ? (enterprise.ruc = ruc) : null;
  name ? (enterprise.name = name) : null;
  address ? (enterprise.address = address) : null;
  await enterprise.save();

  return enterprise;
};

const erase = async (id) => {
  const enterprise = await Enterprise.findOne({where: {id}});
  await enterprise.destroy();
};
  
module.exports = {getAll, get, create, erase, update};
