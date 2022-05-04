const express = require('express');

const accountsRouter = require('./Routes/AccountsRoutes');
const transactionsRouter = require('./Routes/TransactionsRoutes');

const app = express();

app.use(express.json());
app.use('/contas', accountsRouter);
app.use('/transacoes', transactionsRouter);

app.listen(3000, () => {
    console.log('Servidor rodando na porta http://localhost:3000');
});