import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { IPaypal } from '../../../interfaces';
import { Pedido } from '../../../models';



type Data = {
    message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch ( req.method ) {
        case 'POST':
            
            return payPedido( req, res );
    
        default:
            return res.status(400).json({ message: 'Bad Request' })
    }
    
    
}

const getPaypalBearerToken = async ():Promise<string | null> => {

    const PAYPAL_CLIENT = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

    //creamos la base para cceder
    const base64Token = Buffer.from(`${ PAYPAL_CLIENT }:${ PAYPAL_SECRET }`, 'utf-8').toString('base64');
    const body = new URLSearchParams('grant_type=client_credentials');


    try {
        
        const { data } = await axios.post( process.env.PAYPAL_OAUTH_URL || '', body, {
            headers:{
                'Authorization': `Basic ${ base64Token }`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })

        return data.access_token;


    } catch ( error ) {     
        if ( axios.isAxiosError( error )) {
            console.log( error.response?.data) 
        } else {
            console.log( error )
        }
        
        return null;
    }


}



const payPedido = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    //TODO: validar sesion usuario
    //TODO: validar MongoID


    const paypalBearerToken = await getPaypalBearerToken();

    if ( !paypalBearerToken ) {
        return res.status( 400 ).json({ message: 'No se pudo confirmar el token de paypal'});
    }
    
    //si tenemos el token
    const { transactionId = '', pedidoId = ''} = req.body;  //cuando nos pidan esta api nos llegaran estos datos

    const { data } = await axios.get<IPaypal.PaypalOrderStatusResponse>( `${process.env.PAYPAL_ORDERS_URL}/${ transactionId }` , {
        headers: {
            'Authorization': `Bearer ${ paypalBearerToken }`
        }
    });

    //validacion por status e la data
    if ( data.status !== 'COMPLETED') {
        return res.status(401).json({ message: 'Pedido no reconocido'})
    }
 
    //ahora nos conectamos a nuestra base de datos para ver si existe el id que viene del body
    await db.connect();
    const dbPedido = await Pedido.findById( pedidoId );

    if( !dbPedido ) {
        await db.disconnect();
        return res.status(400).json({ message: 'Pedido no existe en nuestra base de datos'});
    }

    //validaciones del total, comparamos lo dela base de datos con el total que viene de paypal
    if( dbPedido.total !== Number(data.purchase_units[0].amount.value )) {
        await db.disconnect();
        return res.status(400).json({ message: 'El total de Paypal y nuestro pedido no son iguales'});
    }


    //Ahora que tenemos el pedido y lo hemos macheado con el total de paypal le pasamos el transactionID a nuestro pedido de la BBDD
    dbPedido.transactionId = transactionId;

    //tambien lo ponemos como pagado
    dbPedido.isPaid = true;
    await dbPedido.save();

    await db.disconnect();

    return res.status(200).json({ message: 'Orden pagada'})
    
    
}
