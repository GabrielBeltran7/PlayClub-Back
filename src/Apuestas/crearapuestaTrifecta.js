const { PuntosapostadosTrifecta, User } = require("../db");

const postapuestaTrifecta = async (req, res) => {
  const {
    id,
    puntosganados,
    puntosapostados,
    nombreapuesta,
    puesto1,
    puesto2,
    puesto3,
    username,
  } = req.body;

  try {
    // Buscar el registro de usuario correspondiente al ID proporcionado
    const usuario = await User.findOne({
      where: { id: id },
    });
    if (!usuario) {
      return res
        .status(404)
        .json({ error: "No se encontró el usuario con el ID proporcionado." });
    }

    // Restar los puntos apostados de cantidadtotal en el usuario
    if (usuario.cantidadtotal < puntosapostados) {
      return res
        .status(404)
        .json({ error: "No tiene Puntos Suficientes para  la apuesta" });
    } else {
      usuario.cantidadtotal -= puntosapostados;
    }

    // Guardar los cambios en la base de datos
    await usuario.save();

    // Crear el registro de PuntosapostadosWin
    const exacta = await PuntosapostadosTrifecta.create({
      nombreapuesta,
      username,
      puesto1,
      puesto2,
      puesto3,
      puntosapostados,
      puntosganados,
    });

    return res.status(200).json(exacta);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  postapuestaTrifecta,
};
