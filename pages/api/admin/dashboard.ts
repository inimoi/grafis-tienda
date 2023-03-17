import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { Pedido, Product, User } from '../../../models';


type Data = {
    numberOfOrders: number;
    paidOrders: number;    // isPaid true
    notPaidOrders: number;
    numberOfClients: number;   // role: client
    numberOfProducts: number;
    productsWithNoInventory: number;   // productos a 0
    lowInventrory: number;  //productos demenos de 10 articulos
}


export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    //aqui da igual que venga un post, un get siempre va a tener la misma respuesta.
    
    //primera manera
    /* db.connect();
    const numberOfOrders = await Pedido.count();
    const paidOrders = await Pedido.find({ isPaid: true }).count();
    const numberOfClients = await User.find({ role: 'cliente'}).count();
    const numberOfProducts = await Product.count();
    const productsWithNoInventory = await Product.find({ enStock: 0 }).count();
    const lowInventrory = await Product.find({ enStock: { $lte: 10 }}).count();
    
    db.disconnect();
    
    
    res.status(200).json({
        numberOfOrders, 
        paidOrders, 
        numberOfClients, 
        numberOfProducts, 
        productsWithNoInventory, 
        lowInventrory, 
        notPaidOrders: numberOfOrders - paidOrders

    })
 */


    //segunda manera
    db.connect();

    const [
        numberOfOrders,
        paidOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoInventory,
        lowInventrory,
    ] = await Promise.all([
        Pedido.count(),
        Pedido.find({ isPaid: true }).count(),
        User.find({ role: 'cliente'}).count(),
        Product.count(),
        Product.find({ enStock: 0 }).count(),
        Product.find({ enStock: { $lte: 10 }}).count(), 

    ])


    db.disconnect();

    res.status(200).json({
        numberOfOrders, 
        paidOrders, 
        numberOfClients, 
        numberOfProducts, 
        productsWithNoInventory, 
        lowInventrory, 
        notPaidOrders: numberOfOrders - paidOrders

    })


}