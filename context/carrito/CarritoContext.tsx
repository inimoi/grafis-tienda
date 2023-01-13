import { createContext } from 'react';
import { ICarritoProduct } from '../../interfaces';


interface ContextProps {
    carrito: ICarritoProduct[];
    numberOfItems: number;
    subTotal: number;
    impuesto: number,
    total: number;

    //Metodos
    addProductToCarrito: ( product: ICarritoProduct)=> void;
    updateCarritoCantidad: ( product: ICarritoProduct) => void;
    eliminarCarritoProducto: ( product: ICarritoProduct) => void;
}


export const CarritoContext = createContext( {} as ContextProps )