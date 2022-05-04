const express = require('express');
const { validarSenhaBanco } = require('../Middlewares/PasswordAccess');
const { index, save, update, deletes, balance, extract } = require('../Controllers/AccountsControllers')

const router = express.Router();

router.use(express.json());

router.get('/', validarSenhaBanco, index);
router.post('/', save);
router.put('/:numeroConta', update);
router.delete('/:numeroConta', deletes);
router.get('/saldo', balance);
router.get('/extrato', extract);

module.exports = router;    