const { DataTypes, UUIDV4 } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('Reserve', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    trip_type: {
      type: DataTypes.ENUM,
      values: ['enterprise', 'personal'],
      allowNull: false
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    start_address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    end_address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    driver_percent: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  },
  { timestamps: false });
};