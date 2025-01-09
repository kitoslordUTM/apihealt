import { Router, Request, Response } from "express";
import { Patient } from "../models/Patient";
import postgresProfile from "../database/db";


const router = Router();

router.get('/Get', async (req: Request, res: Response) => {
    try {
        const query = 'SELECT * FROM Patient';
        const response = await postgresProfile.query<Patient>(query);
        res.status(200).json(response.rows);
    } catch (err: any) {
        res.status(500).send('No se obtuvieron todas las alarmas');
    }
});


// Insertar un paciente
router.post('/Post', async (req: Request, res: Response) => {
    try {
        const { patientId ,name, age, gender, historialId }: Patient = req.body;

        // Consulta SQL corregida
        const query = 'INSERT INTO Patient (patientId, name, age, gender, historialId) VALUES ($1, $2, $3, $4 , $5)';
        const values = [patientId, name, age, gender, historialId];

        // Ejecutar la consulta
        await postgresProfile.query(query, values);

        res.status(201).send('Paciente creado correctamente');
    } catch (err) {
        // Log detallado del error para depuración
        console.error('Error al crear el paciente:', err);
        res.status(500).send('Error al crear el paciente');
    }
});



// Actualizar un paciente
router.patch('/Patch', async (req: Request, res: Response) => {
    const { patientId, name, age, gender, historialId } = req.body;

    try {
        const query = `UPDATE Patient 
                       SET name = $2, age = $3, gender = $4, historialId = $5 
                       WHERE patientId = $1 RETURNING *`;
        const values = [patientId, name, age, gender, historialId];

        const response = await postgresProfile.query<Patient>(query, values);
        res.status(200).json(response.rows[0]); // Devuelve el paciente actualizado
    } catch (error) {
        console.error("Error editando el paciente:", error);
        res.status(500).send('Error editando el paciente');
    }
});

// Eliminar un paciente
router.delete('/Delete/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const query = `DELETE FROM Patient WHERE patientId = $1 RETURNING *`;
        const response = await postgresProfile.query<Patient>(query, [id]);

        if (response.rowCount === 0) {
            res.status(404).send('Paciente no encontrado');
        } else {
            res.status(200).json(response.rows[0]); // Devuelve el paciente eliminado
        }
    } catch (error) {
        console.error("Error eliminando el paciente:", error);
        res.status(500).send('Error eliminando el paciente');
    }
});

export default router;
