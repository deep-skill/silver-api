const { DataTypes, UUIDV4 } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('Trip', {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true
    },
    total_price: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    on_way_driver: {
      type: DataTypes.DATE,
      allowNull: false
    },
    arrived_driver: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM,
      values: ['completed', 'canceled', 'inProgress'],
      defaultValue: 'inProgress'
    },
    driver_rating: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    passenger_rating: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
  },
  { timestamps: false });
};