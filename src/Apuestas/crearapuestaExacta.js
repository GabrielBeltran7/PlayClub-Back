const { PuntosapostadosExacta,Crearcorredor, User } = require("../db");

const postapuestaExacta = async (req, res) => {
  const {
    id,
    puntosganados,
    puntosapostados,
    nombreapuesta,
    username,
    iDprimerPuesto,
    iDsegundoPuesto
   
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

    
    // Guardar los cambios en la base de datos del usuario
    await usuario.save();
    const namecorreodor1 = await Crearcorredor.findByPk(iDprimerPuesto);
    const namecorreodor2 = await Crearcorredor.findByPk(iDsegundoPuesto);
    // Crear el registro de PuntosapostadosExacta
    const exacta = await PuntosapostadosExacta.create({
      nombreapuesta,
      puesto1:namecorreodor1.nombre,
      puesto2:namecorreodor2.nombre,
      username,
      iDprimerPuesto,
      iDsegundoPuesto,
      puntosapostados: puntosapostadosNumeric, // Utilizamos el valor convertido
      puntosganados,
    });

    return res.status(200).json(exacta);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  postapuestaExacta,
};

