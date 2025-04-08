const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const taskService = require('../services/taskService');

router.get('/', taskController.getAllTasks);
router.get('/status/:status', taskController.getTasksByStatus);
router.get('/:id', taskController.getTask);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

router.get('/counts/all', async (req, res) => {
  try {
    const counts = await taskService.getTaskCounts();
    res.status(200).json({
      success: true,
      data: counts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

module.exports = router;