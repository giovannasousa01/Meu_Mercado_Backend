
import express from 'express';
import cors from 'cors';
import controllerUsuarios from './controllers/usuario_controllers.js';
import controllerMercado from './controllers/mercado_controllers.js';
import controllerCategorias from './controllers/categorias_controllers.js';

const app = express();

// Middlewares JSON - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    app.use(express.json());

// Middleware CORS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

    app.use(cors());

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Controllers...
    app.use(controllerUsuarios);
    app.use(controllerMercado);
    app.use(controllerCategorias);
    
// --------------------------------------------------------------------------------------------

    // Iniciando o servidor... 
    app.listen(3000, function() {
        console.log('Servidor no ar 🥶 ...');
    });

