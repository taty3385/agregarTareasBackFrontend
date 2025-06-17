const taskModel = require("../Model/taskModel");

const Taskcontroller = {
  getTasks: (req, res) => {
    const tasks = taskModel.getTasks();
    if (!tasks || tasks === false || tasks.length === 0) {
      return res.status(404).json({ message: "No hay tareas pendientes" });
    }
    res.status(200).json({ message: "Listar tareas", tasks: tasks });
  },
  addTask: (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: "Faltan datos" });
    }
    taskModel.addTask({ title, description });
    res.status(201).json({ message: "Tarea agregada" });
  },

  editTask: (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: "Faltan datos" });
    }
    const updated = taskModel.editTask(parseInt(id), { title, description });
    if (!updated) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    res.status(200).json({ message: "Tarea actualizada" });
  },
  deleteTask: (req, res) => {
    const { id } = req.params;
    const deleted = taskModel.deleteTask(parseInt(id));
    if (!deleted) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    res.status(200).json({ message: "Tarea eliminada" });
  },

  getTaskById:(req ,res)=>{
    const { id } = req.params;
    const task = taskModel.getTaskById(parseInt(id));
    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    res.status(200).json({ message: "Tarea encontrada", task: task });
  }
};

module.exports = Taskcontroller;