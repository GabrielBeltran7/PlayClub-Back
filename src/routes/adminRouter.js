const { Router } = require("express");
const { postCorredor } = require("../Admin/crearCorredor");
const {
  postPuntosSubadminaUsuario,
} = require("../Admin/recargarPuntosSubadminaUsuario");
const { postCarrera } = require("../Admin/crearCarrera");
const { getCorredor } = require("../Admin/getCorredor");
const { getCarrera } = require("../Admin/getCarrera");
const { rolUsers } = require("../Admin/rolUsersUpdate");
const { postLinkcamaras } = require("../Admin/crearLinkcarrera");
const { cargarPuntosAlAdmin } = require("../Admin/cargarPuntosaAdmin");
const {postPuntosAdminaSubadmin} = require("../Admin/recargarPuntosAdminaSubadmin");
const { agregarPuntosAUsuarios } = require("../Admin/crearBonosaUsuarios");
const { postCarrerayGanadores } = require("../Admin/postCarrerayGanadores");
const {activaroDesactivarCarrera} = require("../Admin/activarodesactivarCarrera")
const {updatePuntosUsuario} =  require ("../Admin/CobrarPuntosUsuario")
const {getPuntosPagados} = require ("../Admin/getPuntosPagados")

const {getRecargarPuntos} = require("../Admin/getRecargarPuntos")
const {deleteCorredor} = require("../Admin/DeleteCorredor")



const usersRouter = Router();
usersRouter.post("/postlinkcamaras", postLinkcamaras);
usersRouter.post("/corredor", postCorredor);
usersRouter.post("/cargarpuntosaadministrador", cargarPuntosAlAdmin);
usersRouter.post("/postpuntosadminasubadmin", postPuntosAdminaSubadmin);
usersRouter.post("/postpuntossubadminausuario", postPuntosSubadminaUsuario);
usersRouter.post("/carrera", postCarrera);
usersRouter.post("/agregarpuntosausuarios", agregarPuntosAUsuarios);
usersRouter.get("/corredor", getCorredor);
usersRouter.get("/carrera", getCarrera);
usersRouter.get("/getrecargarpuntos", getRecargarPuntos);
usersRouter.get("/getpuntospagados", getPuntosPagados)
usersRouter.patch("/roluser", rolUsers);
usersRouter.patch("/activarodesactivarcarrera", activaroDesactivarCarrera);
usersRouter.patch("/cobrarpuntosusuario", updatePuntosUsuario);
usersRouter.post("/carrerayganadores", postCarrerayGanadores);
usersRouter.delete("/deletecorredor/:id", deleteCorredor);

module.exports = usersRouter;
