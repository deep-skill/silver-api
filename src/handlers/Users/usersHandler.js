const getUsersController = require("../../controllers/User/getUsersController.js");
const postUserController = require("../../controllers/User/postUserController.js");
const getUserByIdController = require("../../controllers/User/getUserByIdController.js");
const statusUserDataController = require("../../controllers/User/statusUserDataController.js");
const putUserDataController = require("../../controllers/User/putUserDataController.js");

const getUsersHandler = async (req, res) => {
    try {
        const users = await getUsersController();

        return res.status(200).json(users);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const postUserHandler = async (req, res) => {
    const {name, email, phone, address, license} = req.body;
    try {
        const newUser = await postUserController(name, email, phone, address, license);
        return res.status(200).json(newUser);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const getUserByIdHandler = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) throw new Error("Missing data");
        const user = await getUserByIdController(id);
        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const putUserDataHandler = async (req, res) => {
    const { id, phone, address, license } = req.body;

    try {
        if (!id)
        throw new Error("Missing data");
        
        const userUpdate = await putUserDataController(
            id,
            phone,
            address,
            license,
            );
        return res.status(200).json(userUpdate);

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

module.exports = {
    getUsersHandler,
    postUserHandler,
    getUserByIdHandler,
    putStatusUserHandler,
    putUserDataHandler,
};
