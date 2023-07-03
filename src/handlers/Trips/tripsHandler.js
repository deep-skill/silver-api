const getTripsController = require("../../controllers/Trip/getTripsController.js");
const getTripController = require("../../controllers/Trip/getTripController.js");
const postTripController = require("../../controllers/Trip/postTripController.js");
const putTripController = require("../../controllers/Trip/putTripController.js");
const statusTripController = require("../../controllers/Trip/statusTripController.js");

const getTripsHandler = async (req, res) => {
    try {
        const trips = await getTripsController();

        return res.status(200).json(trips);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const getTripHandler = async (req, res) => {
    const { id } = req.params;

    try {
        if (!id) throw new Error("Missing data");

        const trip = await getTripController(id);

        return res.status(200).json(trip);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const postTripHandler = async (req, res) => {
    const { type, total, start, end, state, driverRating, userRating } =
        req.body;

    try {
        if (
            !type ||
            !total ||
            !start ||
            !state
        )
            throw res.status(400).json({ error: "Missing data" });

        const tripCreated = await postTripController(
            type,
            total,
            start,
            state,
        );

        return res.status(201).json(tripCreated);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const putTripHandler = async (req, res) => {
    const { id, type, total, start, end, state, driverRating, userRating } =
        req.body;
    try {
        if (!id) throw new Error("Missing data")

        const tripUpdate = await putTripController(
            id,
            type,
            total,
            start,
            end,
            state,
            driverRating,
            userRating
        );

        return res.status(200).json(tripUpdate);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const statusTripHandler = async (req, res) => {
    const { id, status } = req.body;

    try {
        if (!status) throw new Error("Missing data");

        const statusUpdate = await statusTripController(id, status);

        return res.status(200).json(statusUpdate);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getTripsHandler,
    getTripHandler,
    postTripHandler,
    putTripHandler,
    statusTripHandler,
};
