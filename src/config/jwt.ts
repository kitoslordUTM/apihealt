import dotenv from 'dotenv';
dotenv.config();

export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'yourSecretKey', // Llave secreta
  expiresIn: '1h', // Expiración del token
};

