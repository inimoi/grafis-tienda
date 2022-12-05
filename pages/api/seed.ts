import { db, seedDatabase } from '../../database';
import type { NextApiRequest, NextApiResponse } from 'next'
import { Product } from '../../models';

type Data = {
    message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    

    //cuando estemos en produciión no se puede volver a recargar la BBDD porque sino nos la cargamos
    if ( process.env.NODE_ENV === 'production'){
        return res.status(401).json({ message: 'No tiene acceso a esta API'})
    }
    
    await db.connect();
    await Product.deleteMany();  //purga la base de datos
    await Product.insertMany( seedDatabase.initialData.products )

    await db.disconnect();

    res.status(200).json({ message: 'Proceso realizado correctamente' })
}