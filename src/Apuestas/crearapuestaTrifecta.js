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

  // Convertir puntosapostados a un número entero utilizando parseInt
  const puntosapostadosNumeric = parseInt(puntosapostados, 10);

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
    if (usuario.cantidadtotal < puntosapostadosNumeric) {
      return res
        .status(404)
        .json({ error: "No tiene Puntos Suficientes para la apuesta" });
    } else {
      usuario.cantidadtotal -= puntosapostadosNumeric;
    }

    // Si el username es igual a "Admin," buscar al usuario "Admin" y sumar los puntos apostados
    
      const adminUsuario = await User.findOne({
        where: { username: "Admin" },
      });
      if (adminUsuario) {
        adminUsuario.cantidadtotal += puntosapostadosNumeric;
        await adminUsuario.save();
      }
    

    // Guardar los cambios en la base de datos del usuario
    await usuario.save();

    // Crear el registro de PuntosapostadosExacta
    const trifecta = await PuntosapostadosTrifecta.create({
      nombreapuesta,
      puesto1,
      puesto2,
      puesto3,
      username,
      puntosapostados: puntosapostadosNumeric, // Utilizamos el valor convertido
      puntosganados,
    });

    return res.status(200).json(trifecta);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  postapuestaTrifecta,
};




