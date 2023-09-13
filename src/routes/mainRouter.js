const {Router} = require("express")
const usersRouter = require("./usersRouter")
const corredorRouter  = require("./adminRouter")
const apuestasRouter = require("./apuestasRouter")
const mainRouter= Router();

mainRouter.use("/users", usersRouter)
mainRouter.use("/admin", corredorRouter)
mainRouter.use("/apuestas", apuestasRouter)


module.exports = mainRouter