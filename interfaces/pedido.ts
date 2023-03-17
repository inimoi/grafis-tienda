import { MenuHTMLAttributes } from "react";
import { IUser } from "./";



//en el pedido tiene que venir los datos del usuario, los datos de los items y la direccion de envio y metodo de pago
export interface IPedido {

    _id?: string;
    user?: IUser | string;
    pedidoItems: IPedidoItem[];
    shippingAddress: ShippingAddress;
    paymentResult?: string;

    numberOfItems: number;
    subTotal: number;
    impuesto: number,
    total: number;

    isPaid: boolean;
    paidAt?: string;

    transactionId?: string;

    createdAt?: string;
    updatedAt?: string;
}


//interface para  el item del pedido
export interface IPedidoItem {

    _id: string;
    titulo: string;
    cantidad: number;
    slug: string;
    image: string;
    precio: number;

}


//interfcae para guardar los dtos de la direccion
export interface ShippingAddress {
    nombre: string;
    apellido: string;
    direccion: string;
    direccion2?: string;
    codigoPostal: string;
    ciudad: string;
    provincia: string;
    telefono: string;

}
