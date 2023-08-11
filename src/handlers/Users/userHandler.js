const getUsersController = require("../../controllers/User/getUsersController.js");
const postUserController = require("../../controllers/User/postUserController.js");
const getUserByIdController = require("../../controllers/User/getUserByIdController.js");
const putUserController = require("../../controllers/User/putUserController.js");

const getUsersHandler = async (req, res) => {
    try {
        const users = await getUsersController();

        return res.status(200).json(users);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const postUserHandler = async (req, res) => {
    const {
        role,
        name,
        last_name,
        dni,
        ruc,
        phone_number,
        email,
        address,
        license,
        rating,
        enterprise_ruc
    } = req.body;
    try {
        const newUser = await postUserController(
            role,
            name,
            last_name,
            dni,
            ruc,
            phone_number,
            email,
            address,
            license,
            rating,
            enterprise_ruc
            );
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

const putUserHandler = async (req, res) => {
    const {
        id,
        role,
        name,
        last_name,
        dni,
        ruc,
        phone_number,
        email,
        address,
        license,
        rating,
        enterprise_ruc
    } = req.body;

    try {
        if (!id)
        throw new Error("Missing data");
        
        const userUpdate = await putUserController(
            id,
            role,
            name,
            last_name,
            dni,
            ruc,
            phone_number,
            email,
            address,
            license,
            rating,
            enterprise_ruc
            );
        return res.status(200).json(userUpdate);

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
    
module.exports = {
    getUsersHandler,
    postUserHandler,
    getUserByIdHandler,
    putUserHandler,
};
