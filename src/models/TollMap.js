const { DataTypes, UUIDV4 } = require('sequelize')

// Create & export Role model
module.exports = (sequelize) => {
  sequelize.define('TollMap', {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
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
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  { timestamps: false });
};