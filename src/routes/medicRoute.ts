import { Express, Request, Response } from "express";
import postgresProfile from "../database/db";
import { Router } from "express";
import { Medic } from "../models/Medic";



const router = Router();

router.get('/Get', async (req: Request, res: Response) => {
    try {
        const query = 'SELECT * FROM Medic';
        const response = await postgresProfile.query<Medic>(query);
        res.status(200).json(response.rows);
    } catch (err: any) {
        res.status(500).send('No se obtuvieron todas las alarmas');
    }
});


// Insertar un paciente
router.post('/Post', async (req: Request, res: Response) => {
    try {
        const { medicId, name, speciality, contact }: Medic = req.body;

        // Consulta SQL corregida
        const query = 'INSERT INTO Medic (medicId, name, speciality, contact) VALUES ($1, $2, $3, $4)';
        const values = [medicId, name, speciality, contact];

        // Ejecutar la consulta
        await postgresProfile.query(query, values);

        res.status(201).send('Medico creado correctamente');

    } catch (err) {
        // Log detallado del error para depuración
        console.error('Error al crear el paciente:', err);
        res.status(500).send('Error al crear el paciente');
    }
});


export default router