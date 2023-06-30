const { DataTypes, UUIDV4 } = require('sequelize')

// Create & export User model
module.exports = (sequelize) => {
  sequelize.define('User', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    license: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rating: {
      type: DataTypes.DECIMAL(2,1),
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM,
      values: [0, 1, 2], // 0: Deleted | 1: Active | 2: Inactive
      allowNull: false,
      defaultValue: 1
    },
  }, { timestamps: false })
}