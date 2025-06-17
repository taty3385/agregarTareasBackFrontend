const express = require("express");
const taskRouter = require("./routes/taskRouter");
const cors = require("cors");
const app = express();

app.use(cors());

const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use("/api/tasks", taskRouter);
app.get("/", (req, res) => {
  res.send("Bienvenido a la API de Tareas Pendientes");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
