"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_1 = require("../config/jwt");
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Extraer token de "Bearer <token>"
        try {
            const decoded = jsonwebtoken_1.default.verify(token, jwt_1.jwtConfig.secret); // Verificar token
            req.user = decoded; // Guardar datos del token en la solicitud
            next(); // Continuar con la solicitud
        }
        catch (err) {
            return res.status(403).json({ message: 'Token inválido o expirado' });
        }
    }
    else {
        res.status(401).json({ message: 'No se proporcionó un token' });
    }
};
exports.authenticateJWT = authenticateJWT;
