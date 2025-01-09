import { Router, Request, Response } from "express";
import { MedicHistorial } from "../models/MedicHistorial";
import postgresProfile from "../database/db";

const router = Router();

router.get('/Get', async (req: Request, res: Response) => {
    try {
        const query = 'SELECT * FROM MedicHistorial';
        const response = await postgresProfile.query<MedicHistorial>(query);
        res.status(200).json(response.rows);
    } catch (err: any) {
        res.status(500).send('No se obtuvo todo el historial');
    }
});




router.post('/Post', async ( req: Request, res: Response) =>{

    const { patientId}: MedicHistorial = req.body;
    try{
    const query= 'INSERT INTO MedicHistorial (patientId) VALUES ($1)'
    const values = [patientId]
    await postgresProfile.query<MedicHistorial>(query, values )

    res.status(201).send('Historial medico registrado correctamente');
    }
    catch ( err ){
        res.status(500).send('Error registrando el historial ');
    }
} )

export default router
