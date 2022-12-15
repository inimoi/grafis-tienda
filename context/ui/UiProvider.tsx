

import React, { FC, useReducer} from 'react';
import { UiContext, uiReducer } from './';


export interface UiState {
    isMenuOpen: boolean;                //No tiene nada que ver con el isMenuOpne del context
}

interface Props{
    
    children: React.ReactNode;
}

const UI_INITIAL_STATE: UiState = {
    isMenuOpen: false,
}


export const UiProvider: FC<Props> = ({ children }) => {

    const [ state, dispatch ] = useReducer( uiReducer, UI_INITIAL_STATE)

    const toggleSideMenu = () => {
        dispatch({ type: '[UI] - ToggleMenu'})
    }

    return (
        <UiContext.Provider value={{
            ...state,

            //metodos
            toggleSideMenu,
        }}>
            { children }
        </UiContext.Provider>
    )
}