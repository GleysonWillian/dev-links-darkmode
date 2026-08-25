const express = require("express")
const app = express()
const usuarios = []
app.use(express.json())
const port = 3000

app.get("/", (req, res) => {
  res.send("Olá. O meu primeiro servidor com express funcionou.")
})

app.get("/usuarios", (req, res)=>{
  res.json(usuarios);
})

app.get("/usuarios/:id", (req, res) => {
  const id = req.params.id

  res.json({
    id: id,
  })
})

app.post("/usuarios", (req, res) => {

  const novoUsuario = req.body

  usuarios.push(novoUsuario)

  console.log(novoUsuario)

  return res.status(201).json({
    mensagem: "Usuário criado com sucesso!",
    usuario: novoUsuario,
  })
})

app.listen(port, () => {
  console.log(`Servidor Express rodando em http://localhost:${port}`)
})
