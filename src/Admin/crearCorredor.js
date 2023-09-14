const { Crearcorredor } = require("../db");
const postCorredor = async (req, res) => {
  const { nombre, numero, imagen1,imagen2, imagen3, descripcion } = req.body;
  try {
    const nuevocorredor = await Crearcorredor.create({
      nombre,
      numero,
      descripcion,
      imagen1,
      imagen2,
      imagen3,
    });
    return res.status(200).json(nuevocorredor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  postCorredor,
};
