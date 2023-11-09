const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('Parking', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  { timestamps: false });
};