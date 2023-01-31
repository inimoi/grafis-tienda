import React, { useContext, useEffect } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router';

import { Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';

import { CarritoList, PedidoResumen } from '../../components/cart';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { CarritoContext } from '../../context/';



const CarritoPage : NextPage = () => {

  //useContext para traer el isLoaded y el numberOfitems para saber si está vacío o no el carrito y el useRouter para mandar al apgina de carrito vacio
  const { isLoaded, carrito } = useContext( CarritoContext );
  const router = useRouter();

  //ahora llamamos al useEffect para cuando se cargue  mire si hay elementos en el carrito
  useEffect( () => {
    if ( isLoaded && carrito.length === 0) {
      router.replace('/carrito/carritovacio');
    }
  }, [ isLoaded, carrito, router ])

  //para no ver por un momento el carrito y asi ver lapantalla en blanco
  if ( !isLoaded || carrito.length === 0 ) {
    return(<></>);
  }

 

  return (
    <ShopLayout title='Carrito - 3' pageDescription='Carrito de compras de la tienda'>
      <Typography variant='h1' component='h1'>Carrito</Typography>

      <Grid container sx={{ mt: 5}} spacing={10}>
        <Grid item xs={ 12 } sm={ 7}>
            <CarritoList editable/>
        </Grid>

        <Grid item xs={ 12 } sm={ 5 } >
            <Card>
                <CardContent>
                    <Typography variant='h2' >Pedido</Typography>
                    <Divider sx={{ my:1 }} />

                    <PedidoResumen />

                    <Box sx={{ mt:3 }}>
                        <Button 
                          color='secondary' 
                          className='circular-btn' 
                          fullWidth
                          href='/checkout/direccion'
                          >
                            Checkout
                        </Button>

                    </Box>
                </CardContent>
            </Card>

        </Grid>

      </Grid>
    </ShopLayout>
  )
}

export default CarritoPage
