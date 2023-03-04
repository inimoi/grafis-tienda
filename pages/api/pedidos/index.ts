import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import { db } from '../../../database';
import { IPedido } from '../../../interfaces';
import { Pedido, Product } from '../../../models';



type Data = 
|   {message: string }
|   IPedido;


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch ( req.method ) {
        case 'POST':
            return createPedido( req, res);
            
    
        default:
            return res.status(400).json({ message: 'Bad request' })
            
    }
    
}

const createPedido = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    //desestructuracion de propiedades que vienen del body del frontend
    const { pedidoItems, total } = req.body as IPedido;

    //validaciones, verificar que tengamos un usuario. gestsession de next auth, en la req van las cookies
    const session:  any = await getSession({ req });
    if ( !session ) {
        return res.status(401).json({message: 'Debe de estar autenticado para hacer esto'});
    }

    //vamos a verificar que los precios de la BBDD es igual a los que vienen del frontend: IMPORTANTE
    //Creamos un arreglo con los productos que vienen del frontend
    const productsIds = pedidoItems.map( product => product._id );
    //creamos una arreglo de la bbdd con los ids que vienen del frontend. para eso nos conectamos a la bbdd primero
    await db.connect();
    const dbProducts = await Product.find({ _id: { $in: productsIds }});
    
    try {
        
        const subTotal = pedidoItems.reduce( ( prev, current ) => {
            const currentPrice = dbProducts.find( prod => prod.id === current._id)?.precio;
            if ( !currentPrice ) {
                throw new Error('verifique el carrito de nuevo, producto no existe');
            }

            return ( currentPrice * current.cantidad) + prev;
        }, 0)

        const impuesto = Number(process.env.NEXT_PUBLIC_TASA || 0 );
        const backendTotal = subTotal * ( impuesto + 1 );

        //el total es el que viene del frontend
        if ( total !== backendTotal) {
            throw new Error('El total no cuadra con el monto');
        }

        //Si va todo bien
        const userId = session.user._id;
        const newPedido = new Pedido({ ...req.body, isPaid: false, user: userId });      //Pedido de los models, creamos el pedido 
        //ponemso dos decimales al total
        newPedido.total = Math.round( newPedido.total * 100 ) / 100;

        await newPedido.save();    //grabamos el pedido en la BBDD
        await db.disconnect();

        return res.status(201).json( newPedido );     //ya hemos puesto en la Data que también pueda ser de tipo IPedido


    } catch (error:any) {
        await db.disconnect();
        console.log(error);
        res.status(400).json({
            message: error.message || 'Revise logs del servidor'
        })
    }

    return res.status(201).json( req.body );

}
