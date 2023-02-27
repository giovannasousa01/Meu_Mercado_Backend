
import express from 'express';

const app = express();

// Middlewares JSON - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    app.use(express.json());

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    // Query Params...
    app.get("/clientes", function(request, response) {
        console.log(request.query);
        return response.send("Listando todos os clientes em ordem...");
    });

    //URI Params...
    app.get("/clientes/:id_cliente", function(request, response) {
        return response.send("Listando cliente específico: " + request.params.id_cliente);
    });

    app.post("/clientes", function(request, response) {
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

