const { DataTypes } = require('sequelize')

// Create & export Rol model
module.exports = (sequelize) => {
  sequelize.define('Rol', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.ENUM,
      values: ['admin', 'user', 'driver'],
      allowNull: false
    }
  }, { timestamps: false })
}