const { Crearcarrera } = require("../db");

const activaroDesactivarCarrera = async (req, res) => {
  const { id, rol } = req.body;

  try {
    // Intenta buscar la carrera por id
    const carrera = await Crearcarrera.findByPk(id); 

    // Verifica si se encontró la carrera
    if (!carrera) {
      return res.status(404).json({ error: "Carrera no encontrada." });
    }

    // Actualiza el estado de la carrera en función de 'rol'
    if (rol === "activarcarrera") {
      carrera.actydescarrera = true;
    } else if (rol === "desactivarcarrera") {
      carrera.actydescarrera = false;
    } 
    
      else if (rol === "activarcarrerayganadores") {
      carrera.actydescarrerayganadores = true;
    } else if (rol === "desactivarcarrerayganadores") {
      carrera.actydescarrerayganadores = false;
    } 

    // Guarda los cambios en la base de datos
    await carrera.save();

    // Si se encontró la carrera, devuelve los datos actualizados
    return res.status(200).json(carrera);
  } catch (error) {
    // Manejo de errores con mensaje descriptivo
    console.error("Error al buscar carrera por id:", error.message);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

module.exports = {
  activaroDesactivarCarrera,
};
