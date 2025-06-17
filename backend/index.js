const express = require("express");
const taskRouter = require("./routes/taskRouter");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(cors());

const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use(express.static(path.join(__dirname, "frontend")))

app.use("/api/tasks", taskRouter);
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
