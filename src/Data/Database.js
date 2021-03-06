module.exports = {
    "banco": {
        "nome": "Cubos Bank",
        "numero": "123",
        "agencia": "0001",
        "senha": "Cubos123Bank"
    },
    "contas": [
        {
            "numeroConta": "410e6e69-4fad-4eb8-aee2-6546e8e7e3a7",
            "saldo": 1070,
            "nome": "Teste 01",
            "cpf": "11111111111",
            "data_nascimento": "2019-09-09",
            "telefone": "71999998888",
            "email": "teste01@gmail.com",
            "senha": "1234"
        },
        {
            "numeroConta": "d2cb2ca0-71fe-418a-ad5d-557840fc7842",
            "saldo": 2040,
            "nome": "Teste 02",
            "cpf": "11111111112",
            "data_nascimento": "2019-09-09",
            "telefone": "71999998888",
            "email": "teste02@gmail.com",
            "senha": "12345"
        },
        {
            "numeroConta": "f98818a5-7351-4796-be18-928608ab961d",
            "saldo": 2710,
            "nome": "Teste 03",
            "cpf": "11111111113",
            "data_nascimento": "2019-09-09",
            "telefone": "71999998888",
            "email": "teste03@gmail.com",
            "senha": "123456"
        }
    ],
    "saques": [
        {
            "data": "2022-05-04 22:24:15",
            "numeroConta": "410e6e69-4fad-4eb8-aee2-6546e8e7e3a7",
            "valor": 50
        },
        {
            "data": "2022-05-04 22:24:37",
            "numeroConta": "d2cb2ca0-71fe-418a-ad5d-557840fc7842",
            "valor": 60
        },
        {
            "data": "2022-05-04 22:24:54",
            "numeroConta": "f98818a5-7351-4796-be18-928608ab961d",
            "valor": 70
        }
    ],
    "depositos": [
        {
            "data": "2022-05-04 22:22:49",
            "numeroConta": "410e6e69-4fad-4eb8-aee2-6546e8e7e3a7",
            "valor": 1000
        },
        {
            "data": "2022-05-04 22:23:06",
            "numeroConta": "d2cb2ca0-71fe-418a-ad5d-557840fc7842",
            "valor": 2000
        },
        {
            "data": "2022-05-04 22:23:23",
            "numeroConta": "f98818a5-7351-4796-be18-928608ab961d",
            "valor": 3000
        }
    ],
    "transferencias": [
        {
            "data": "2022-05-04 22:26:07",
            "numeroContaOrigem": "f98818a5-7351-4796-be18-928608ab961d",
            "numeroContaDestino": "410e6e69-4fad-4eb8-aee2-6546e8e7e3a7",
            "valor": 100
        },
        {
            "data": "2022-05-04 22:26:25",
            "numeroContaOrigem": "f98818a5-7351-4796-be18-928608ab961d",
            "numeroContaDestino": "d2cb2ca0-71fe-418a-ad5d-557840fc7842",
            "valor": 200
        },
        {
            "data": "2022-05-04 22:27:02",
            "numeroContaOrigem": "d2cb2ca0-71fe-418a-ad5d-557840fc7842",
            "numeroContaDestino": "f98818a5-7351-4796-be18-928608ab961d",
            "valor": 50
        },
        {
            "data": "2022-05-04 22:27:20",
            "numeroContaOrigem": "d2cb2ca0-71fe-418a-ad5d-557840fc7842",
            "numeroContaDestino": "410e6e69-4fad-4eb8-aee2-6546e8e7e3a7",
            "valor": 70
        },
        {
            "data": "2022-05-04 22:27:52",
            "numeroContaOrigem": "410e6e69-4fad-4eb8-aee2-6546e8e7e3a7",
            "numeroContaDestino": "d2cb2ca0-71fe-418a-ad5d-557840fc7842",
            "valor": 20
        },
        {
            "data": "2022-05-04 22:28:08",
            "numeroContaOrigem": "410e6e69-4fad-4eb8-aee2-6546e8e7e3a7",
            "numeroContaDestino": "f98818a5-7351-4796-be18-928608ab961d",
            "valor": 30
        }
    ]
}