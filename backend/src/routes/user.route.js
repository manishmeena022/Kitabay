const express = require('express')
const { loginAdmin } = require('../controllers/user.controller');

const router = express.Router();

router.post('/admin', loginAdmin)

module.exports = router