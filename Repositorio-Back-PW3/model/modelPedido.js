const Sequelize = require('sequelize');
const connection = require('../database/database');

const modelPedido = connection.define(
    'tbl_pedido',
    {
        cod_pedido: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome_marca: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        modelo_escolhido: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        descricao_escrita: {
            type: Sequelize.STRING(500),
            allowNull: true
        },
        cor_escolhida: {
            type: Sequelize.STRING(100),
            allowNull: true
        }
    },
    {
        timestamps: true 
    }
);

// modelPedido.sync({force: true});

module.exports = modelPedido;
