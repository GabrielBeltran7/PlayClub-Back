const { Crearlinkcamaras } = require("../db");

const updateLinkcamaras = async (req, res) => {
  const { id, usernameAdmin, camara1, camara2, camara3, camara4, camara5 } = req.body;

  try {
    // Intenta buscar el registro por ID
    let linkcamaras = await Crearlinkcamaras.findByPk(id); // Usamos findByPk para buscar por ID

    // Verifica si se encontró el registro
    if (!linkcamaras) {
      return res.status(404).json({ error: "No se encontraron resultados." });
    }

    // Actualiza solo los atributos proporcionados en el cuerpo de la solicitud
    if (usernameAdmin) {
      linkcamaras.usernameAdmin = usernameAdmin;
    }
    if (camara1) {
      linkcamaras.camara1 = camara1;
    }
    if (camara2) {
      linkcamaras.camara2 = camara2;
    }
    if (camara3) {
      linkcamaras.camara3 = camara3;
    }
    if (camara4) {
      linkcamaras.camara4 = camara4;
    }
    if (camara5) {
      linkcamaras.camara5 = camara5;
    }

    // Guarda los cambios en la base de datos
    await linkcamaras.save();

    // Si se encontró el registro y se actualizó, devuelve los datos actualizados
    return res.status(200).json(linkcamaras);
  } catch (error) {
    // Manejo de errores con mensaje descriptivo
    console.error("Error al actualizar registro:", error.message);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

module.exports = {
  updateLinkcamaras,
};


