"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
// Configura la conexión a tu base de datos
const postgresProfile = new pg_1.Pool({
    user: 'admin', // Usuario configurado en el contenedor
    host: 'localhost', // Dirección de tu base de datos (host local de Docker)
    database: 'examenbd', // Nombre de la base de datos configurada en el contenedor
    password: 'holamundo', // Contraseña configurada en el contenedor
    port: 5439, // Puerto mapeado al host
});
// Probar la conexión
postgresProfile.connect((err, client, release) => {
    if (err) {
        return console.error('Error al conectar a la base de datos:', err.stack);
    }
    console.log('Conexión exitosa a la base de datos');
    release();
});
exports.default = postgresProfile;
