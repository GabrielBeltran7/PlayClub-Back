const { Router } = require("express");
const { postUserHandler } = require("../Users/createusers");
const { loginUsers } = require("../Users/loginusers");
const { getUsers, getUserById } = require("../Users/getUsers");
const { getUserByUsername } = require("../Users/getUsersUsernameLogin");
const {
  getCarreraActiva,
  getCarrerarycorredores,
} = require("../Users/getCarreraactiva");
const { getLinkcamaras } = require("../Users/getLinkcamaras");
const { getAllmisApuestas } = require("../Users/getUsersMisApuestas");
const { getCarreraGanadores } = require("../Users/getCarrerayGanadores");
const {iniciarRecuperacionContrasena}= require ("../Users/RecuperarContraseña")
const usersRouter = Router();

usersRouter.post("/", postUserHandler);
usersRouter.post("/login", loginUsers);

usersRouter.post("/recuperarpassword", iniciarRecuperacionContrasena);

usersRouter.get("/linkcamaras", getLinkcamaras);
usersRouter.get("/", getUsers);
usersRouter.get("/:id", getUserById);
usersRouter.get("/getUserByUsername/:username", getUserByUsername);
usersRouter.get("/carreraactiva/:nombrecarrera", getCarreraActiva);
usersRouter.get("/getmisapuestas/:username", getAllmisApuestas);
usersRouter.get("/carreraycorredores/:nombrecarrera", getCarrerarycorredores);
usersRouter.get("/ganadores/:nombrecarrera", getCarreraGanadores);

module.exports = usersRouter;
