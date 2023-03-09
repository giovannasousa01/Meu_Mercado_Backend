import {Router} from 'express';
import express from 'express';
import db from '../config/database.js';

const controllerMercado = Router();

controllerMercado.use(express.json());

// Query Params......

// Listando todos os usuarios...
controllerMercado.get("/mercados", function(request, response) {
    let filtro = [];
    let script = "select * from mercado where id_mercado > 0";

    if (request.query.busca) {
        script += " and nome = ?";
        filtro.push(request.query.busca);
    }

    if (request.query.ind_entrega) {
        script += " and ind_entrega = ?";
        filtro.push(request.query.ind_entrega);
    }

    if (request.query.ind_retira) {
        script += " and ind_retira = ?";
        filtro.push(request.query.ind_retira);
    }

    db.query(script, filtro, function(error, result) {
        if (error) {
            return response.status(500).send(error);
        } else {
            return response.status(200).json(result);
        }
    }); 
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

//URI Params...

//Listando um único usuário....
controllerMercado.get("/mercados/:id_mercado", function(request, response) {
    let script = "select * from mercado where id_mercado = ?";
    db.query(script,[request.params.id_mercado], function(error, result) {
        if (error) {
            return response.status(500).send(error);
        } else {
            console.log(result);
            return response.status(result.lenght <= 0 ? 404 : 200).json(result);
        }
    }); 
});

controllerMercado.get("/mercados/:id_mercado/categorias", function(request, response) {
    let script = "select distinct c.id_categoria, c.descricao from produto_categoria c ";
    script += "join produto p on (p.id_categoria = c.id_categoria) ";
    script += "where p.id_mercado = ? ";
    //script += "order by c.ordem;";
    db.query(script,[request.params.id_mercado], function(error, result) {
        if (error) {
            return response.status(500).send(error);
        } else {
            console.log(result);
            return response.status(result.lenght <= 0 ? 404 : 200).json(result);
        }
    }); 
});


export default controllerMercado;
