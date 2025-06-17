const controller = require('../controller/taskController');
const express = require('express');
const router = express.Router();

// Rutas para las tareas
router.get('/', controller.getTasks);
router.post('/', controller.addTask);
router.put('/:id', controller.editTask);
router.delete('/:id', controller.deleteTask);
router.get('/:id', controller.getTaskById);


module.exports = router;