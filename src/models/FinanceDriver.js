const { DataTypes, UUIDV4 } = require('sequelize')

// Create & export Role model
module.exports = (sequelize) => {
  sequelize.define('FinanceDriver', {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true
    },
    driver_payed: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    driver_payed_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
  },
  { timestamps: false });
};