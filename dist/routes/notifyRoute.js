"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../database/db"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/Get', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = 'SELECT * FROM Notifications';
        const response = yield db_1.default.query(query);
        res.status(200).json(response.rows);
    }
    catch (err) {
        res.status(500).send('No se obtuvieron todas las alarmas');
    }
}));
// Insertar una alerta
router.post('/Post', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obtener los datos del cuerpo de la solicitud
        const { notificacionId, destiny, messageNotifiaction } = req.body;
        // Consulta SQL para insertar en la tabla notifications
        const query = `
            INSERT INTO notifications (notificacion_id, destiny, message_notification)
            VALUES ($1, $2, $3)
        `;
        const values = [notificacionId, destiny, messageNotifiaction];
        // Ejecutar la consulta
        yield db_1.default.query(query, values);
        // Enviar respuesta de éxito
        res.status(201).send('Notificación creada correctamente');
    }
    catch (err) {
        // Log detallado del error para depuración
        console.error('Error al crear la notificación:', err);
        res.status(500).send('Error al crear la notificación');
    }
}));
exports.default = router;
