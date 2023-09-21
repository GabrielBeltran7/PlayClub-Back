const {Router} = require("express")
const { postCorredor} = require("../Admin/crearCorredor")
const {postPuntosSubadminaUsuario} = require("../Admin/recargarPuntosSubadminaUsuario")
const {postCarrera} =require("../Admin/crearCarrera")
const {getCorredor} = require("../Admin/getCorredor")
const {getCarrera} = require ("../Admin/getCarrera")
const {rolUsers} = require ("../Admin/rolUsersUpdate")
const {postLinkcamaras} = require("../Admin/crearLinkcarrera")
const {updateLinkcamaras} = require ("../Admin/updateLinkCamaras")
const {postPuntosAdminaSubadmin} =require("../Admin/recargarPuntosAdminaSubadmin")
const {agregarPuntosAUsuarios} =require("../Admin/crearBonosaUsuarios")


const usersRouter = Router();
usersRouter.post("/postlinkcamaras", postLinkcamaras) 
usersRouter.post("/corredor", postCorredor) 
usersRouter.post("/postpuntossubadminausuario", postPuntosSubadminaUsuario) 
usersRouter.post("/postpuntosadminasubadmin", postPuntosAdminaSubadmin) 
usersRouter.post("/carrera", postCarrera) 
 usersRouter.post("/agregar-puntos-a-usuarios", agregarPuntosAUsuarios) 
usersRouter.get("/corredor", getCorredor) 
usersRouter.get("/carrera", getCarrera) 
usersRouter.patch("/roluser", rolUsers) 
usersRouter.patch("/updatelinkcamaras", updateLinkcamaras) 


module.exports = usersRouter;   