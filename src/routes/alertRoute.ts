import { Express, Request, Response } from "express";
import postgresProfile from "../database/db";
import { Router } from "express";
import { Alert } from "../models/Alert";


const router = Router();

router.get('/Get', async (req: Request, res: Response) => {
    try {
        const query = 'SELECT * FROM Alerts';
        const response = await postgresProfile.query<Alert>(query);
        res.status(200).json(response.rows);
    } catch (err: any) {
        res.status(500).send('No se obtuvieron todas las alarmas');
    }
});



// Insertar una alerta
router.post('/Post', async (req: Request, res: Response) => {
    try {
        const { alertId, message, patientId, medicId }: Alert = req.body;

        // Consulta SQL para insertar en la tabla alerts
        const query = `
            INSERT INTO alerts (alert_id, message, patient_id, medic_id)
            VALUES ($1, $2, $3, $4)
        `;
        const values = [alertId, message, patientId, medicId];

        // Ejecutar la consulta
        await postgresProfile.query(query, values);

        res.status(201).send('Alerta creada correctamente');
    } catch (err) {
        // Log detallado del error para depuración
        console.error('Error al crear la alerta:', err);
        res.status(500).send('Error al crear la alerta');
    }
});

export default router;
