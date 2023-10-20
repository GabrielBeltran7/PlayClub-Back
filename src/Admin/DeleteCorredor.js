const { Crearcorredor } = require("../db");

const deleteCorredor = async (req, res) => { 
  const { id} = req.params;


  try {
    const Corredor = await Crearcorredor.destroy({ where: { id } });

    if (Corredor) {
      // El corredor se eliminó correctamente
      return res.status(200).json({ message: `Corredor  eliminado correctamente` });
    } else {
      // No se encontró un corredor con el nombre proporcionado
      return res.status(404).json({ error: `Corredor  no encontrado` });
    }
  } catch (error) {
    // Error interno del servidor
    res.status(500).json({ error: "Error interno del servidor." });
  }
}

module.exports = {
  deleteCorredor
};

