
import express from 'express';
import cors from 'cors';
import db from './config/database.js';

const app = express();

// Middlewares JSON - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    app.use(express.json());

// Middleware CORS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

    app.use(cors());

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    // Query Params...
    app.get("/usuarios", function(request, response) {
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
    app.get("/usuarios/:id", function(request, response) {
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

    app.post("/usuarios/login", function(request, response) {
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

        const body = request.body;
        console.log(body);
    });


// --------------------------------------------------------------------------------------------

    // Iniciando o servidor... 
    app.listen(3000, function() {
        console.log('Servidor no ar 🥶 ...');
    });

