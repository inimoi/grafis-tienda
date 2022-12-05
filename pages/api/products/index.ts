
import type { NextApiRequest, NextApiResponse } from 'next'
import { db, SHOP_CONSTANTS } from '../../../database';
import { IProduct } from '../../../interfaces';
import { Product } from '../../../models';

type Data = 
| { message: string }
| IProduct[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch ( req.method ) {
        case 'GET':            
            return getProducts ( req, res )
    
        default:
            return res.status(400).json({
                message: 'Bad request'
            })
    }
    

}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
 
    const { categoria = 'todo' } =  req.query;

    let condition = {}

    if ( categoria !== 'todo' && SHOP_CONSTANTS.categoriasValidas.includes( `${categoria}` )) {
        condition = { categoria }
    }

    await db.connect();

    const products = await Product.find( condition )
                                .select('titulo precio imagenes enStock slug -_id')  //seleccionamos los campos quq euremos que traiga, ojo quitamos el _id con el -
                                .lean();

    await db.disconnect();

    return res.status(200).json( products );
 
 
    
}