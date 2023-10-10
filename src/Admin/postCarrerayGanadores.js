const {
  Crearcorredor,
  PuntosapostadosWin,
  PuntosapostadosExacta,
  PuntosapostadosTrifecta,
  PuntosapostadosSuperfecta,
  User,
  Recargarpuntos,
  GanadoresCarrera,
} = require("../db");

const postCarrerayGanadores = async (req, res) => {
  const {
    id,
    username,
    nombreCarrera,
    iDprimerPuesto,
    iDsegundoPuesto,
    iDtercerPuesto,
    iDcuartoPuesto,
  } = req.body;
 
  try {
    const namecorreodor1 = await Crearcorredor.findByPk(iDprimerPuesto);
    const namecorreodor2 = await Crearcorredor.findByPk(iDsegundoPuesto);
    const namecorreodor3 = await Crearcorredor.findByPk(iDtercerPuesto);
    const namecorreodor4 = await Crearcorredor.findByPk(iDcuartoPuesto);
  
    // Crea un nuevo registro con los datos proporcionados
    const crearGanadoresCarrera = await GanadoresCarrera.create({
      username,
      nombreCarrera,
      primerPuesto: namecorreodor1.nombre,
      iDprimerPuesto,
      segundoPuesto: namecorreodor2.nombre,
      iDsegundoPuesto,
      tercerPuesto: namecorreodor3.nombre,
      iDtercerPuesto,
      cuartoPuesto: namecorreodor4.nombre,
      iDcuartoPuesto,
      CrearcarreraId: id,
    });

    // Buscar registros en función de las condiciones

    const resultado = [];
    const apuestawin = await PuntosapostadosWin.findAll({
      where: {
        iDprimerPuesto: crearGanadoresCarrera.iDprimerPuesto,
        nombreapuesta: crearGanadoresCarrera.nombreCarrera,
      },
    });

    const ganadoreswin = apuestawin.map((apuesta) => ({
      id: apuesta.id,
      Username: apuesta.username,
      nombreapuesta: apuesta.nombreapuesta,
      Puesto1: apuesta.puesto1,
      puntosapostados: apuesta.puntosapostados,
      puntosganados: apuesta.puntosganados,
    }));

    // Obtener la lista de usuarios ganadores
    ganadoreswin.map((apuesta) => apuesta.Username);

    // Calcular la suma de puntos apostados y ganados por usuario
    const sumaPuntosPorUsuario = {};
    ganadoreswin.forEach((apuesta) => {
      const { Username, puntosapostados, puntosganados } = apuesta;
      if (!sumaPuntosPorUsuario[Username]) {
        sumaPuntosPorUsuario[Username] = {
          puntosapostados: 0,
          puntosganados: 0,
        };
      }
      sumaPuntosPorUsuario[Username].puntosapostados += puntosapostados;
      sumaPuntosPorUsuario[Username].puntosganados += puntosganados;
    });

    // Guardar la suma de puntos en la tabla Recargarpuntos

    for (const [Username, puntos] of Object.entries(sumaPuntosPorUsuario)) {
      // Buscar el usuario correspondiente en la tabla User
      const user = await User.findOne({
        where: {
          username: Username,
        },
      });
      if (user) {
        const nuevoRegistro = await Recargarpuntos.create({
          cantidad: puntos.puntosapostados + puntos.puntosganados,
          usernameAdmin: username, // O el usuario que corresponda
          UserId: user.id, // Tomar el ID del usuario de la tabla User
        });
        resultado.push(nuevoRegistro);
      }
    }
    // Actualizar la cantidadtotal del usuario en la tabla User
    for (const [Username, puntos] of Object.entries(sumaPuntosPorUsuario)) {
      const user = await User.findOne({
        where: {
          username: Username,
        },
      });
      if (user) {
        const nuevaCantidadTotal =
          user.cantidadtotal + puntos.puntosapostados + puntos.puntosganados;
        await user.update({ cantidadtotal: nuevaCantidadTotal });
      }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////

    const apuestexacta = await PuntosapostadosExacta.findAll({
      where: {
        iDprimerPuesto: crearGanadoresCarrera.iDprimerPuesto,
        iDsegundoPuesto: crearGanadoresCarrera.iDsegundoPuesto,
        nombreapuesta: crearGanadoresCarrera.nombreCarrera,
      },
    });

    const ganadoresexacta = apuestexacta.map((apuesta) => ({
      id: apuesta.id,
      Username: apuesta.username,
      nombreapuesta: apuesta.nombreapuesta,
      Puesto1: apuesta.puesto1,
      Puesto2: apuesta.puesto2, // Cambié "Puesto1" a "Puesto2" aquí
      puntosapostados: apuesta.puntosapostados,
      puntosganados: apuesta.puntosganados,
    }));

    // Calcular la suma de puntos apostados y ganados por usuario para apuestas exactas
    const sumaPuntosPorUsuarioExacta = {};
    ganadoresexacta.forEach((apuesta) => {
      const { Username, puntosapostados, puntosganados } = apuesta;
      if (!sumaPuntosPorUsuarioExacta[Username]) {
        sumaPuntosPorUsuarioExacta[Username] = {
          puntosapostados: 0,
          puntosganados: 0,
        };
      }
      sumaPuntosPorUsuarioExacta[Username].puntosapostados += puntosapostados;
      sumaPuntosPorUsuarioExacta[Username].puntosganados += puntosganados;
    });

    // Guardar la suma de puntos en la tabla Recargarpuntos para apuestas exactas
    for (const [Username, puntos] of Object.entries(
      sumaPuntosPorUsuarioExacta
    )) {
      // Buscar el usuario correspondiente en la tabla User
      const user = await User.findOne({
        where: {
          username: Username,
        },
      });
      if (user) {
        const nuevoRegistroExacta = await Recargarpuntos.create({
          cantidad: puntos.puntosapostados + puntos.puntosganados,
          usernameAdmin: username, // O el usuario que corresponda
          UserId: user.id, // Tomar el ID del usuario de la tabla User
        });
        resultado.push(nuevoRegistroExacta);

        // Actualizar la cantidadtotal del usuario en la tabla User
        const nuevaCantidadTotal =
          user.cantidadtotal + puntos.puntosapostados + puntos.puntosganados;
        await user.update({ cantidadtotal: nuevaCantidadTotal });
      }
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const apuestatrifecta = await PuntosapostadosTrifecta.findAll({
      where: {
        iDprimerPuesto: crearGanadoresCarrera.iDprimerPuesto,
        iDsegundoPuesto: crearGanadoresCarrera.iDsegundoPuesto,
        iDtercerPuesto: crearGanadoresCarrera.iDtercerPuesto,
        nombreapuesta: crearGanadoresCarrera.nombreCarrera,
      },
    });

    const ganadorestrifecta = apuestatrifecta.map((apuesta) => ({
      id: apuesta.id,
      Username: apuesta.username,
      nombreapuesta: apuesta.nombreapuesta,
      Puesto1: apuesta.puesto1,
      Puesto2: apuesta.puesto2,
      Puesto3: apuesta.puesto3,
      puntosapostados: apuesta.puntosapostados,
      puntosganados: apuesta.puntosganados,
    }));

    // Calcular la suma de puntos apostados y ganados por usuario para apuestas trifecta
    const sumaPuntosPorUsuarioTrifecta = {};
    ganadorestrifecta.forEach((apuesta) => {
      const { Username, puntosapostados, puntosganados } = apuesta;
      if (!sumaPuntosPorUsuarioTrifecta[Username]) {
        sumaPuntosPorUsuarioTrifecta[Username] = {
          puntosapostados: 0,
          puntosganados: 0,
        };
      }
      sumaPuntosPorUsuarioTrifecta[Username].puntosapostados += puntosapostados;
      sumaPuntosPorUsuarioTrifecta[Username].puntosganados += puntosganados;
    });

    // Guardar la suma de puntos en la tabla Recargarpuntos para apuestas trifecta
    for (const [Username, puntos] of Object.entries(
      sumaPuntosPorUsuarioTrifecta
    )) {
      // Buscar el usuario correspondiente en la tabla User
      const user = await User.findOne({
        where: {
          username: Username,
        },
      });
      if (user) {
        const nuevoRegistroTrifecta = await Recargarpuntos.create({
          cantidad: puntos.puntosapostados + puntos.puntosganados,
          usernameAdmin: username, // O el usuario que corresponda
          UserId: user.id, // Tomar el ID del usuario de la tabla User
        });
        resultado.push(nuevoRegistroTrifecta);

        // Actualizar la cantidadtotal del usuario en la tabla User
        const nuevaCantidadTotal =
          user.cantidadtotal + puntos.puntosapostados + puntos.puntosganados;
        await user.update({ cantidadtotal: nuevaCantidadTotal });
      }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const apuestasuperfecta = await PuntosapostadosSuperfecta.findAll({
      where: {
        iDprimerPuesto: crearGanadoresCarrera.iDprimerPuesto,
        iDsegundoPuesto: crearGanadoresCarrera.iDsegundoPuesto,
        iDtercerPuesto: crearGanadoresCarrera.iDtercerPuesto,
        iDcuartoPuesto: crearGanadoresCarrera.iDcuartoPuesto,
        nombreapuesta: crearGanadoresCarrera.nombreCarrera,
      },
    });

    const ganadoressuperfecta = apuestasuperfecta.map((apuesta) => ({
      id: apuesta.id,
      Username: apuesta.username,
      nombreapuesta: apuesta.nombreapuesta,
      Puesto1: apuesta.puesto1,
      Puesto2: apuesta.puesto2,
      Puesto3: apuesta.puesto3,
      Puesto4: apuesta.puesto4,
      puntosapostados: apuesta.puntosapostados,
      puntosganados: apuesta.puntosganados,
    }));

    // Calcular la suma de puntos apostados y ganados por usuario para apuestas superfecta
    const sumaPuntosPorUsuarioSuperfecta = {};
    ganadoressuperfecta.forEach((apuesta) => {
      const { Username, puntosapostados, puntosganados } = apuesta;
      if (!sumaPuntosPorUsuarioSuperfecta[Username]) {
        sumaPuntosPorUsuarioSuperfecta[Username] = {
          puntosapostados: 0,
          puntosganados: 0,
        };
      }
      sumaPuntosPorUsuarioSuperfecta[Username].puntosapostados +=
        puntosapostados;
      sumaPuntosPorUsuarioSuperfecta[Username].puntosganados += puntosganados;
    });

    // Guardar la suma de puntos en la tabla Recargarpuntos para apuestas superfecta
    for (const [Username, puntos] of Object.entries(
      sumaPuntosPorUsuarioSuperfecta
    )) {
      // Buscar el usuario correspondiente en la tabla User
      const user = await User.findOne({
        where: {
          username: Username,
        },
      });
      if (user) {
        const nuevoRegistroSuperfecta = await Recargarpuntos.create({
          cantidad: puntos.puntosapostados + puntos.puntosganados,
          usernameAdmin: username, // O el usuario que corresponda
          UserId: user.id, // Tomar el ID del usuario de la tabla User
        });
        resultado.push(nuevoRegistroSuperfecta);

        // Actualizar la cantidadtotal del usuario en la tabla User
        const nuevaCantidadTotal =
          user.cantidadtotal + puntos.puntosapostados + puntos.puntosganados;
        await user.update({ cantidadtotal: nuevaCantidadTotal });
      }
    }

    // Envía una respuesta exitosa con un código de estado 200
    res.status(200).json(resultado);
  } catch (error) {
    // Envía una respuesta de error con un código de estado 400
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  postCarrerayGanadores,
};

// const { PuntosapostadosWin, PuntosapostadosExacta, PuntosapostadosTrifecta, PuntosapostadosSuperfecta, User, Recargarpuntos, GanadoresCarrera } = require("../db");

// const postCarrerayGanadores = async (req, res) => {
//   const {
//     id,
//     username,
//     nombreCarrera,
//     primerPuesto,
//     iDprimerPuesto,
//     segundoPuesto,
//     iDsegundoPuesto,
//     tercerPuesto,
//     iDtercerPuesto,
//     cuartoPuesto,
//     iDcuartoPuesto,
//   } = req.body;

//   try {
//     // Crea un nuevo registro con los datos proporcionados
//     const crearGanadoresCarrera = await GanadoresCarrera.create({
//       username,
//       nombreCarrera,
//       primerPuesto,
//       iDprimerPuesto,
//       segundoPuesto,
//       iDsegundoPuesto,
//       tercerPuesto,
//       iDtercerPuesto,
//       cuartoPuesto,
//       iDcuartoPuesto,
//       CrearcarreraId: id,
//     });

//     // Buscar registros en función de las condiciones

//     const resultado = [];
//     const apuestawin = await PuntosapostadosWin.findAll({
//       where: {
//         iDprimerPuesto: crearGanadoresCarrera.iDprimerPuesto,
//         nombreapuesta: crearGanadoresCarrera.nombreCarrera,
//       },
//     });

//     const ganadoreswin = apuestawin.map((apuesta) => ({
//       id: apuesta.id,
//       Username: apuesta.username,
//       nombreapuesta: apuesta.nombreapuesta,
//       Puesto1: apuesta.puesto1,
//       puntosapostados: apuesta.puntosapostados,
//       puntosganados: apuesta.puntosganados,
//     }));

//     // Obtener la lista de usuarios ganadores
//      ganadoreswin.map((apuesta) => apuesta.Username);

//     // Calcular la suma de puntos apostados y ganados por usuario
//     const sumaPuntosPorUsuario = {};
//     ganadoreswin.forEach((apuesta) => {
//       const { Username, puntosapostados, puntosganados } = apuesta;
//       if (!sumaPuntosPorUsuario[Username]) {
//         sumaPuntosPorUsuario[Username] = { puntosapostados: 0, puntosganados: 0 };
//       }
//       sumaPuntosPorUsuario[Username].puntosapostados += puntosapostados;
//       sumaPuntosPorUsuario[Username].puntosganados += puntosganados;
//     });

//     // Guardar la suma de puntos en la tabla Recargarpuntos

//     for (const [Username, puntos] of Object.entries(sumaPuntosPorUsuario)) {
//       // Buscar el usuario correspondiente en la tabla User
//       const user = await User.findOne({
//         where: {
//           username: Username,
//         },
//       });
//       if (user) {
//         const nuevoRegistro = await Recargarpuntos.create({
//           cantidad: puntos.puntosapostados + puntos.puntosganados,
//           usernameAdmin: username, // O el usuario que corresponda
//           UserId: user.id, // Tomar el ID del usuario de la tabla User
//         });
//        resultado.push(nuevoRegistro);

//       }
//     }
//     // Actualizar la cantidadtotal del usuario en la tabla User
//     for (const [Username, puntos] of Object.entries(sumaPuntosPorUsuario)) {
//       const user = await User.findOne({
//         where: {
//           username: Username,
//         },
//       });
//       if (user) {
//         const nuevaCantidadTotal = user.cantidadtotal + puntos.puntosapostados + puntos.puntosganados;
//         await user.update({ cantidadtotal: nuevaCantidadTotal });

//       }
//     }

// ////////////////////////////////////////////////////////////////////////////////////////////

//     const apuestexacta = await PuntosapostadosExacta.findAll({
//       where: {
//         iDprimerPuesto: crearGanadoresCarrera.iDprimerPuesto,
//         iDsegundoPuesto: crearGanadoresCarrera.iDsegundoPuesto,
//         nombreapuesta: crearGanadoresCarrera.nombreCarrera,
//       },
//     });

//     const ganadoresexacta = apuestexacta.map((apuesta) => ({
//       id: apuesta.id,
//       Username: apuesta.username,
//       nombreapuesta: apuesta.nombreapuesta,
//       Puesto1: apuesta.puesto1,
//       Puesto2: apuesta.puesto2, // Cambié "Puesto1" a "Puesto2" aquí
//       puntosapostados: apuesta.puntosapostados,
//       puntosganados: apuesta.puntosganados,
//     }));

//     // Calcular la suma de puntos apostados y ganados por usuario para apuestas exactas
//     const sumaPuntosPorUsuarioExacta = {};
//     ganadoresexacta.forEach((apuesta) => {
//       const { Username, puntosapostados, puntosganados } = apuesta;
//       if (!sumaPuntosPorUsuarioExacta[Username]) {
//         sumaPuntosPorUsuarioExacta[Username] = { puntosapostados: 0, puntosganados: 0 };
//       }
//       sumaPuntosPorUsuarioExacta[Username].puntosapostados += puntosapostados;
//       sumaPuntosPorUsuarioExacta[Username].puntosganados += puntosganados;
//     });

//     // Guardar la suma de puntos en la tabla Recargarpuntos para apuestas exactas
//     for (const [Username, puntos] of Object.entries(sumaPuntosPorUsuarioExacta)) {
//       // Buscar el usuario correspondiente en la tabla User
//       const user = await User.findOne({
//         where: {
//           username: Username,
//         },
//       });
//       if (user) {
//         const nuevoRegistroExacta = await Recargarpuntos.create({
//           cantidad: puntos.puntosapostados + puntos.puntosganados,
//           usernameAdmin: username, // O el usuario que corresponda
//           UserId: user.id, // Tomar el ID del usuario de la tabla User
//         });
//         resultado.push(nuevoRegistroExacta);

//         // Actualizar la cantidadtotal del usuario en la tabla User
//         const nuevaCantidadTotal = user.cantidadtotal + puntos.puntosapostados + puntos.puntosganados;
//         await user.update({ cantidadtotal: nuevaCantidadTotal });
//       }
//     }

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const apuestatrifecta = await PuntosapostadosTrifecta.findAll({
//   where: {
//     iDprimerPuesto: crearGanadoresCarrera.iDprimerPuesto,
//     iDsegundoPuesto: crearGanadoresCarrera.iDsegundoPuesto,
//     iDtercerPuesto: crearGanadoresCarrera.iDtercerPuesto,
//     nombreapuesta: crearGanadoresCarrera.nombreCarrera,
//   },
// });

// const ganadorestrifecta = apuestatrifecta.map((apuesta) => ({
//   id: apuesta.id,
//   Username: apuesta.username,
//   nombreapuesta: apuesta.nombreapuesta,
//   Puesto1: apuesta.puesto1,
//   Puesto2: apuesta.puesto2,
//   Puesto3: apuesta.puesto3,
//   puntosapostados: apuesta.puntosapostados,
//   puntosganados: apuesta.puntosganados,
// }));

// // Calcular la suma de puntos apostados y ganados por usuario para apuestas trifecta
// const sumaPuntosPorUsuarioTrifecta = {};
// ganadorestrifecta.forEach((apuesta) => {
//   const { Username, puntosapostados, puntosganados } = apuesta;
//   if (!sumaPuntosPorUsuarioTrifecta[Username]) {
//     sumaPuntosPorUsuarioTrifecta[Username] = { puntosapostados: 0, puntosganados: 0 };
//   }
//   sumaPuntosPorUsuarioTrifecta[Username].puntosapostados += puntosapostados;
//   sumaPuntosPorUsuarioTrifecta[Username].puntosganados += puntosganados;
// });

// // Guardar la suma de puntos en la tabla Recargarpuntos para apuestas trifecta
// for (const [Username, puntos] of Object.entries(sumaPuntosPorUsuarioTrifecta)) {
//   // Buscar el usuario correspondiente en la tabla User
//   const user = await User.findOne({
//     where: {
//       username: Username,
//     },
//   });
//   if (user) {
//     const nuevoRegistroTrifecta = await Recargarpuntos.create({
//       cantidad: puntos.puntosapostados + puntos.puntosganados,
//       usernameAdmin: username, // O el usuario que corresponda
//       UserId: user.id, // Tomar el ID del usuario de la tabla User
//     });
//     resultado.push(nuevoRegistroTrifecta);

//     // Actualizar la cantidadtotal del usuario en la tabla User
//     const nuevaCantidadTotal = user.cantidadtotal + puntos.puntosapostados + puntos.puntosganados;
//     await user.update({ cantidadtotal: nuevaCantidadTotal });
//   }
// }

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const apuestasuperfecta = await PuntosapostadosSuperfecta.findAll({
//   where: {
//     iDprimerPuesto: crearGanadoresCarrera.iDprimerPuesto,
//     iDsegundoPuesto: crearGanadoresCarrera.iDsegundoPuesto,
//     iDtercerPuesto: crearGanadoresCarrera.iDtercerPuesto,
//     iDcuartoPuesto: crearGanadoresCarrera.iDcuartoPuesto,
//     nombreapuesta: crearGanadoresCarrera.nombreCarrera,
//   },
// });

// const ganadoressuperfecta = apuestasuperfecta.map((apuesta) => ({
//   id: apuesta.id,
//   Username: apuesta.username,
//   nombreapuesta: apuesta.nombreapuesta,
//   Puesto1: apuesta.puesto1,
//   Puesto2: apuesta.puesto2,
//   Puesto3: apuesta.puesto3,
//   Puesto4: apuesta.puesto4,
//   puntosapostados: apuesta.puntosapostados,
//   puntosganados: apuesta.puntosganados,
// }));

// // Calcular la suma de puntos apostados y ganados por usuario para apuestas superfecta
// const sumaPuntosPorUsuarioSuperfecta = {};
// ganadoressuperfecta.forEach((apuesta) => {
//   const { Username, puntosapostados, puntosganados } = apuesta;
//   if (!sumaPuntosPorUsuarioSuperfecta[Username]) {
//     sumaPuntosPorUsuarioSuperfecta[Username] = { puntosapostados: 0, puntosganados: 0 };
//   }
//   sumaPuntosPorUsuarioSuperfecta[Username].puntosapostados += puntosapostados;
//   sumaPuntosPorUsuarioSuperfecta[Username].puntosganados += puntosganados;
// });

// // Guardar la suma de puntos en la tabla Recargarpuntos para apuestas superfecta
// for (const [Username, puntos] of Object.entries(sumaPuntosPorUsuarioSuperfecta)) {
//   // Buscar el usuario correspondiente en la tabla User
//   const user = await User.findOne({
//     where: {
//       username: Username,
//     },
//   });
//   if (user) {
//     const nuevoRegistroSuperfecta = await Recargarpuntos.create({
//       cantidad: puntos.puntosapostados + puntos.puntosganados,
//       usernameAdmin: username, // O el usuario que corresponda
//       UserId: user.id, // Tomar el ID del usuario de la tabla User
//     });
//     resultado.push(nuevoRegistroSuperfecta);

//     // Actualizar la cantidadtotal del usuario en la tabla User
//     const nuevaCantidadTotal = user.cantidadtotal + puntos.puntosapostados + puntos.puntosganados;
//     await user.update({ cantidadtotal: nuevaCantidadTotal });
//   }
// }

//     // Envía una respuesta exitosa con un código de estado 200
//     res.status(200).json(resultado);
//   } catch (error) {
//     // Envía una respuesta de error con un código de estado 400
//     res.status(400).json({ error: error.message });
//   }
// };

// module.exports = {
//   postCarrerayGanadores,
// };
