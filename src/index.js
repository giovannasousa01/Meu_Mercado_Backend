
import express from 'express';

const app = express();

// Middlewares JSON - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    app.use(express.json());

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    // Iniciando o servidor... 
    app.listen(3000, function() {
        console.log('Servidor no ar 🥶 ...');
    });

