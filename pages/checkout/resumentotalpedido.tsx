import { Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { NextPage } from 'next'
import NextLink from 'next/link'
import React from 'react'
import { CarritoList, PedidoResumen } from '../../components/cart';
import { ShopLayout } from '../../components/layouts/ShopLayout';

const ResumenTotalPedidoPage : NextPage = () => {
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
                    <Typography variant='h2' >Resumen (3 productos)</Typography>
                    <Divider sx={{ my:1 }} />

                    <Box display='flex' justifyContent='space-between'>
                      <Typography variant='subtitle1'>Dirección de entrega</Typography>
                      <NextLink href='/checkout/direccion' passHref >
                        <Box color='secondary' >
                          Editar
                        </Box>
                      </NextLink>
                    </Box>

                    <Typography>Iñigo Miranda</Typography>
                    <Typography>Algun lugar</Typography>
                    <Typography>direccion</Typography>
                    <Typography>ccaa</Typography>
                    <Typography>Iñigo Miranda</Typography>

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

                    <Box sx={{ mt:3 }}>
                        <Button color='secondary' className='circular-btn' fullWidth>
                            Cofirmar pedido
                        </Button>

                    </Box>
                </CardContent>
            </Card>

        </Grid>

      </Grid>
    </ShopLayout>
  )
}

export default ResumenTotalPedidoPage
