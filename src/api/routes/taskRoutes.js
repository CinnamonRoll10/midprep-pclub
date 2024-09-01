const express = require('express');
const taskController = require('../controllers/taskController');

const router = express.Router();

router.post('/add', taskController.addTask);
router.post('/allocate', taskController.allocateTask);
router.get('/:taskId', taskController.getTaskDetails);

module.exports = router;
