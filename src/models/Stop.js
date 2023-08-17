const { DataTypes, UUIDV4 } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('Stop', {
    id: {
      type: DataTypes.UUID,
      primaryKey: UUIDV4,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hours: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    minutes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: false });
};