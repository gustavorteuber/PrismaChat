const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const fs = require("fs");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const usersFilePath = "usuarios.json";

// Função para ler usuários do arquivo
function getUsers() {
  const usersData = fs.readFileSync(usersFilePath);
  const users = JSON.parse(usersData);
  return users;
}

// Função para escrever usuários no arquivo
function saveUsers(users) {
  const data = JSON.stringify(users);
  fs.writeFileSync(usersFilePath, data);
}

// Rota de cadastro de usuário
app.post("/signup", (req, res) => {
  const { username, password, name, confirmPassword } = req.body;

  // Verifica se usuário já existe
  const users = getUsers();
  const user = users.find((u) => u.username === username);
  if (user) {
    return res.status(409).send({ message: "Usuário já existe" });
  }

  // Verifica se a senha e a confirmação de senha são iguais
  if (password !== confirmPassword) {
    return res
      .status(400)
      .send({ message: "A senha e a confirmação de senha não coincidem" });
  }

  // Gera hash da senha
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).send({ message: "Erro ao gerar hash da senha" });
    }

    // Cria novo usuário com senha em hash
    const newUser = { username, name, password: hash };

    // Adiciona novo usuário ao array de usuários e salva no arquivo
    users.push(newUser);
    saveUsers(users);

    return res.status(201).send({ message: "Usuário criado com sucesso" });
  });
});

// Rota de login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Busca usuário pelo nome de usuário
  const users = getUsers();
  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(401).send({ message: "Usuário ou senha inválidos" });
  }

  // Compara senha em hash com a senha informada
  bcrypt.compare(password, user.password, (err, result) => {
    if (err || !result) {
      return res.status(401).send({ message: "Usuário ou senha inválidos" });
    }

    // Gera token JWT e retorna para o cliente
    const token = jwt.sign({ username }, "jwtSecretKey", { expiresIn: "1h" });
    return res.status(200).send({ token });
  });
});

let clients = [];

app.post("/connect", (req, res) => {
  const { name } = req.body;
  clients.push(name);
  console.log(`${name} se conectou ao PrismaChat`);
  res.sendStatus(200);
});

app.post("/disconnect", (req, res) => {
  const { name } = req.body;
  clients = clients.filter((client) => client !== name);
  console.log(`${name} se desconectou`);
  res.sendStatus(200);
});

let messages = [];

//função que salva as mensagens enviadas no arquivo mensagens.json
function saveData(data, filePath) {
  const jsonData = JSON.stringify(data);
  fs.writeFileSync(filePath, jsonData);
}

app.post("/message", (req, res) => {
  const { name, message } = req.body;
  messages.push({ name, message });
  console.log(`${name} enviou: ${message}`);
  saveData(messages, "mensagens.json");
  res.sendStatus(200);
});

app.get("/messages", (req, res) => {
  res.send(messages);
});

app.listen(3000, () => {
  console.log("Rodando lisin na 3000");
});
