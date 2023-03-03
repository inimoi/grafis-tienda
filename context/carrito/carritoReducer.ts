
import { CarritoState} from './';
import { ICarritoProduct, ShippingAddress} from '../../interfaces';



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
    // nueva accion para limpiar el carrito cuando el pedido es ok
    | { type: '[Carrito] - Order Complete' }


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
        
        case '[Carrito] - Order Complete':
            return {
                ...state,
                carrito: [],
                numberOfItems: 0,
                subTotal: 0,
                impuesto: 0,
                total: 0,
            }
        
        default:
            return state
    }
}   