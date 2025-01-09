import { VitalSign } from "../models/VitalSign";
import { Router, Request, Response } from "express";
import postgresProfile from "../database/db";

const route = Router();


    route.get('/Get', async ( req: Request, res:Response )=>{

        try{

            const query = 'SELECT * FROM Vitalsign';
            const response = await postgresProfile.query<VitalSign>(query);
            
            res.status(200).json(response.rows);

        }
        catch(err: any) {
            res.status(500).send('No se obtuvieron todas los signos vitales');
        }

    })



    route.post('/Post', async ( req: Request, res: Response) =>{

        const {historialId, typeSign }: VitalSign = req.body;
        try{
        const query= 'INSERT INTO Patient (historialId, typeSign) VALUES ($1, $2)'
        const values = [historialId, typeSign]
        await postgresProfile.query<VitalSign>(query, values )

        res.status(201).send('Signo Vital creado correctamente');
        }
        catch ( err ){
            res.status(500).send('Error creando signo vital');
        }
    } )

export default route