module.exports = {
    validateInputData(data) {
        if (!data.nome || !data.cpf || !data.data_nascimento || !data.telefone
            || !data.email || !data.senha) {
            return { mensagem: 'Todos os campos são obrigatorios' };
        }
    },
    validateEmailAndCpf(data) {
        if (data.cpf.length < 11 || data.cpf.length > 11) {
            return { mensagem: 'CPF inválido' };
        }
        if (data.email.indexOf('@') === -1) {
            return { mensagem: 'Email inválido' };
        }
    },
    validateExistenceEmailAndCpf(array, data) {
        for (let validar of array.contas) {
            if (validar.cpf === data.cpf) {
                return { mensagem: 'CPF já cadastrado' };
            }
            if (validar.email === data.email) {
                return { mensagem: 'Email já cadastrado' };
            }
        }
    }
};