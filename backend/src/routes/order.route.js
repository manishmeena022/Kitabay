const express = require('express');
const { createOrder, getOrderByEmail } = require('../controllers/order.controller');
const router = express.Router();

router.post('/', createOrder)
router.get('/email/:email', getOrderByEmail)

module.exports = router;