// Model
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../data/tasks.json");

const tasksModel = {
  readTasks: () => {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify([], null, 2));
      return [];
    }
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  },

  writeTasks: (tasks) => {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
  },

  getTasks: () => {
    return tasksModel.readTasks();
  },

  addTask: (task) => {
    const tasks = tasksModel.readTasks();
    const newTask = {
      id: Date.now(),
      title: task.title,
      description: task.description,
    };
    tasks.push(newTask);
    tasksModel.writeTasks(tasks);
  },

  editTask: (id, updatedTask) => {
    const tasks = tasksModel.readTasks();
    const taskSeaarch = tasks.find((task) => task.id === id);
    if (!taskSeaarch) {
      return false;
    }
    taskSeaarch.title = updatedTask.title;
    taskSeaarch.description = updatedTask.description;
    tasksModel.writeTasks(tasks);
    return true;
  },

  deleteTask: (id) => {
    const tasks = tasksModel.readTasks();
    const taskFilter = tasks.filter((task) => task.id !== id);
    if (!taskFilter.length === tasks.length) {
      return false;
    }
    tasksModel.writeTasks(taskFilter);
    return true;
  },

  getTaskById: (id) => {
    const tasks = tasksModel.readTasks();
    const task = tasks.find((task) => task.id === id);
    if (!task) {
      return false;
    }
    return task;
  },
};

module.exports = tasksModel;
