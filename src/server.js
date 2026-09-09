require("dotenv").config();
const express = require("express");
const cors = require("cors");
const profile = require("./data/cristian.json");
const chatRouter = require("./routes/chat");

const app = express();
const PORT = process.env.PORT || 3000;

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// RUTAS
app.use("/api/chat", chatRouter);

// Endpoint GET: /
app.get("/", (req, res) => {
  res.json({ message: "Backend del portafolio funcionando correctamente" });
});

// Endpoint GET: /api/profile
app.get("/api/profile", (req, res) => {
  res.json(profile);
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
