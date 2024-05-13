const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('Trip', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    totalPrice: {
      type: DataTypes.DOUBLE,
      field: 'total_price',
      allowNull: true
    },
    onWayDriver: {
      type: DataTypes.DATE,
      field: 'on_way_driver',
      allowNull: false
    },
    arrivedDriver: {
      type: DataTypes.DATE,
      field: 'arrived_driver',
      allowNull: true,
    },
    startTime: {
      type: DataTypes.DATE,
      field: 'start_time',
      allowNull: true,
    },
    endTime: {
      type: DataTypes.DATE,
      field: 'end_time',
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM,
      values: ['COMPLETED', 'CANCELED', 'INPROGRESS'],
      defaultValue: 'INPROGRESS'
    },
    driverRating: {
      type: DataTypes.INTEGER,
      field: 'driver_rating',
      allowNull: true
    },
    passengerRating: {
      type: DataTypes.INTEGER,
      field: 'passenger_rating',
      allowNull: true
    },
    waitingTimeExtra: {
      type: DataTypes.DOUBLE,
      field: 'waiting_time_extra',
      allowNull: true
    },
    tripPolyline: {
      type: DataTypes.TEXT,
      field: 'trip_polyline',
      allowNull: true
    },
    suggestedTotalPrice: {
      type: DataTypes.DOUBLE,
      field: 'suggested_total_price',
      allowNull: true,
    },
    tripDistanceMeters: {
      type: DataTypes.STRING,
      field: 'trip_distance_meters',
      allowNull: true
    }
  },

  );
};