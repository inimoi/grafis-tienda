

import { createContext } from 'react';
import { IUser } from '../../interfaces';

//esta interfaz es lo que los componentes hijo pueden ver fuera de este provider
interface ContextProps {
    isLoggedIn: boolean;
    user?: IUser;

    //metodos
    loginUser: ( email: string, password: string ) =>Promise<boolean> ;
    registerUser: (name: string, email: string, password: string) => Promise<{
        hasError: boolean;
        message?: string;
    }>;
    logout: () => void;


}

export const AuthContext = createContext( {} as ContextProps);


