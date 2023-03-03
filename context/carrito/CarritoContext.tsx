import { createContext } from 'react';
import { ICarritoProduct, ShippingAddress } from '../../interfaces';



interface ContextProps {
    isLoaded: boolean;
    carrito: ICarritoProduct[];
    numberOfItems: number;
    subTotal: number;
    impuesto: number,
    total: number;

    //para guardar los datos de la direccion en el contexto
    shippingAddress?: ShippingAddress;

    //Metodos
    addProductToCarrito: ( product: ICarritoProduct)=> void;
    updateCarritoCantidad: ( product: ICarritoProduct) => void;
    eliminarCarritoProducto: ( product: ICarritoProduct) => void;
    updateAddress: (address: ShippingAddress) => void;

    //pedidos
    createPedido: () => Promise<{ hasError: boolean, message: string }>;

}


export const CarritoContext = createContext( {} as ContextProps )