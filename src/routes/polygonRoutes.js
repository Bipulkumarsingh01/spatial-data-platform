const express = require('express');
const router = express.Router();
const polygonController = require('../controllers/polygonController');

router.post('/', polygonController.createPolygon);
router.get('/', polygonController.getAllPolygons);
router.get('/within', polygonController.getPolygonsWithin);

module.exports = router;