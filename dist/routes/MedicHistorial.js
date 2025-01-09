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
        const query = 'SELECT * FROM MedicHistorial';
        const response = yield db_1.default.query(query);
        res.status(200).json(response.rows);
    }
    catch (err) {
        res.status(500).send('No se obtuvo todo el historial');
    }
}));
router.post('/Post', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { patientId } = req.body;
    try {
        const query = 'INSERT INTO MedicHistorial (patientId) VALUES ($1)';
        const values = [patientId];
        yield db_1.default.query(query, values);
        res.status(201).send('Historial medico registrado correctamente');
    }
    catch (err) {
        res.status(500).send('Error registrando el historial ');
    }
}));
exports.default = router;
