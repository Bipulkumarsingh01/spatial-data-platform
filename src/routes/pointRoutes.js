const express = require('express');
const router = express.Router();
const pointController = require('../controllers/pointController');

router.post('/', pointController.createPoint);
router.get('/', pointController.getAllPoints);
router.get('/nearby', pointController.getNearbyPoints);

module.exports = router;