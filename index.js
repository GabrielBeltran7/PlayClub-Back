const server = require ("./src/app")
const  {conn}= require ("./src/db")
const PORT = process.env.PORT || 3001
server.listen(PORT,  ()=>{
    conn.sync({force: true});
    server.get("/", (req, res) =>{
        res.send("servidor de win123")
    })
    console.log(`Servidors escuchando en el Puerto ${PORT}`);
})