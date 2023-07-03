const { Trip } = require("../../database");

const getTripController = async (id) => {
    const trip = Trip.findOne({ where: { id } });

    return trip;
};

module.exports = getTripController;
