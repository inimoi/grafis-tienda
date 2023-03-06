import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"

import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material'

import { lightTheme } from '../themes/light-theme';
import { SWRConfig } from 'swr';
import { UiProvider, CarritoProvider, AuthProvider } from '../context';


function MyApp({ Component, pageProps }: AppProps) {
  return(
    <SessionProvider>
      <SWRConfig 
      value={{
        // refreshInterval: 3000,   Esto es is queremos que se mantenga actualizada nuestra pagina.
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }}
      > 
        <AuthProvider>
          <CarritoProvider>
              <UiProvider>
              <ThemeProvider theme={lightTheme}>
                <CssBaseline />
                <Component {...pageProps} />
              </ThemeProvider>
            </UiProvider>
          </CarritoProvider>
        </AuthProvider> 
            
      </SWRConfig> 
    </SessionProvider>
    
  

  )
     
}

export default MyApp
