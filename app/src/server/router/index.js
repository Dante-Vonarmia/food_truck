const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

router.get('/', searchController.getHome);
router.get('/search', searchController.performSearch);

module.exports = router;
