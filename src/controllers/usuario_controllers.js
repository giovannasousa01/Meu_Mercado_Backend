import {Router} from 'express';
import express from 'express';
import db from '../config/database.js';

const controllerUsuarios = Router();

controllerUsuarios.use(express.json());

// Query Params......

// Listando todos os usuarios...
controllerUsuarios.get("/usuarios", function(request, response) {
    let query = "select id_usuario, nome, email, senha, endereco, bairro, cidade, uf, cep, " +
    "DATE_FORMAT(dt_cadastro, '%d/%m/%Y %H:%i:%s') AS dt_cadastro from usuario";
    db.query(query, function(error, result) {
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
    let query = "select id_usuario, nome, email, senha, endereco, bairro, cidade, uf, cep, ";
    query += "DATE_FORMAT(dt_cadastro, '%d/%m/%Y %H:%i:%s') AS dt_cadastro ";
    query += "from usuario where id_usuario = ?;";
    db.query(query,[request.params.id], function(error, result) {
        if (error) {
            return response.status(500).send(error);
        } else {
            console.log(result);
            return response.status(result.lenght > 0 ? 200 : 404).json(result[0]);
        }
    }); 
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// Fazendo login de um usuário...
controllerUsuarios.post("/usuarios/login", function(request, response) {
    let query = "select id_usuario, nome, email, senha, endereco, bairro, cidade, uf, cep, ";
    query += "DATE_FORMAT(dt_cadastro, '%d/%m/%Y %H:%i:%s') AS dt_cadastro ";
    query += "from usuario where email = ? and senha = ?;";

    db.query(query, [request.body.email, request.body.senha], function(error, result){
        if (error) {
            return response.status(500).send(error);
        } else {
            
            return response.status(result.lenght > 0 ? 200 : 401).json(result[0]);
        }
    });
    
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// Fazendo cadastro de um usuário...
controllerUsuarios.post("/usuarios/cadastro", function(request, response) {
    let query = "insert into usuario(nome, email, senha, endereco, bairro, cidade, uf, cep, dt_cadastro)";
    query += "values (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP())";

    db.query(query, [
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
    let query = "update usuario set nome = ?, email = ?, senha = ?, endereco = ?, ";
    query += "bairro = ?, cidade = ?, uf = ?, cep = ? ";
    query += "where id_usuario = ? ";

    db.query(query, [
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

// Alterando um usuário...
controllerUsuarios.delete("/usuarios/:id_usuario", function(request, response) {
    let query = "delete from usuario where id_usuario = ?";

    db.query(query, [request.params.id_usuario], function(error, result){
        if (error) {
            return response.status(500).send(error);
        } else {
            return response.status(200).json({id_usuario: request.params.id_usuario});
        }
    });
    
});



export default controllerUsuarios;
