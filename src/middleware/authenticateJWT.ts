import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { jwtConfig } from '../config/jwt';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1]; // Extraer token de "Bearer <token>"
    try {
      const decoded = jwt.verify(token, jwtConfig.secret); // Verificar token
      req.user = decoded; // Guardar datos del token en la solicitud
      next(); // Continuar con la solicitud
    } catch (err) {
      return res.status(403).json({ message: 'Token inválido o expirado' });
    }
  } else {
    res.status(401).json({ message: 'No se proporcionó un token' });
  }
};