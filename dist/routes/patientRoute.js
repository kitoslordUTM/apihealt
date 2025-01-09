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
const express_1 = require("express");
const db_1 = __importDefault(require("../database/db"));
const router = (0, express_1.Router)();
router.get('/Get', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = 'SELECT * FROM Patient';
        const response = yield db_1.default.query(query);
        res.status(200).json(response.rows);
    }
    catch (err) {
        res.status(500).send('No se obtuvieron todas las alarmas');
    }
}));
// Insertar un paciente
router.post('/Post', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { patientId, name, age, gender, historialId } = req.body;
        // Consulta SQL corregida
        const query = 'INSERT INTO Patient (patientId, name, age, gender, historialId) VALUES ($1, $2, $3, $4 , $5)';
        const values = [patientId, name, age, gender, historialId];
        // Ejecutar la consulta
        yield db_1.default.query(query, values);
        res.status(201).send('Paciente creado correctamente');
    }
    catch (err) {
        // Log detallado del error para depuración
        console.error('Error al crear el paciente:', err);
        res.status(500).send('Error al crear el paciente');
    }
}));
// Actualizar un paciente
router.patch('/Patch', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { patientId, name, age, gender, historialId } = req.body;
    try {
        const query = `UPDATE Patient 
                       SET name = $2, age = $3, gender = $4, historialId = $5 
                       WHERE patientId = $1 RETURNING *`;
        const values = [patientId, name, age, gender, historialId];
        const response = yield db_1.default.query(query, values);
        res.status(200).json(response.rows[0]); // Devuelve el paciente actualizado
    }
    catch (error) {
        console.error("Error editando el paciente:", error);
        res.status(500).send('Error editando el paciente');
    }
}));
// Eliminar un paciente
router.delete('/Delete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const query = `DELETE FROM Patient WHERE patientId = $1 RETURNING *`;
        const response = yield db_1.default.query(query, [id]);
        if (response.rowCount === 0) {
            res.status(404).send('Paciente no encontrado');
        }
        else {
            res.status(200).json(response.rows[0]); // Devuelve el paciente eliminado
        }
    }
    catch (error) {
        console.error("Error eliminando el paciente:", error);
        res.status(500).send('Error eliminando el paciente');
    }
}));
exports.default = router;
