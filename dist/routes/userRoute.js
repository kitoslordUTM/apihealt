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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../utils/jwt");
const db_1 = __importDefault(require("../database/db")); // Conexión a la base de datos
const express_1 = require("express");
const router = (0, express_1.Router)();
// Registro de usuario
router.post('/registrer', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, username } = req.body;
    try {
        // Validar que no falten datos
        if (!email || !password || !username) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }
        // Verificar si el email ya existe
        const emailCheckQuery = 'SELECT email FROM Users WHERE email = $1';
        const emailCheckResult = yield db_1.default.query(emailCheckQuery, [email]);
        if (emailCheckResult.rows.length > 0) {
            return res.status(400).json({ message: 'El correo ya está registrado' });
        }
        // Hashear la contraseña
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Insertar el nuevo usuario
        const insertQuery = 'INSERT INTO Users (email, pasword, username) VALUES ($1, $2, $3)';
        yield db_1.default.query(insertQuery, [email, hashedPassword, username]);
        res.status(201).json({ message: 'Usuario registrado con éxito' });
    }
    catch (err) {
        console.error('Error al registrar usuario:', err);
        res.status(500).json({ message: 'Error al registrar el usuario' });
    }
}));
// Login de usuario
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const query = 'SELECT * FROM "user" WHERE email = $1';
        const result = yield db_1.default.query(query, [email]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        const user = result.rows[0];
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }
        const token = (0, jwt_1.generateToken)(user.id); // Generar token
        res.status(200).json({ token }); // Enviar token al cliente
    }
    catch (err) {
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
}));
exports.default = router;
