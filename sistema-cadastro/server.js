const express = require("express")
const app = express()
const usuarios = []
let proximoId = 1
app.use(express.json())
const port = 3000

app.get("/", (req, res) => {
  res.send("Olá. O meu primeiro servidor com express funcionou.")
})

app.get("/usuarios", (req, res) => {
  res.json(usuarios)
})

app.get("/usuarios/:id", (req, res) => {
  const id = Number(req.params.id)

  const usuario = usuarios.find((usuario) => usuario.id === id)

  if (!usuario) {
    return res.status(404).json({
      mensagem: "Usuário não encontrado",
    })
  }

  res.json(usuario)
})

app.post("/usuarios", (req, res) => {
  const novoUsuario = req.body

  const usuario = {
    id: proximoId,
    nome: novoUsuario.nome,
    email: novoUsuario.email,
  }

  usuarios.push(usuario)

  proximoId++

  return res.status(201).json({
    mensagem: "Usuário criado com sucesso!",
    usuario: usuario,
  })
})

app.put("/usuarios/:id", (req, res) => {
  const id = Number(req.params.id)

  const usuario = usuarios.find((usuario) => usuario.id === id)

  if (!usuario) {
    return res.status(404).json({
      mensagem: "Usuário não encontrado!",
    })
  }

  usuario.nome = req.body.nome
  usuario.email = req.body.email

  return res.json({
    mensagem: "Usuário atualizado com sucesso!",
    usuario: usuario,
  })
})

app.delete("/usuarios/:id", (req, res) => {

  const id = Number(req.params.id)

  const indice = usuarios.findIndex(usuario => usuario.id === id)

  if (indice === -1) {
    return res.status(404).json({
      mensagem: "Usuário não encontrado!",
    })
  }
  usuarios.splice(indice, 1)

  return res.json({
    mensagem: "Usuário removido com sucesso!",
  })
})

app.listen(port, () => {
  console.log(`Servidor Express rodando em http://localhost:${port}`)
})
