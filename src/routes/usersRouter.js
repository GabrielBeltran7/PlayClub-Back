const { Router } = require("express");
const { postUserHandler } = require("../Users/createusers");
const { loginUsers } = require("../Users/loginusers");
const { getUsers, getUserById } = require("../Users/getUsers");
const {getUserByUsername} = require ("../Users/getUsersUsernameLogin")

const usersRouter = Router();
usersRouter.post("/", postUserHandler);
usersRouter.post("/login", loginUsers);
usersRouter.get("/", getUsers);
usersRouter.get("/:id", getUserById);
usersRouter.get("/getUserByUsername/:username", getUserByUsername);

module.exports = usersRouter;
