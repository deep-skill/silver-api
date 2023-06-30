const { DataTypes, UUIDV4 } = require('sequelize')

// Create & export Enterprise model
module.exports = (sequelize) => {
  sequelize.define('Enterprise', {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true
    },
    ruc: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM,
      values: [0, 1, 2], // 0: Deleted | 1: Active | 2: Inactive
      allowNull: false,
      defaultValue: 1
    },
  })
}