const express = require('express');
const dbConnection = require('../database/config');

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