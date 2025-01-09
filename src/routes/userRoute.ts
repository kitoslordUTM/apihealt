import  {  Request, Response,  } from 'express';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt';
import postgresProfile from '../database/db'; // Conexión a la base de datos
import { Router } from 'express';

const router = Router();

// Registro de usuario
router.post('/registrer', async ( req: Request, res: Response)=>{
    const { email, password, username } = req.body;
  
    try {
      // Validar que no falten datos
      if (!email || !password || !username) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
      }
  
      // Verificar si el email ya existe
      const emailCheckQuery = 'SELECT email FROM Users WHERE email = $1';
      const emailCheckResult = await postgresProfile.query(emailCheckQuery, [email]);
      if (emailCheckResult.rows.length > 0) {
        return res.status(400).json({ message: 'El correo ya está registrado' });
      }
  
      // Hashear la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Insertar el nuevo usuario
      const insertQuery = 'INSERT INTO Users (email, pasword, username) VALUES ($1, $2, $3)';
      await postgresProfile.query(insertQuery, [email, hashedPassword, username]);
  
      res.status(201).json({ message: 'Usuario registrado con éxito' });
    } catch (err) {
      console.error('Error al registrar usuario:', err);
      res.status(500).json({ message: 'Error al registrar el usuario' });
    }

})

// Login de usuario
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const query = 'SELECT * FROM Users WHERE email = $1';
    const result = await postgresProfile.query(query, [email]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = generateToken(user.id); // Generar token
    res.status(200).json({ token }); // Enviar token al cliente
  } catch (err) {
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
});

export default router;
