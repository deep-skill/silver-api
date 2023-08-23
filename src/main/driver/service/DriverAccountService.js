const {DriverAccount} = require("../../database");

const getAll = async () => {
  return DriverAccount.findAll();
};

const get = async (id) => {
  return DriverAccount.findOne({ where: { id } });
};

const create = async (
  bankName,
  bankAccountType,
  bankAccount,
  cci,
) => {
  return await DriverAccount.create({
    bankName,
    bankAccountType,
    bankAccount,
    cci,
  });
};

const update = async (
  id,
  bankName,
  bankAccountType,
  bankAccount,
  cci,
) => {
  const driverAccount = await DriverAccount.findOne({ where: { id } });
  if(!driverAccount) throw new Error("Driver not exist");

  bankName ? (driverAccount.bankName = bankName) : null;
  bankAccountType ? (driverAccount.bankAccountType = bankAccountType) : null;
  bankAccount ? (driverAccount.bankAccount = bankAccount) : null;
  cci ? (driverAccount.cci = cci) : null;
  
  await driverAccount.save();

  return driverAccount;
};

const erase = async (id) => {
  const driverAccount = await DriverAccount.findOne({ where: { id } });
  await driverAccount.destroy();
  return {
    deleted: true,
  };
};

module.exports = {getAll, get, create, erase, update};