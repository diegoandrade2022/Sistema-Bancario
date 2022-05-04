module.exports = {
    validarSenhaBanco(req, res, next) {
        const { senha_banco } = req.query;

        if (!senha_banco) {
            return res.status(401).json({ mensagem: 'A senha do banco tem que ser informada' });
        }

        if (senha_banco !== 'Cubos123Bank') {
            return res.status(401).json({ mensagem: 'A senha está incorreta' })
        }

        next();

    }
}