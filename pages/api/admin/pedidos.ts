import type { NextApiRequest, NextApiResponse } from 'next'

import { db } from '../../../database';
import { Pedido } from '../../../models';
import { IPedido } from '../../../interfaces/pedido';



type Data = 
| { message: string }
| IPedido[]



export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch ( req.method ) {
        case 'GET':
            
            return getPedidos(req, res );
            
    
        default:
            
            return res.status(400).json({ message: 'Bad Request'})
    }
    
    
}

const getPedidos = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   
    await db.connect();

    const pedidos = await Pedido.find()
        .sort({ createAt: 'desc'})
        .populate('user', 'name email')   //para refrenciar a otros objetos de a BBDD
        .lean();

    await db.disconnect();

    return res.status(200).json( pedidos );

}
