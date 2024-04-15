const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');

// Route for fetching images
router.get('/images', imageController.fetchImages);

module.exports = router;
