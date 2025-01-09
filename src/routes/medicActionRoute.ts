import postgresProfile from "../database/db";
import { MedicAction } from "../models/MedicAction";
import { Router, Request, Response } from "express";


 const route = Router();


 route.get('/Get', async ( req: Request, res:Response )=>{

    try{

        const query = 'SELECT * FROM MedicAction';
        const response = await postgresProfile.query<MedicAction>(query);
        
        res.status(200).json(response.rows);

    }
    catch(err: any) {
        res.status(500).send('No se obtuvieron todas los signos vitales');
    }

})


route.post('/Post', async ( req: Request, res: Response) =>{

    const {typeAcion,description, patientId, medicId   }: MedicAction = req.body;
    try{
    const query= 'INSERT INTO MedicAction (historialId, typeSign) VALUES ($1, $2, $3, $4)'
    const values = [typeAcion,description, patientId, medicId  ]
    await postgresProfile.query<MedicAction>(query, values )

    res.status(201).send('Accion medica creada correctamente');
    }
    catch ( err ){
        res.status(500).send('Error creando Accion medica  ');
    }
} )

export default route