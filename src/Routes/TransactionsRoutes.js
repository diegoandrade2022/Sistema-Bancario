const express = require('express');
const { deposit, cash, transfer } = require('../Controllers/TransactionsControllers');

const router = express.Router();

router.use(express.json());

router.post('/depositar', deposit);
router.post('/sacar', cash);
router.post('/transferir', transfer);

module.exports = router;