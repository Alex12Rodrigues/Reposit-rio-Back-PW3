const Sequelize = require('sequelize');

const connection = require('../database/database');

const modelTamanho = connection.define(
    'tbl_tamanho',
    {
        cod_categoria:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        tamanho_escolhido:{
            type:Sequelize.STRING(100),
            allowNull:true
        }
    }
);

// modelTamanho.sync({force:true});


module.exports = modelTamanho;