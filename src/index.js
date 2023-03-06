
import express from 'express';
import cors from 'cors';
import controllerUsuarios from './controllers/usuario_controllers.js';

const app = express();

// Middlewares JSON - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    app.use(express.json());

// Middleware CORS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

    app.use(cors());

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Controllers...
    app.use(controllerUsuarios);
    
// --------------------------------------------------------------------------------------------

    // Iniciando o servidor... 
    app.listen(3000, function() {
        console.log('Servidor no ar 🥶 ...');
    });

