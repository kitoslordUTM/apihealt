import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt';

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
};