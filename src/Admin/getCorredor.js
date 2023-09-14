const { Crearcorredor } = require("../db");
const getCorredor = async (req, res) => {
  try {
    const corredor = await Crearcorredor.findAll();
    return res.status(200).json(corredor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  getCorredor,
};

