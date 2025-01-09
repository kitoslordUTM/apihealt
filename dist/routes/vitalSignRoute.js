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
const route = (0, express_1.Router)();
route.get('/Get', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = 'SELECT * FROM Vitalsign';
        const response = yield db_1.default.query(query);
        res.status(200).json(response.rows);
    }
    catch (err) {
        res.status(500).send('No se obtuvieron todas los signos vitales');
    }
}));
route.post('/Post', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { historialId, typeSign } = req.body;
    try {
        const query = 'INSERT INTO Patient (historialId, typeSign) VALUES ($1, $2)';
        const values = [historialId, typeSign];
        yield db_1.default.query(query, values);
        res.status(201).send('Signo Vital creado correctamente');
    }
    catch (err) {
        res.status(500).send('Error creando signo vital');
    }
}));
exports.default = route;
