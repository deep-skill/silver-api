const { Trip } = require("../../database");

const postTripController = async (
    type,
    total,
    start,
    state,
) => {
    const trip = await Trip.create({
        type,
        total,
        start,
        state,
    });

    return {
        created: true,
        tripId: trip.id,
    };
};

module.exports = postTripController;
