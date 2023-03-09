import {Router} from 'express';
import express from 'express';
import db from '../config/database.js';

const controllerUsuarios = Router();

controllerUsuarios.use(express.json());

// Query Params......

// Listando todos os usuarios...
controllerUsuarios.get("/usuarios", function(request, response) {
    let script = "select id_usuario, nome, email, senha, endereco, bairro, cidade, uf, cep, " +
    "DATE_FORMAT(dt_cadastro, '%d/%m/%Y %H:%i:%s') AS dt_cadastro from usuario";
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
controllerUsuarios.get("/usuarios/:id_usuario", function(request, response) {
    let script = "select id_usuario, nome, email, senha, endereco, bairro, cidade, uf, cep, ";
    script += "DATE_FORMAT(dt_cadastro, '%d/%m/%Y %H:%i:%s') AS dt_cadastro ";
    script += "from usuario where id_usuario = ?";
    db.query(script,[request.params.id_usuario], function(error, result) {
        if (error) {
            return response.status(500).send(error);
        } else {
            return response.status(result.lenght <= 0 ? 404 : 200).json(result[0]);
        }
    }); 
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// Fazendo login de um usuário...
controllerUsuarios.post("/usuarios/login", function(request, response) {
    let script = "select id_usuario, nome, email, senha, endereco, bairro, cidade, uf, cep, ";
    script += "DATE_FORMAT(dt_cadastro, '%d/%m/%Y %H:%i:%s') AS dt_cadastro ";
    script += "from usuario where email = ? and senha = ?;";

    db.query(script, [request.body.email, request.body.senha], function(error, result){
        if (error) {
            return response.status(500).send(error);
        } else {
            return response.status(result.lenght <= 0 ? 401 : 200).json(result[0]);
        }
    });
    
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// Fazendo cadastro de um usuário...
controllerUsuarios.post("/usuarios/cadastro", function(request, response) {
    let script = "insert into usuario(nome, email, senha, endereco, bairro, cidade, uf, cep, dt_cadastro)";
    script += "values (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP())";

    db.query(script, [
        request.body.nome, 
        request.body.email, 
        request.body.senha,
        request.body.endereco,
        request.body.bairro,
        request.body.cidade,
        request.body.uf,
        request.body.cep,
    ], function(error, result){
        if (error) {
            return response.status(500).send(error);
        } else {
            return response.status(201).json({id_usuario: result.insertId});
        }
    });
    
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// Alterando um usuário...
controllerUsuarios.put("/usuarios/:id_usuario", function(request, response) {
    let script = "update usuario set nome = ?, email = ?, senha = ?, endereco = ?, ";
    script += "bairro = ?, cidade = ?, uf = ?, cep = ? ";
    script += "where id_usuario = ? ";

    db.query(script, [
        request.body.nome, 
        request.body.email, 
        request.body.senha,
        request.body.endereco,
        request.body.bairro,
        request.body.cidade,
        request.body.uf,
        request.body.cep,
        request.params.id_usuario,
    ], function(error, result){
        if (error) {
            return response.status(500).send(error);
        } else {
            return response.status(200).json({id_usuario: request.params.id_usuario});
        }
    });
    
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 


export default controllerUsuarios;
