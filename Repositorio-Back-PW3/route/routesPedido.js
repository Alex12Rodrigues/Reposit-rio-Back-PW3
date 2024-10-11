const express = require('express');

const modelPedido = require('../model/modelPedido');

const router = express.Router();

/* TESTE DE CONEXÃO COM A API */
router.get('/', (req, res) => {
    return res.status(200).json({ status: 'TESTE DE CONEXÃO COM A API!' });
});

/* INSERÇÃO DE PEDIDO */
router.post('/inserirPedido', (req, res) => {
    const { nome_marca, modelo_escolhido, descricao_modelo, cor_escolhida } = req.body;

    modelPedido.create({
        nome_marca,
        modelo_escolhido,
        descricao_modelo,
        cor_escolhida
    })
    .then(() => {
        return res.status(201).json({
            errorStatus: false,
            mensageStatus: 'PEDIDO REALIZADO COM SUCESSO'
        });
    })
    .catch((error) => {
        return res.status(400).json({
            errorStatus: true,
            mensageStatus: 'HOUVE UM ERRO COM O PEDIDO',
            errorObject: error
        });
    });
});

/* LISTAGEM GERAL DE PEDIDOS */
router.get('/listagemPedidos', (req, res) => {
    modelPedido.findAll()
    .then((response) => {
        return res.status(200).json({
            errorStatus: false,
            mensageStatus: 'PEDIDOS LISTADOS COM SUCESSO',
            data: response
        });
    })
    .catch((error) => {
        return res.status(400).json({
            errorStatus: true,
            mensageStatus: 'HOUVE UM ERRO AO LISTAR OS PEDIDOS',
            errorObject: error
        });
    });
});

/* LISTAGEM DE PEDIDO POR CÓDIGO */
router.get('/listagemPedido/:cod_livro', (req, res) => {
    const { cod_livro } = req.params;

    modelPedido.findByPk(cod_livro)
    .then((response) => {
        return res.status(200).json({
            errorStatus: false,
            mensageStatus: 'PEDIDO RECUPERADO COM SUCESSO',
            data: response
        });
    })
    .catch((error) => {
        return res.status(400).json({
            errorStatus: true,
            mensageStatus: 'HOUVE UM ERRO AO RECUPERAR O PEDIDO',
            errorObject: error
        });
    });
});

/* EXCLUSÃO DE PEDIDO */
router.delete('/excluirPedido/:cod_livro', (req, res) => {
    const { cod_livro } = req.params;

    modelPedido.destroy({ where: { cod_livro } })
    .then(() => {
        return res.status(200).json({
            errorStatus: false,
            mensageStatus: 'PEDIDO EXCLUIDO COM SUCESSO'
        });
    })
    .catch((error) => {
        return res.status(400).json({
            errorStatus: true,
            mensageStatus: 'HOUVE UM ERRO AO EXCLUIR O PEDIDO',
            errorObject: error
        });
    });
});

/* ALTERAÇÃO DE PEDIDO */
router.put('/alterarPedido', (req, res) => {
    const { cod_livro, nome_marca, modelo_escolhido, descricao_modelo, cor_escolhida } = req.body;

    modelPedido.update({
        nome_marca,
        modelo_escolhido,
        descricao_modelo,
        cor_escolhida
    }, { where: { cod_livro } })
    .then(() => {
        return res.status(200).json({
            errorStatus: false,
            mensageStatus: 'PEDIDO ALTERADO COM SUCESSO'
        });
    })
    .catch((error) => {
        return res.status(400).json({
            errorStatus: true,
            mensageStatus: 'HOUVE UM ERRO AO ALTERAR O PEDIDO',
            errorObject: error
        });
    });
});

module.exports = router;
