import React, { useContext, useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router';
import NextLink from 'next/link'

import { Button, Card, CardContent, Chip, Divider, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';

import { CarritoList, PedidoResumen } from '../../components/cart';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { CarritoContext } from '../../context';
import Cookies from 'js-cookie';



const ResumenTotalPedidoPage : NextPage = () => {

  const router = useRouter();

  const { shippingAddress, numberOfItems, createPedido } = useContext(CarritoContext);

  //Para evitar la doble peticion del pedido 



  //useEffect para evitar entrr en la pagina sin que haya direccion
  useEffect(() => {
    if ( !Cookies.get('apellido')) {
      router.push('/checkout/direccion')
    }
  }, [ router ]);

  //Crear dos estados para evitar el doble posteo en el pedido --323
  const [isPosting, setIsPosting] = useState(false);  //nos ayuda para saber cuando hacemos el posteo en la aplicacion
  const [errorMessage, setErrorMessage] = useState('');


  const onCreatePedido = async () => {

    setIsPosting(true);

    const { hasError, message} = await createPedido();

    if ( hasError ) {
      setIsPosting(false);
      setErrorMessage( message );
      return;
    }
    
    router.replace(`/pedidos/${ message }`)
  }



  if (!shippingAddress) {
    return <></>
  }

  const { nombre, apellido, direccion, direccion2 = '', ciudad, provincia, codigoPostal, telefono} = shippingAddress;


  return (
    <ShopLayout title='Resumen de compra' pageDescription='Resumen total de la compra'>
      <Typography variant='h1' component='h1'>Resumen del pedido</Typography>

      <Grid container sx={{ mt: 5}} spacing={10}>
        <Grid item xs={ 12 } sm={ 7}>
            <CarritoList />
        </Grid>

        <Grid item xs={ 12 } sm={ 5 } >
            <Card>
                <CardContent>
                    <Typography variant='h2' >Resumen ({ numberOfItems} { numberOfItems === 1 ? 'producto': 'productos'})</Typography>
                    <Divider sx={{ my:1 }} />

                    <Box display='flex' justifyContent='space-between'>
                      <Typography variant='subtitle1'>Dirección de entrega</Typography>
                      <NextLink href='/checkout/direccion' passHref >
                        <Box color='secondary' >
                          Editar
                        </Box>
                      </NextLink>
                    </Box>

                    <Typography>{ nombre } { apellido }</Typography>
                    <Typography>{ direccion} { direccion2 ? `, ${ direccion2 }`: ' '}</Typography>
                    <Typography>{ ciudad }, { provincia}</Typography>
                    <Typography>{ codigoPostal}</Typography>
                    <Typography>{ telefono }</Typography>

                    <Divider sx={{ my:1 }} />
                    <Box display='flex' justifyContent='space-between'>
                      <Typography variant='subtitle1'>Productos</Typography>
                      <NextLink href='/carrito' passHref >
                        <Box color='secondary' >
                          Editar
                        </Box>
                      </NextLink>
                    </Box>
                    <PedidoResumen />

                    <Box sx={{ mt:3 }} display="flex" flexDirection="column" >
                        <Button 
                          color='secondary' 
                          className='circular-btn' 
                          fullWidth
                          onClick={ onCreatePedido }
                          disabled= { isPosting }
                          >
                            Cofirmar pedido
                        </Button>

                        <Chip
                          color="error"
                          label={ errorMessage }
                          sx={{ display: errorMessage ? 'flex':'none', mt:2}}
                        />

                    </Box>
                </CardContent>
            </Card>

        </Grid>

      </Grid>
    </ShopLayout>
  )
}

export default ResumenTotalPedidoPage
