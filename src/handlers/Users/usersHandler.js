const getUsersControllers = require("../../controllers/User/getUsersController.js");
const getUserDataController = require("../../controllers/User/getUserDataController.js");
const statusUserDataController = require("../../controllers/User/statusUserDataController.js");
const putUserDataController = require("../../controllers/User/putUserDataController.js");

const getUsersHandler = async (req, res) => {
    try {
        const users = await getUsersControllers();

        return res.status(200).json(users);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const getUserDataHandler = async (req, res) => {
    const { id } = req.params;

    try {
        if (!id) throw new Error("Missing data");

        const user = await getUserDataController(id);

        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const putStatusUserHandler = async (req, res) => {
    const { email, status } = req.body;

    try {
        if (!status || !email) throw new Error("Missing data");

        const userStatus = await statusUserDataController(email, status);

        return res.status(200).json(userStatus);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const putUserDataHandler = async (req, res) => {
    const { id, phone, address, license, rating } = req.body;

    try {
        if (!id || !phone || !address || !license || !rating)
            throw new Error("Missing data");

        const userUpdate = await putUserDataController(
            id,
            phone,
            address,
            license,
            rating
        );

        return res.status(200).json(userUpdate);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getUsersHandler,
    getUserDataHandler,
    putStatusUserHandler,
    putUserDataHandler,
};
