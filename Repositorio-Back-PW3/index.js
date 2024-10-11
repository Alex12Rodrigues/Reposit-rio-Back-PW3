const express = require('express');
const cors = require('cors');

const routerPedido = require('./route/routesPedido');
const routesTamanho = require('./route/routesTamanho');

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/', routerPedido);
app.use('/', routesTamanho);

app.listen(5000, ()=>{
    console.log('SERVIDOR RODANDO EM - http://localhost:5000');
});