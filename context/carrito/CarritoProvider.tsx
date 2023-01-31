
import { FC, useEffect, useReducer} from 'react';
import Cookies from 'js-cookie';  //sale un error por el tipado de Typescript

import { ICarritoProduct } from '../../interfaces';
import { CarritoContext, carritoReducer} from './';



export interface CarritoState  {
    isLoaded: boolean;
    carrito: ICarritoProduct[];
    numberOfItems: number;
    subTotal: number;
    impuesto: number,
    total: number;
    //de la direccion
    shippingAddress?: ShippingAddress;
}

interface Props{
    
    children: React.ReactNode;
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


const CARRITO_INITIAL_STATE: CarritoState = {
    isLoaded: false,
    carrito: [],
    numberOfItems: 0,
    subTotal: 0,
    impuesto: 0,
    total: 0,
    shippingAddress: undefined,
}


export const CarritoProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer( carritoReducer, CARRITO_INITIAL_STATE);

     // efecto para tomar las cookies y pasarlas al carrito
     useEffect(()=>{          
        try {
            const cookieProducts = Cookies.get('carrito') ? JSON.parse( Cookies.get('carrito')! ): [];    //si exiten cookies las carga en la constante sino array vacío.
            dispatch({ type: '[Carrito] - LoadCart from cookies | storage', payload: cookieProducts});   
        } catch (error) {
            dispatch({ type: '[Carrito] - LoadCart from cookies | storage', payload:[]});  
        }
                                      

    }, [])          //sin dependencias


    //useeffect de la direccion
    useEffect(()=>{   
       
        if ( Cookies.get('nombre')) {
            
            const shippingAddress = {
                nombre: Cookies.get('nombre') || '' ,
                apellido: Cookies.get('apellido') || '' ,
                direccion: Cookies.get('direccion') || '' ,
                direccion2: Cookies.get('direccion2') || '' ,
                codigoPostal: Cookies.get('codigoPostal') || '' ,
                ciudad: Cookies.get('ciudad') || '' ,
                provincia: Cookies.get('provincia') || '' ,
                telefono: Cookies.get('telefono') || '' ,
           } 
           dispatch({ type:'[Carrito] - LoadAddress from Cookies', payload: shippingAddress })
        }       
       
    }, [])


    useEffect(()=>{          //el useefect para que carge las cookies cuand cambia el state    
        //covierte el objeto en un string para las cookies
        //esta es la solucion que da el profesor 
        //Cookies.set( 'carrito', JSON.stringify( state.carrito));   

        //esta solucion es la que funciona para mantener el carrito aunque se refresque la pagina
        if (state.carrito.length > 0) Cookies.set('carrito', JSON.stringify(state.carrito))                          

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

    //funcion para actualizar la direccion
    const updateAddress = ( address: ShippingAddress) => {
        Cookies.set('nombre', address.nombre );
        Cookies.set('apellido', address.apellido );
        Cookies.set('direccion', address.direccion );
        Cookies.set('direccion2', address.direccion2 || ' ');
        Cookies.set('codigoPostal', address.codigoPostal );
        Cookies.set('ciudad', address.ciudad );
        Cookies.set('provincia', address.provincia );
        Cookies.set('telefono', address.telefono );

        dispatch({ type:'[Carrito] - Update Address', payload: address})
    }
 

    return (
        <CarritoContext.Provider value={{
             ...state,   

             //Metodos
             addProductToCarrito,
             updateCarritoCantidad,
             eliminarCarritoProducto,
             updateAddress,
        }}>
            { children }
        </CarritoContext.Provider>    
    )
};