import React from 'react'
import { NextPage } from 'next';
import NextLink from 'next/link'
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { Box, Typography } from '@mui/material';
import { RemoveShoppingCartOutlined } from '@mui/icons-material';

const CarritoVacioPage: NextPage= () => {
  return (
    <ShopLayout title='Carrito vacío' pageDescription='No hay artículos en el carrito de compras'>
      <Box
        display='flex' 
        justifyContent='center' 
        alignItems='center' 
        height='calc(100vh - 100px)'
        sx={{ flexDirection:{ xs:'column', sm:'column', md:'row'}}}
        >
        <RemoveShoppingCartOutlined sx={{ fontSize:150 }} />    
        <Box display='flex' flexDirection='column' alignItems='center'>
            <Typography>Su carrito está vacío</Typography>
            <NextLink href='/' passHref>
                <Box>
                    <Typography variant='h4' color='secondary' >
                        Regresar
                    </Typography>
                </Box>
            </NextLink>
        </Box>
      </Box>
    </ShopLayout>
  )
}

export default CarritoVacioPage
