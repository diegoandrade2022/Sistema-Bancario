const { format } = require('date-fns');

const modifyData = require('../Utils/Modifydata');
const bancoDeDados = require('../Data/Database');

module.exports = {
    deposit(req, res) {
        try {

            const { numero_conta, valor } = req.body;

            if (!numero_conta || valor === undefined) {
                return res.status(400).json({ mensagem: 'A conta e valor são obrigatórios para deposito' });
            }
            if (valor <= 0) {
                return res.status(400).json({ mensagem: 'Valor inválido' });
            }

            const conta = bancoDeDados.contas.find(conta => conta.numeroConta === numero_conta);
            if (!conta) {
                return res.status(404).json({ mensagem: 'Conta inexistente' });
            }

            conta.saldo += valor;

            let hoje = new Date();
            hoje = format(hoje, 'yyyy-MM-dd HH:mm:ss');

            bancoDeDados.depositos.push({ "data": hoje, "numeroConta": numero_conta, valor });

            modifyData(bancoDeDados, 'Database.js');

            return res.status(201).json({ mensagem: 'Deposito efetuado com sucesso' });

        } catch (erro) {
            return res.status(500).json(`{ mensagem: ${erro.message} }`);
        }
    },
    cash(req, res) {
        try {
            const { numero_conta, valor, senha } = req.body;

            if (!numero_conta || !valor || !senha) {
                return res.status(400).json({ mensagem: 'A conta e valor são obrigatórios para saque' });
            }
            if (valor <= 0) {
                return res.status(400).json({ mensagem: 'Valor inválido' });
            }

            const conta = bancoDeDados.contas.find(conta => conta.numeroConta === numero_conta);
            if (!conta) {
                return res.status(400).json({ mensagem: 'Conta inexistente' });
            } else if (conta.senha !== senha) {
                return res.status(400).json({ mensagem: 'Senha inválida' });
            } else if (conta.saldo < valor) {
                return res.status(400).json({ mensagem: 'Saldo insuficiente' });
            } else {
                conta.saldo -= valor;
            }

            let hoje = new Date();
            hoje = format(hoje, 'yyyy-MM-dd HH:mm:ss');

            bancoDeDados.saques.push({ "data": hoje, "numeroConta": numero_conta, valor });

            modifyData(bancoDeDados, 'Database.js');

            return res.status(201).json({ mensagem: 'Saque efetuado com sucesso' });

        } catch (erro) {
            return res.status(500).json(`{ mensagem: ${erro.message} }`);
        }
    },
    transfer(req, res) {
        try {
            const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

            if (!numero_conta_origem || !numero_conta_destino || valor === undefined || !senha) {
                return res.status(400).json({ mensagem: 'A conta de origem e de destino, senha da conta de origem e valor da transferência são obrigatórios' });
            }
            if (numero_conta_origem === numero_conta_destino) {
                return res.status(400).json({ mensagem: 'Conta de Origem e Destino são iguais' });
            }
            if (valor <= 0) {
                return res.status(400).json({ mensagem: 'Valor inválido' });
            }

            const contaO = bancoDeDados.contas.find(conta => conta.numeroConta === numero_conta_origem);
            if (!contaO) {
                return res.status(400).json({ mensagem: 'Conta de Origem inexistente' });
            }
            if (contaO.senha !== senha) {
                return res.status(400).json({ mensagem: 'Senha inválida' });
            }
            if (contaO.saldo < valor) {
                return res.status(400).json({ mensagem: 'Saldo insuficiente' });
            }

            const contaD = bancoDeDados.contas.find(conta => conta.numeroConta === numero_conta_destino);
            if (!contaD) {
                return res.status(400).json({ mensagem: 'Conta Destino inexistente' });
            }


            contaO.saldo -= valor;
            contaD.saldo += valor;

            let hoje = new Date();
            hoje = format(hoje, 'yyyy-MM-dd HH:mm:ss');

            bancoDeDados.transferencias.push({ "data": hoje, "numeroContaOrigem": numero_conta_origem, "numeroContaDestino": numero_conta_destino, valor });

            modifyData(bancoDeDados, 'Database.js');

            return res.status(201).json({ mensagem: 'Tranferência efetuada com sucesso' });

        } catch (erro) {
            return res.status(500).json(`{ mensagem: ${erro.message} }`);
        }
    }
};