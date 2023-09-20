const server = require("./src/app");
const { conn } = require("./src/db");
const PORT = process.env.PORT || 3001;

<<<<<<< HEAD

server.listen(PORT,  ()=>{
    conn.sync({force: true});
   
    console.log(`Servidors escuchando en el Puerto ${PORT}`);
})
server.get("/", (req, res) =>{
    res.send("servidor de win123")
})

=======
server.listen(PORT, () => {
  conn.sync({ force: true });

  console.log(`Servidors escuchando en el Puerto ${PORT}`);
});
server.get("/", (req, res) => {
  res.send("servidor de win123");
});
>>>>>>> 326ed0b8640d7dd93135b046609d4a0a51a393c7
