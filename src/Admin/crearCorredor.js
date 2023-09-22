const { Crearcorredor, Crearcarrera } = require("../db");
const postCorredor = async (req, res) => {
  const { nombre, numero, imagen1, descripcion, CrearcarreraId, id } = req.body;
  try {
    const carrera = await Crearcarrera.findByPk(id);

    if (!carrera) {
      return res.status(404).json({ error: "Carrera no encontrado" });
    }

    const nuevocorredor = await Crearcorredor.create({
      nombre,
      numero,
      descripcion,
      imagen1,
      CrearcarreraId,
    });
    return res.status(200).json(nuevocorredor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  postCorredor,
};
