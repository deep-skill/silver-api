const { DataTypes} = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    role: {
      type: DataTypes.ENUM,
      values: ['admin', 'manager', 'passenger'],
      allowNull: false
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
      allowNull: true
    },
    ruc: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phoneNumber: {
      type: DataTypes.STRING,
      field: 'phone_number',
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
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
  },
  );
};