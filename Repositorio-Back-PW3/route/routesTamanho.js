const express = require('express');

const modelTamanho = require('../model/modelTamanho');

const router = express.Router();

/* INSERÇÃO DE TAMANHO */
router.post('/inserirTamanho', (req, res) => {
    let { tamanho_escolhido } = req.body;

    modelTamanho.create({
        tamanho_escolhido,
    })
    .then(() => {
        return res.status(201).json({
            errorStatus: false,
            mensageStatus: 'TAMANHO INSERIDO COM SUCESSO'
        });
    })
    .catch((error) => {
        return res.status(400).json({
            errorStatus: true,
            mensageStatus: 'HOUVE UM ERRO AO INSERIR O TAMANHO',
            errorObject: error
        });
    });
});

/* LISTAGEM GERAL DE TAMANHOS */
router.get('/listagemTamanhos', (req, res) => {
    modelTamanho.findAll()
    .then((response) => {
        return res.status(200).json({
            errorStatus: false,
            mensageStatus: 'TAMANHOS LISTADOS COM SUCESSO',
            data: response
        });
    })
    .catch((error) => {
        return res.status(400).json({
            errorStatus: true,
            mensageStatus: 'HOUVE UM ERRO AO LISTAR OS TAMANHOS',
            errorObject: error
        });
    });
});

/* LISTAGEM DE TAMANHO POR CÓDIGO */
router.get('/listagemTamanho/:cod_categoria', (req, res) => {
    let { cod_categoria } = req.params;

    modelTamanho.findByPk(cod_categoria)
    .then((response) => {
        return res.status(200).json({
            errorStatus: false,
            mensageStatus: 'TAMANHO RECUPERADO COM SUCESSO',
            data: response
        });
    })
    .catch((error) => {
        return res.status(400).json({
            errorStatus: true,
            mensageStatus: 'HOUVE UM ERRO AO RECUPERAR O TAMANHO',
            errorObject: error
        });
    });
});

/* EXCLUSÃO DE TAMANHO */
router.delete('/excluirTamanho/:cod_categoria', (req, res) => {
    let { cod_categoria } = req.params;

    modelTamanho.destroy({
        where: { cod_categoria }
    })
    .then(() => {
        return res.status(200).json({
            errorStatus: false,
            mensageStatus: 'TAMANHO EXCLUÍDO COM SUCESSO'
        });
    })
    .catch((error) => {
        return res.status(400).json({
            errorStatus: true,
            mensageStatus: 'HOUVE UM ERRO AO EXCLUIR O TAMANHO',
            errorObject: error
        });
    });
});

/* ALTERAÇÃO DE TAMANHO */
router.put('/alterarTamanho', (req, res) => {
    let { cod_categoria, tamanho_escolhido } = req.body;

    modelTamanho.update({
        tamanho_escolhido
    }, {
        where: { cod_categoria }
    })
    .then(() => {
        return res.status(200).json({
            errorStatus: false,
            mensageStatus: 'TAMANHO ALTERADO COM SUCESSO'
        });
    })
    .catch((error) => {
        return res.status(400).json({
            errorStatus: true,
            mensageStatus: 'HOUVE UM ERRO AO ALTERAR O TAMANHO',
            errorObject: error
        });
    });
});

module.exports = router;
