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
        const query = 'SELECT * FROM Alerts';
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
        const { alertId, message, patientId, medicId } = req.body;
        // Consulta SQL para insertar en la tabla alerts
        const query = `
            INSERT INTO alerts (alert_id, message, patient_id, medic_id)
            VALUES ($1, $2, $3, $4)
        `;
        const values = [alertId, message, patientId, medicId];
        // Ejecutar la consulta
        yield db_1.default.query(query, values);
        res.status(201).send('Alerta creada correctamente');
    }
    catch (err) {
        // Log detallado del error para depuración
        console.error('Error al crear la alerta:', err);
        res.status(500).send('Error al crear la alerta');
    }
}));
exports.default = router;
