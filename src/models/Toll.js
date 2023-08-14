const { DataTypes, UUIDV4 } = require('sequelize')

// Create & export Role model
module.exports = (sequelize) => {
  sequelize.define('Toll', {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true
    },
  },
  { timestamps: false });
};