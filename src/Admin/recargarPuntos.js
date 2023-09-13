
const { Recargarpuntos, User } = require("../db");

const postPuntos = async (req, res) => {

  const { cantidad, precio, UserId, username, id} = req.body;
  const usernameAdmin = username;

  try {
    // Busca al usuario por su ID
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Crea un nuevo registro de Recargarpuntos
    const puntos = await Recargarpuntos.create({ cantidad, precio, usernameAdmin, UserId});

    // Calcula la suma de cantidades para el usuario y actualiza 'cantidadtotal'
    const totalCantidad = await Recargarpuntos.sum('cantidad', {
     
      where: { UserId },
    });

    // Actualiza 'cantidadtotal' en el registro actual y en otros registros del mismo usuario
    await  User.update({ cantidadtotal: totalCantidad }, {
      where: { id },
    });

    return res.status(200).json(puntos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  postPuntos,
};
