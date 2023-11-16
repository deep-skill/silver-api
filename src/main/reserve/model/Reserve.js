const { DataTypes} = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('Reserve', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    tripType: {
      type: DataTypes.ENUM,
      values: ['PUNTO A PUNTO', 'POR HORA'],
      field: 'trip_type',
      allowNull: false
    },
    serviceType: {
      type: DataTypes.ENUM,
      values: ['ENTERPRISE', 'PERSONAL'],
      field: 'service_type',
      allowNull: false
    },
    startTime: {
      type: DataTypes.DATE,
      field: 'start_time',
      allowNull: false
    },
    startAddress: {
      type: DataTypes.STRING,
      field: 'start_address',
      allowNull: false
    },
    endAddress: {
      type: DataTypes.STRING,
      field: 'end_address',
      allowNull: true,
      validate: {
        checkPuntoAPunto() {
          if (this.tripType == 'PUNTO A PUNTO' && this.endAddress == null) {
            throw new Error('End address must be defined');
          }
        }
      }
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    driverPercent: {
      type: DataTypes.INTEGER,
      field: 'driver_percent',
      allowNull: true
    },
    silverPercent: {
      type: DataTypes.INTEGER,
      field: 'silver_percent',
      defaultValue: 20,
    },
  },
  );
};