import 'dotenv/config'
import express, { Application, Request, Response } from 'express';
import patientRoute from './routes/patientRoute'
import medicRoute from './routes/medicRoute'
import alertRoute from './routes/alertRoute'
import notifyRoute from './routes/notifyRoute'
import vitslSignRoute from './routes/vitalSignRoute'
import medicActionRoute from './routes/medicActionRoute'
import MedicHistorial from './routes/MedicHistorial'
import userRoute from './routes/userRoute'

import cors from 'cors';

const app: Application = express();
const PORT =  process.env.PORT || 3007;

// Middleware para habilitar CORS
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());
app.use('/patient', patientRoute)
app.use('/medic' , medicRoute)
app.use('/alert', alertRoute)
app.use('/notify', notifyRoute)
app.use('/vital', vitslSignRoute)
app.use('/action', medicActionRoute)
app.use('/historial', MedicHistorial)
app.use('/user', userRoute)


// Ruta de prueba
app.get('/', (req: Request, res: Response) => {
  res.send('¡Hola, mundo desde TypeScript!');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
