const { DataTypes, UUIDV4 } = require('sequelize')

// Create & export TripAdditionalCharge model
module.exports = (sequelize) => {
  sequelize.define('Stop', {
    id: {
      type: DataTypes.UUID,
      primaryKey: UUIDV4,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  }, { timestamps: false })
}