
import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';

const app = express();


// Conexão com o banco de dados...
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "meu_mercado"
});

// Middlewares JSON - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    app.use(express.json());

// Middleware CORS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

    app.use(cors());

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

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

    //URI Params...
    app.get("/usuarios/:id", function(request, response) {
        let query = "select id_usuario, nome, email, senha, endereco, bairro, cidade, uf, cep, " +
        "DATE_FORMAT(dt_cadastro, '%d/%m/%Y %H:%i:%s') AS dt_cadastro from usuario where id_usuario = ?;" ;
        db.query(query,[request.params.id], function(error, result) {
            if (error) {
                return response.status(500).send(error);
            } else {
                console.log(result);
                return response.status(200).json(result);
                
            }
        }); 
    });

    app.post("/usuarios", function(request, response) {
        const body = request.body;
        console.log(body);
        return response.send("Cadastrando cliente: " + body.nome + 
        " - Email: " + body.email + 
        " - Senha: " + body.senha);
    });

    app.put("/clientes", function(request, response) {
        return response.send("Alterando um cliente com PUT");
    });

    app.patch("/clientes", function(request, response) {
        return response.send("Alterando um cliente com PATCH");
    });

    app.delete("/clientes", function(request, response) {
        return response.send("Excluindo cliente");
    });

// --------------------------------------------------------------------------------------------

    // Iniciando o servidor... 
    app.listen(3000, function() {
        console.log('Servidor no ar 🥶 ...');
    });

