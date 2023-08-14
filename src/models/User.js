const { DataTypes, UUIDV4 } = require('sequelize')

// Create & export User model
module.exports = (sequelize) => {
  sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
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
    rating: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      defaultValue:[]
    },
  },
  { timestamps: false });
};