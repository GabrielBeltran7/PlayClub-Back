const {Router} = require("express")
const { postCorredor} = require("../Corredor/crearCorredor")


const usersRouter = Router();
usersRouter.post("/", postCorredor) 

module.exports = usersRouter;