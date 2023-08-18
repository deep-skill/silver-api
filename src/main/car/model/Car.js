const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('Car', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    licensePlate: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'license_plate',
      unique: true
    },
    owner: {
      type: DataTypes.ENUM,
      values: ['SELF', 'OTHER'],
      allowNull: false
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM,
      values: ['SUV', 'CUV', 'MINIVAN', 'VAN', 'SEDAN', 'PICKUP', 'COUPE', 'HATCHBACK', 'MICRO'],
      allowNull: false
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
};