const { DataTypes, UUIDV4 } = require('sequelize')

// Create & export Role model
module.exports = (sequelize) => {
  sequelize.define('Driver', {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dni: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ruc: {
      type: DataTypes.STRING,
      allowNull: false
    },
    license_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bank_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bank_account_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bank_account: {
      type: DataTypes.STRING,
      allowNull: false
    },
    car_brand: {
      type: DataTypes.STRING,
      allowNull: false
    },
    car_model: {
      type: DataTypes.STRING,
      allowNull: false
    },
    car_year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    rating: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      defaultValue:[]
    },
  },
  { timestamps: false });
};