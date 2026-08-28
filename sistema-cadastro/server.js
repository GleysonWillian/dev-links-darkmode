const express = require("express")
const app = express()
const usuarios = []
let proximoId = 1
app.use(express.json())
const port = 3000
const supabase = require("./supabase")

app.get("/teste-banco", async (req, res) => {
  const { data, error } = await supabase.from("usuarios").select("*")

  if (error) {
    return res.status(500).json({
      mensagem: "Erro ao consultar banco",
      erro: error.message,
    })
  }

  res.json(data)
})

app.get("/", (req, res) => {
  res.send("Olá. O meu primeiro servidor com express funcionou.")
})

app.get("/usuarios", async (req, res) => {
  const { data, error } = await supabase
  .from("usuarios")
  .select("*")

  if(error){
    return res.status(500).json({
      mensagem: "Erro ao buscar usuários",
      erro: error.message
    })

    return res.json(data)
  }
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

app.post("/usuarios", async (req, res) => {
  const { nome, email } = req.body

  const { data, error } = await supabase
    .from("usuarios")
    .insert([
      {
        nome: nome,
        email: email,
      },
    ])
    .select()

  if (error) {
    return res.status(500).json({
      mensagem: "Erro ao cadastrar usuário",
      erro: error.message,
    })
  }

  return res.status(201).json({
    mensagem: "Usuário criado com sucesso!",
    usuario: data[0],
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
