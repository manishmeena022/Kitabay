const express = require('express');
const { getStats } = require('../controllers/admin.controller');
const router = express.Router()

router.get('/', getStats)

module.exports = router