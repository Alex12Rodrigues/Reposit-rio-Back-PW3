const express = require('express');
const { body, validationResult } = require('express-validator');
const modelTamanho = require('../model/modelTamanho');

const router = express.Router();

/* INSERÇÃO DE TAMANHO */
router.post('/tamanhos', [
    body('tamanho_escolhido').notEmpty().withMessage('Tamanho escolhido é obrigatório')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errorStatus: true,
            mensageStatus: 'ERROS DE VALIDAÇÃO',
            errors: errors.array()
        });
    }

    const { tamanho_escolhido } = req.body;

    try {
        await modelTamanho.create({ tamanho_escolhido });
        return res.status(201).json({
            errorStatus: false,
            mensageStatus: 'TAMANHO INSERIDO COM SUCESSO'
        });
    } catch (error) {
        return res.status(500).json({
            errorStatus: true,
            mensageStatus: 'HOUVE UM ERRO AO INSERIR O TAMANHO',
            errorObject: error.message
        });
    }
});

/* LISTAGEM GERAL DE TAMANHOS */
router.get('/tamanhos', async (req, res) => {
    try {
        const response = await modelTamanho.findAll();
        return res.status(200).json({
            errorStatus: false,
            mensageStatus: 'TAMANHOS LISTADOS COM SUCESSO',
            data: response
        });
    } catch (error) {
        return res.status(500).json({
            errorStatus: true,
            mensageStatus: 'HOUVE UM ERRO AO LISTAR OS TAMANHOS',
            errorObject: error.message
        });
    }
});

/* LISTAGEM DE TAMANHO POR CÓDIGO */
router.get('/tamanhos/:cod_tamanho', async (req, res) => {
    const { cod_tamanho } = req.params;

    try {
        const response = await modelTamanho.findByPk(cod_tamanho);
        if (!response) {
            return res.status(404).json({
                errorStatus: true,
                mensageStatus: 'TAMANHO NÃO ENCONTRADO'
            });
        }
        return res.status(200).json({
            errorStatus: false,
            mensageStatus: 'TAMANHO RECUPERADO COM SUCESSO',
            data: response
        });
    } catch (error) {
        return res.status(500).json({
            errorStatus: true,
            mensageStatus: 'HOUVE UM ERRO AO RECUPERAR O TAMANHO',
            errorObject: error.message
        });
    }
});

/* EXCLUSÃO DE TAMANHO */
router.delete('/tamanhos/:cod_tamanho', async (req, res) => {
    const { cod_tamanho } = req.params;

    try {
        const deleted = await modelTamanho.destroy({ where: { cod_tamanho } });
        if (!deleted) {
            return res.status(404).json({
                errorStatus: true,
                mensageStatus: 'TAMANHO NÃO ENCONTRADO'
            });
        }
        return res.status(200).json({
            errorStatus: false,
            mensageStatus: 'TAMANHO EXCLUÍDO COM SUCESSO'
        });
    } catch (error) {
        return res.status(500).json({
            errorStatus: true,
            mensageStatus: 'HOUVE UM ERRO AO EXCLUIR O TAMANHO',
            errorObject: error.message
        });
    }
});

/* ALTERAÇÃO DE TAMANHO */
router.put('/tamanhos', async (req, res) => {
    const { cod_tamanho, tamanho_escolhido } = req.body;

    try {
        const [updated] = await modelTamanho.update({ tamanho_escolhido }, { where: { cod_tamanho } });
        if (!updated) {
            return res.status(404).json({
                errorStatus: true,
                mensageStatus: 'TAMANHO NÃO ENCONTRADO'
            });
        }
        return res.status(200).json({
            errorStatus: false,
            mensageStatus: 'TAMANHO ALTERADO COM SUCESSO'
        });
    } catch (error) {
        return res.status(500).json({
            errorStatus: true,
            mensageStatus: 'HOUVE UM ERRO AO ALTERAR O TAMANHO',
            errorObject: error.message
        });
    }
});

module.exports = router;
