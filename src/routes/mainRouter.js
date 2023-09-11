const {Router} = require("express")
const usersRouter = require("./usersRouter")
const corredorRouter  = require("./corredorRouter")
const mainRouter= Router();

mainRouter.use("/users", usersRouter)
mainRouter.use("/corredor", corredorRouter)


module.exports = mainRouter