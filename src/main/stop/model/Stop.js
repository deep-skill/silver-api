const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Stop",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lat: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      lon: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      arrived: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    { timestamps: false }
  );
};
