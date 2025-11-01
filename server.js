// server.js
const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Servir os arquivos da mesma pasta (HTML, CSS, JS)
app.use(express.static(__dirname));

// Caminho do arquivo de "banco de dados"
const DB_FILE = "banco.json";

// Rota para salvar os dados do pagamento
app.post("/salvar", (req, res) => {
  const novoPagamento = req.body;

  let banco = [];
  if (fs.existsSync(DB_FILE)) {
    banco = JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
  }

  banco.push(novoPagamento);
  fs.writeFileSync(DB_FILE, JSON.stringify(banco, null, 2));

  res.json({ mensagem: "Pagamento salvo com sucesso!" });
});

// Iniciar servidor
app.listen(3000, () => {
  console.log("🚀 Servidor rodando em: http://localhost:3000");
});