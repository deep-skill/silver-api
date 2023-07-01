const postAuthController = require("../../controllers/Auth/authController")

const authHandler = async (req, res) => {
    const { id, name, email } = req.body;

    console.log(name);

    try {
        if (!id || !name || !email) throw new Error("Missing data");

        const created = await postAuthController(id, name, email);

        return res.status(201).json({
            created,
            name,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = authHandler;
