const {Router} = require("express")
const { postUserHandler} = require("../Users/createusers")
const {loginUsers} = require("../Users/loginusers")
const {getUsers} = require ("../Users/getUsers")

const usersRouter = Router();
usersRouter.post("/", postUserHandler) 
usersRouter.post("/login", loginUsers) 
usersRouter.get("/", getUsers)

module.exports = usersRouter;