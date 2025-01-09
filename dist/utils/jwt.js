"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_1 = require("../config/jwt");
const generateToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, jwt_1.jwtConfig.secret, { expiresIn: jwt_1.jwtConfig.expiresIn });
};
exports.generateToken = generateToken;
