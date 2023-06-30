const { Enterprise } = require("../../database");

const getEnterprise = async (req, res) => {
  //Enterprise ruc
  const { ruc } = req.body;

  if (!ruc) throw res.status(400).json({ error: "Missing data" });

  //Get Enterprise data
  try {
    const enterprise = Enterprise.findOne({ where: { ruc } });

    return res.status(200).json({ enterprise });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error,
    });
  }
};

module.exports = getEnterprise;
