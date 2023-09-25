const { User } = require("../db");
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Configura Nodemailer para enviar correos electrónicos
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Cambia esto según tu proveedor de correo electrónico
  auth: {
    user: 'gabrielbeltranmedina@gmail.com', 
    pass: 'jxqh yrzh ehxx czns', 
  },
});

// Función para generar una nueva contraseña aleatoria
function generarNuevaContrasena() {
  // Puedes personalizar la generación de la contraseña según tus necesidades
  const nuevaContrasena = crypto.randomBytes(8).toString('hex'); // Genera una contraseña aleatoria de 8 caracteres
  return nuevaContrasena;
}

// Función para iniciar el proceso de recuperación de contraseña
async function iniciarRecuperacionContrasena(req, res) {
  const { email } = req.body;

  try {
    // Busca al usuario por su dirección de correo electrónico
    const usuario = await User.findOne({ where: { email } });

    if (!usuario) {
      return res.status(404).json({ success: false, mensaje: 'Usuario no encontrado' });
    }

    // Genera una nueva contraseña aleatoria
    const nuevaContrasena = generarNuevaContrasena();

    // Actualiza la contraseña en la base de datos
    usuario.password = nuevaContrasena;
    await usuario.save();

    // Envía un correo electrónico con la nueva contraseña
    await transporter.sendMail({
      from: 'gabrielbeltranmedina@gmail.com', // Cambia esto a tu dirección de correo electrónico
      to: email,
      subject: 'Recuperación de contraseña Win123',
      text: `Tu nueva contraseña para ingresar a Win123 es:      ${nuevaContrasena}`,
    });

    return res.status(200).json({ success: true, mensaje: 'Nueva contraseña enviada con éxito' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, mensaje: 'Error interno del servidor' });
  }
}

// Ejemplo de cómo usar la función en una ruta de Express

module.exports = {
  iniciarRecuperacionContrasena
};
