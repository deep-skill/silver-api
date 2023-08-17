const { DataTypes, UUIDV4 } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('Detour', {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    observation: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  { timestamps: false });
};