import { isValidObjectId } from "mongoose";
import { db } from ".";
import { IPedido } from "../interfaces";
import { Pedido } from "../models";



export const getPedidoById = async( id:string ):Promise<IPedido | null> => {

    //valida primero si el id que viene es un id de mongo
    if ( !isValidObjectId(id)) {
        return null;
    }

    await db.connect();
    const pedido = await Pedido.findById( id ).lean();
    await db.disconnect();

    //valida si hay un pedido con ese id
    if ( !pedido ) {
        return null 
    }

    //si hay un pedido con esa id
    return JSON.parse(JSON.stringify( pedido ));
    

}


//funcion para obtener los pedidos de un usuario
export const getPedidosByUser = async ( userId: string ):Promise<IPedido[]> => {

//validar si es un id de mongo
if ( !isValidObjectId) {
    return [];
}

//buscar los pedido por el id
await db.connect();

const pedidos = await Pedido.find({ user: userId }).lean();

await db.disconnect();

return JSON.parse(JSON.stringify(pedidos));

}