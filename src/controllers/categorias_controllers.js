import {Router} from 'express';
import express from 'express';
import db from '../config/database.js';

const controllerCategorias = Router();

controllerCategorias.use(express.json());

// Query Params......

// Listando todos os usuarios...
controllerCategorias.get("/categorias", function(request, response) {
    let script = "select * from produto_categoria where id_categoria > 0";

    db.query(script, function(error, result) {
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
controllerCategorias.get("/categorias/:id_categoria", function(request, response) {
    let script = "select * from produto_categoria where id_categoria = ?";
    db.query(script,[request.params.id_categoria], function(error, result) {
        if (error) {
            return response.status(500).send(error);
        } else {
            return response.status(result.lenght <= 0 ? 404 : 200).json(result[0]);
        }
    }); 
});


export default controllerCategorias;
