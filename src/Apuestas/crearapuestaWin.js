const { PuntosapostadosWin, Crearcorredor, User } = require("../db");

const postapuestaWin = async (req, res) => {
  const {
    id,
    puntosganados,
    nombreapuesta,
    username,
    iDprimerPuesto,
  } = req.body;

  // Convertir puntosapostados a un número entero utilizando parseInt
  const puntosapostados = parseInt(req.body.puntosapostados, 10);

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
        .json({ error: "No tiene Puntos Suficientes para la apuesta" });
    } else {
      usuario.cantidadtotal -= puntosapostados;
    }

    // Guardar los cambios en la base de datos
    await usuario.save();

      const namecorreodor1 = await Crearcorredor.findByPk(iDprimerPuesto);

    const win = await PuntosapostadosWin.create({
      iDprimerPuesto,
      nombreapuesta,
      puesto1:namecorreodor1.nombre,
      username,
      puntosapostados,
      puntosganados,
    });

    return res.status(200).json(win);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  postapuestaWin,
};
