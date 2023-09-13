const {Router} = require("express")
const {postapuestaWin} = require("../Apuestas/crearapuestaWin")
const {postapuestaExacta} = require ("../Apuestas/crearapuestaExacta")
const { postapuestaTrifecta} = require("../Apuestas/crearapuestaTrifecta")
const {postapuestaSuperfecta } = require("../Apuestas/crearapuestaSuperfecta")

const usersRouter = Router();
usersRouter.post("/win", postapuestaWin) 
usersRouter.post("/exacta", postapuestaExacta) 
usersRouter.post("/trifecta", postapuestaTrifecta) 
usersRouter.post("/superfecta", postapuestaSuperfecta) 
module.exports = usersRouter;