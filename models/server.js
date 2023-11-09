const express = require('express');
const dbConnection = require('../database/config');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // Ruta de la api
        this.vehiculosPath = '/api/vehiculos'

        //Conectar Base de datos
        this.conectarBD();
        // Ejecución de los Middlewares
        this.middlewares();
        // Rutas
        this.routes();

    }

    // Conexion a BD
    async conectarBD() {
        await dbConnection();
    }

    // Middlewares
    middlewares(){

        // Cors
       const dominiosPermitidos = [process.env.FRONTEND_URL];

        const corsOptions = {
            origin: function (origin, callback) {
                if (dominiosPermitidos.indexOf(origin) !== -1) {
                    callback(null, true)
                } else {
                    callback(new Error('No permitido por CORS'));
                }
            }
        }

        this.app.use(cors(corsOptions));

        const DIRECTORIO_PERMITIDO_CORS = process.env.FRONTEND_URL;
        this.app.use(cors({
            origin: DIRECTORIO_PERMITIDO_CORS
        })); 

         // Lectura y parseo del body
         this.app.use(express.json());
    }

     // Rutas
     routes() {
        this.app.use(this.vehiculosPath, require('../routes/vehiculo'));
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en puerto', this.port)
        });
    }
}

module.exports = Server;