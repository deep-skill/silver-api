const { DataTypes, UUIDV4 } = require('sequelize')

// Create & export Role model
module.exports = (sequelize) => {
  sequelize.define('FinanceEnterprice', {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true
    },
    trip_billed_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    trip_payed: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    trip_payed_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
  }, { timestamps: false })
}