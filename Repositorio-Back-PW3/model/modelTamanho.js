const Sequelize = require('sequelize');
const connection = require('../database/database');

const modelTamanho = connection.define(
    'tbl_tamanho',
    {
        cod_tamanho: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tamanho_escolhido: {
            type: Sequelize.STRING(100),
            allowNull: false 
        }
    },
    {
        timestamps: true 
    }
);

// modelTamanho.sync({force: true});

module.exports = modelTamanho;
