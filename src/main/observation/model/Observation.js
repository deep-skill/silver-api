const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('Observation', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    observation: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  { timestamps: false });
};