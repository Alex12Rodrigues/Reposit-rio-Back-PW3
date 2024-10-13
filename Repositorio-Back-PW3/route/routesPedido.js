const express = require('express');
const modelPedido = require('../model/modelPedido');

const router = express.Router();

/* TESTE DE CONEXÃO COM A API */
router.get('/', (req, res) => {
    return res.status(200).json({ status: 'TESTE DE CONEXÃO COM A API!' });
});

/* INSERÇÃO DE PEDIDO */
router.post('/inserirPedido', async (req, res) => {
    const { nome_marca, modelo_escolhido, descricao_escrita, cor_escolhida } = req.body;

    try {
        await modelPedido.create({ nome_marca, modelo_escolhido, descricao_escrita, cor_escolhida });
        return res.status(201).json({
            errorStatus: false,
            mensageStatus: 'PEDIDO REALIZADO COM SUCESSO'
        });
    } catch (error) {
        return res.status(400).json({
            errorStatus: true,
            mensageStatus: 'HOUVE UM ERRO COM O PEDIDO',
            errorObject: error.message // Filtrar o que for necessário
        });
    }
});

/* LISTAGEM GERAL DE PEDIDOS */
router.get('/listagemPedidos', async (req, res) => {
    try {
        const response = await modelPedido.findAll();
        return res.status(200).json({
            errorStatus: false,
            mensageStatus: 'PEDIDOS LISTADOS COM SUCESSO',
            data: response
        });
    } catch (error) {
        return res.status(400).json({
            errorStatus: true,
            mensageStatus: 'HOUVE UM ERRO AO LISTAR OS PEDIDOS',
            errorObject: error.message
        });
    }
});

/* LISTAGEM DE PEDIDO POR CÓDIGO */
router.get('/listagemPedido/:cod_pedido', async (req, res) => {
    const { cod_pedido } = req.params;

    try {
        const response = await modelPedido.findByPk(cod_pedido);
        if (!response) {
            return res.status(404).json({
                errorStatus: true,
                mensageStatus: 'PEDIDO NÃO ENCONTRADO'
            });
        }
        return res.status(200).json({
            errorStatus: false,
            mensageStatus: 'PEDIDO RECUPERADO COM SUCESSO',
            data: response
        });
    } catch (error) {
        return res.status(400).json({
            errorStatus: true,
            mensageStatus: 'HOUVE UM ERRO AO RECUPERAR O PEDIDO',
            errorObject: error.message
        });
    }
});

/* EXCLUSÃO DE PEDIDO */
router.delete('/excluirPedido/:cod_pedido', async (req, res) => {
    const { cod_pedido } = req.params;

    try {
        const deleted = await modelPedido.destroy({ where: { cod_pedido } });
        if (!deleted) {
            return res.status(404).json({
                errorStatus: true,
                mensageStatus: 'PEDIDO NÃO ENCONTRADO'
            });
        }
        return res.status(200).json({
            errorStatus: false,
            mensageStatus: 'PEDIDO EXCLUIDO COM SUCESSO'
        });
    } catch (error) {
        return res.status(400).json({
            errorStatus: true,
            mensageStatus: 'HOUVE UM ERRO AO EXCLUIR O PEDIDO',
            errorObject: error.message
        });
    }
});

/* ALTERAÇÃO DE PEDIDO */
router.put('/alterarPedido', async (req, res) => {
    const { cod_pedido, nome_marca, modelo_escolhido, descricao_escrita, cor_escolhida } = req.body;

    try {
        const [updated] = await modelPedido.update({
            nome_marca,
            modelo_escolhido,
            descricao_escrita,
            cor_escolhida
        }, { where: { cod_pedido } });
        
        if (!updated) {
            return res.status(404).json({
                errorStatus: true,
                mensageStatus: 'PEDIDO NÃO ENCONTRADO'
            });
        }

        return res.status(200).json({
            errorStatus: false,
            mensageStatus: 'PEDIDO ALTERADO COM SUCESSO'
        });
    } catch (error) {
        return res.status(400).json({
            errorStatus: true,
            mensageStatus: 'HOUVE UM ERRO AO ALTERAR O PEDIDO',
            errorObject: error.message
        });
    }
});

module.exports = router;
