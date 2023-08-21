const { DataTypes} = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('DriverAccount', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    bankName: {
      type: DataTypes.STRING,
      field: 'bank_name',
      allowNull: false
    },
    bankAccountType: {
      type: DataTypes.STRING,
      field: 'bank_account_type',
      allowNull: false
    },
    bankAccount: {
      type: DataTypes.STRING,
      field: 'bank_account',
      allowNull: false
    },
    cci: {
      type: DataTypes.STRING,
      field: 'cci',
      allowNull: false
    },
  },
  { timestamps: false });
};