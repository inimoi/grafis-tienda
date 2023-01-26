
import { FC, useEffect, useReducer } from 'react';

import axios from 'axios';
import Cookies from 'js-cookie';

import { grafisApi } from '../../api';
import { IUser } from '../../interfaces';
import { AuthContext, authReducer } from './';

//esta interfaz es la del estado de la información que se almacena, lo que tiene el estado
export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser;
}

interface Props{
    
    children: React.ReactNode;
}


const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined,
}


export const AuthProvider: FC<Props>= ( { children } ) => {

    const [ state, dispatch ] = useReducer( authReducer, AUTH_INITIAL_STATE);

    //useEfecct de la persitencia del token, no le vamos a poner dependencias por lo que solo se va a disparar solo una vez
    useEffect( () => {
        checkToken();
    }, [])

    //funcion para la persitencia del token
    const checkToken = async () => {
        try {
            const { data } = await grafisApi.get('/user/validate-token');
            const { token, user } = data;
            //ahora vamos a guardar esta información en cookies
            Cookies.set('token', token);
            dispatch({ type: '[Auth] - Login', payload: user});
            

        } catch (error) {
            Cookies.remove('token');
        }
    }

    //funciones para el login
    const loginUser = async ( email: string, password: string ): Promise<boolean> => {

        try {
            const { data } = await grafisApi.post('/user/login', { email, password });
            const { token, user } = data;
            //ahora vamos a guardar esta información en cookies
            Cookies.set('token', token);
            dispatch({ type: '[Auth] - Login', payload: user});
            return true;

        } catch (error) {
            return false
        }
    }

    const registerUser = async ( name:string, email: string, password: string): Promise<{hasError:boolean; message?:string}> => {
        
        try {
            const { data } = await grafisApi.post('/user/register', { name, email, password });
            const { token, user } = data;
            //ahora vamos a guardar esta información en cookies
            Cookies.set('token', token);
            dispatch({ type: '[Auth] - Login', payload: user});

            return {
                hasError: false,                
            }
            
        } catch (error) {
            if ( axios.isAxiosError(error)) {
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            }

            return {
                hasError: true,
                message: "No se pudo crear el usuario - intente de nuevo"
            }
        }
    }

    return (
        <AuthContext.Provider value={{
            ...state,

            //metodos
            loginUser,
            registerUser,
        }}>
            { children }
        </AuthContext.Provider>    
    )
}