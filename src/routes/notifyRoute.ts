import { Express, Request, Response } from "express";
import postgresProfile from "../database/db";
import { Router } from "express";
import { Notify } from "../models/Notify";


const router = Router();

router.get('/Get', async (req: Request, res: Response) => {
    try {
        const query = 'SELECT * FROM Notifications';
        const response = await postgresProfile.query<Notify>(query);
        res.status(200).json(response.rows);
    } catch (err: any) {
        res.status(500).send('No se obtuvieron todas las alarmas');
    }
});



// Insertar una alerta
router.post('/Post', async (req: Request, res: Response) => {
    try {
        // Obtener los datos del cuerpo de la solicitud
        const { notificacionId, destiny, messageNotifiaction }: Notify = req.body;

        // Consulta SQL para insertar en la tabla notifications
        const query = `
            INSERT INTO notifications (notificacion_id, destiny, message_notification)
            VALUES ($1, $2, $3)
        `;
        const values = [notificacionId, destiny, messageNotifiaction];

        // Ejecutar la consulta
        await postgresProfile.query(query, values);

        // Enviar respuesta de éxito
        res.status(201).send('Notificación creada correctamente');
    } catch (err) {
        // Log detallado del error para depuración
        console.error('Error al crear la notificación:', err);
        res.status(500).send('Error al crear la notificación');
    }
});


export default router;
