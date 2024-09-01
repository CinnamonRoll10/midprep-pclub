const express = require('express');
const workerController = require('../controllers/workerController');

const router = express.Router();

router.post('/register', workerController.registerWorker);
router.get('/:workerId', workerController.getWorkerDetails);

module.exports = router;
