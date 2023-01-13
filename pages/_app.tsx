import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { lightTheme } from '../themes/light-theme';
import { SWRConfig } from 'swr';
import { UiProvider, CarritoProvider } from '../context';


function MyApp({ Component, pageProps }: AppProps) {
  return(

  <SWRConfig 
    value={{
       // refreshInterval: 3000,   Esto es is queremos que se mantenga actualizada nuestra pagina.
      fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
    }}
  > <CarritoProvider>
      <UiProvider>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </UiProvider>
  </CarritoProvider>
    
    
  </SWRConfig> 
  

  )
     
}

export default MyApp
