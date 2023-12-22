const { DataTypes} = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('Driver', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      field: 'last_name',
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
    licenseNumber: {
      type: DataTypes.STRING,
      field: 'license_number',
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING,
      field: 'phone_number',
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    rating: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    doneTrips: {
      type: DataTypes.INTEGER,
      field: 'done_trips',
      defaultValue: 0
    },
  }
  );
};