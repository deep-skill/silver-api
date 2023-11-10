const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('Stop', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  { timestamps: false });
};