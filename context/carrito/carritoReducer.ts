
import { CarritoState, ShippingAddress } from './';
import { ICarritoProduct } from '../../interfaces';



type CarritoActionType =
    | { type: '[Carrito] - LoadCart from cookies | storage', payload: ICarritoProduct[]}
    | { type: '[Carrito] - Update products in cart', payload: ICarritoProduct[]}
    | { type: '[Carrito] - Change cart quantity', payload: ICarritoProduct}
    | { type: '[Carrito] - Remove product in cart', payload: ICarritoProduct}
    | { type: '[Carrito] - LoadAddress from Cookies', payload: ShippingAddress}
    | { type: '[Carrito] - Update Address', payload: ShippingAddress}
    | {
        type: '[Carrito] - Update order summary' ,
        payload: {
            numberOfItems: number;
            subTotal: number;
            impuesto: number,
            total: number;

        }
    }


export const carritoReducer = ( state: CarritoState, action: CarritoActionType ): CarritoState => {

    switch (action.type) {
        case '[Carrito] - LoadCart from cookies | storage':
            return {
                ...state,
                isLoaded: true,
                carrito: [...action.payload]
            }
            
        case '[Carrito] - Update products in cart':
            return {
                ...state,
                carrito:[...action.payload]
            }

        case '[Carrito] - Change cart quantity':
            return {
                ...state,
                carrito: state.carrito.map( product =>{
                    if ( product._id !== action.payload._id ) return product;

                    return action.payload;
                })
            }

        case '[Carrito] - Remove product in cart':
            return {
                ...state,
                carrito: state.carrito.filter( product => !(product._id === action.payload._id))        

            }

        case '[Carrito] - Update order summary':
            return {
                ...state,
                ...action.payload
            }

        case '[Carrito] - LoadAddress from Cookies':
            return {
                ...state,
                shippingAddress: action.payload
            } 

        case '[Carrito] - Update Address':
            return {
                ...state,
                shippingAddress: action.payload
            }        
        
        default:
            return state
    }
}   