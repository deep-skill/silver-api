const { Trip } = require("../../database");

const statusTripController = async (id, status) => {
    const trip = await Trip.findOne({ where: { id: id } });

    trip.status = status;

    await trip.save();

    return {
        updated: true,
        id,
        status,
    };
};

module.exports = statusTripController;
