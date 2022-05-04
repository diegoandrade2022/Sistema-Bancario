const { v4: uuidv4 } = require('uuid');

const modifyData = require('../Utils/Modifydata');
const bancoDeDados = require('../Data/Database');
const { validateInputData, validateEmailAndCpf, validateExistenceEmailAndCpf } = require('../Utils/Validations');

module.exports = {
    index(req, res) {
        try {
            if (bancoDeDados.contas.length === 0) {
                return res.status(200).json({ mensagem: 'Nenhuma conta encontrada' })
            }
            return res.status(200).json(bancoDeDados.contas);
        } catch (erro) {
            return res.status(500).json(`{ mensagem: ${erro.message} }`);
        }
    },
    save(req, res) {
        try {
            let numeroConta = uuidv4();
            let saldo = 0
            let input = { numeroConta, saldo, ...req.body };

            let retorno = validateInputData(input);

            if (retorno) {
                return res.status(400).json(retorno.mensagem);
            }

            retorno = validateEmailAndCpf(input);

            if (retorno) {
                return res.status(400).json(retorno.mensagem);
            }

            retorno = validateExistenceEmailAndCpf(bancoDeDados, input);
            if (retorno) {
                return res.status(400).json(retorno.mensagem);
            }

            bancoDeDados.contas.push(input);

            modifyData(bancoDeDados, 'Database.js');

            return res.status(201).json({ mensagem: 'Conta criada com sucesso' });

        } catch (erro) {
            return res.status(500).json(`{ mensagem: ${erro.message} }`);
        }
    },
    update(req, res) {
        try {
            let inputConta = req.params.numeroConta;

            let contas = bancoDeDados.contas.find(conta => conta.numeroConta == inputConta);

            if (!contas) {
                return res.status(404).json({ mensagem: 'Conta não encontrada' });
            }

            let input = { ...req.body };

            let retorno = validateInputData(input);

            if (retorno) {
                return res.status(400).json(retorno.mensagem);
            }

            retorno = validateEmailAndCpf(input);

            if (retorno) {
                return res.status(400).json(retorno.mensagem);
            }

            retorno = validateExistenceEmailAndCpf(bancoDeDados, input);
            if (retorno) {
                return res.status(400).json(retorno.mensagem);
            }

            contas.nome = input.nome;
            contas.cpf = input.cpf;
            contas.data_nascimento = input.data_nascimento;
            contas.telefone = input.telefone;
            contas.email = input.email;
            contas.senha = input.senha;

            modifyData(bancoDeDados, 'Database.js');

            return res.status(204).json({ mensagem: 'Alteração efetuada com sucesso' });

        } catch (erro) {
            return res.status(500).json(`{ mensagem: ${erro.message} }`);
        }
    },
    deletes(req, res) {
        try {
            let inputConta = req.params.numeroConta;

            let contas = bancoDeDados.contas.find(conta => conta.numeroConta == inputConta);

            if (!contas) {
                return res.status(404).json({ mensagem: 'Conta não encontrada' });
            }
            if (contas.saldo > 0) {
                return res.status(403).json({ mensagem: 'A conta só pode ser excluída se o saldo for zero!' });
            }

            let exclusao = bancoDeDados.contas.filter(conta => conta.numeroConta !== inputConta);

            if (exclusao) {
                bancoDeDados.contas = exclusao;
            }

            modifyData(bancoDeDados, 'Database.js');

            return res.status(204).json({ mensagem: 'Conta removida com sucesso' });

        } catch (erro) {
            return res.status(500).json(`{ mensagem: ${erro.message} }`);
        }
    },
    balance(req, res) {
        try {
            let input = { ...req.query };

            if (!input.numero_conta || !input.senha) {
                return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
            }

            let contas = bancoDeDados.contas.find(conta => conta.numeroConta == input.numero_conta);

            if (!contas) {
                return res.status(404).json({ mensagem: 'Conta não encontrada' });
            }
            if (contas.senha !== input.senha) {
                return res.status(404).json({ mensagem: 'Senha incorreta' });
            }

            return res.status(200).json({ "saldo": contas.saldo });

        } catch (erro) {
            return res.status(500).json(`{ mensagem: ${erro.message} }`);
        }
    },
    extract(req, res) {
        try {
            let input = { ...req.query };

            if (!input.numero_conta || !input.senha) {
                return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
            }

            let contas = bancoDeDados.contas.find(conta => conta.numeroConta == input.numero_conta);

            if (!contas) {
                return res.status(404).json({ mensagem: 'Conta não encontrada' });
            }
            if (contas.senha !== input.senha) {
                return res.status(404).json({ mensagem: 'Senha incorreta' });
            }

            const depositos = bancoDeDados.depositos.filter(deposito => deposito.numeroConta == input.numero_conta);
            const saques = bancoDeDados.saques.filter(saque => saque.numeroConta == input.numero_conta);
            const transferenciasEnviadas = bancoDeDados.transferencias.filter(transferencia => transferencia.numeroContaOrigem == input.numero_conta);
            const transferenciasRecebidas = bancoDeDados.transferencias.filter(transferencia => transferencia.numeroContaDestino == input.numero_conta);

            return res.status(200).json({
                "depositos": depositos,
                "saques": saques,
                "transferenciasEnviadas": transferenciasEnviadas,
                "transferenciasRecebidas": transferenciasRecebidas
            });

        } catch (erro) {
            return res.status(500).json(`{ mensagem: ${erro.message} }`);
        }
    }
};