
import { FC, useEffect, useReducer} from 'react';
import Cookie from 'js-cookie';  //sale un error por el tipado de Typescript

import { ICarritoProduct } from '../../interfaces';
import { CarritoContext, carritoReducer} from './';


export interface CarritoState  {
    carrito: ICarritoProduct[];
    numberOfItems: number;
    subTotal: number;
    impuesto: number,
    total: number;
}

interface Props{
    
    children: React.ReactNode;
}


const CARRITO_INITIAL_STATE: CarritoState = {
    carrito: [],
    numberOfItems: 0,
    subTotal: 0,
    impuesto: 0,
    total: 0,
}


export const CarritoProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer( carritoReducer, CARRITO_INITIAL_STATE);

     // efecto para tomar las cookies y pasarlas al carrito
     useEffect(()=>{          
        try {
            const cookieProducts = Cookie.get('carrito') ? JSON.parse( Cookie.get('carrito')! ): [];    //si exiten cookies las carga en la constante sino array vacío.
            dispatch({ type: '[Carrito] - LoadCart from cookies | storage', payload: cookieProducts});   
        } catch (error) {
            dispatch({ type: '[Carrito] - LoadCart from cookies | storage', payload:[]});  
        }
                                      

    }, [])          //sin dependencias


    useEffect(()=>{          //el useefect para que carge las cookies cuand cambia el state    
        //covierte el objeto en un string para las cookies
        Cookie.set( 'carrito', JSON.stringify( state.carrito));                             

    }, [state.carrito])

    //usefefct para el calcular montos
    useEffect(()=>{          
        
        const numberOfItems = state.carrito.reduce( ( prev, current ) => current.cantidad + prev , 0 );
        const subTotal = state.carrito.reduce( ( prev, current ) => (current.precio * current.cantidad) + prev , 0);
        const tasa = Number(process.env.NEXT_PUBLIC_TASA || 0);

        const pedidoResumen = {
            numberOfItems,
            subTotal,
            impuesto: subTotal * tasa,
            total: subTotal * ( tasa + 1)
        }

        //dispara el dispach para que se vean los montos en la página
        dispatch({ type: '[Carrito] - Update order summary', payload: pedidoResumen });


    }, [state.carrito])
   

    const addProductToCarrito = ( product: ICarritoProduct )=>{

        const productInCarrito = state.carrito.some( p => p._id === product._id);  //booleano
        if( !productInCarrito ) return dispatch({ type: '[Carrito] - Update products in cart', payload:[...state.carrito, product] })

        //Acumular
        const updatedProducts = state.carrito.map( p =>{
            if ( p._id !== product._id ) return p;

            // actualizar cantidad
            p.cantidad += product.cantidad;

            return p;
        });

        dispatch({ type: '[Carrito] - Update products in cart', payload: updatedProducts });


    }

    // actualizar cantidad
    const updateCarritoCantidad = ( product: ICarritoProduct) => {
        dispatch({ type: '[Carrito] - Change cart quantity', payload: product});
    }


    //eliminar productos
    const eliminarCarritoProducto = ( product: ICarritoProduct) => {
        dispatch({ type: '[Carrito] - Remove product in cart', payload: product});
    }




    return (
        <CarritoContext.Provider value={{
             ...state,   

             //Metodos
             addProductToCarrito,
             updateCarritoCantidad,
             eliminarCarritoProducto,
        }}>
            { children }
        </CarritoContext.Provider>    
    )
};