import React from 'react'
import { ShopLayout } from '../components/layouts/ShopLayout';
import { Typography } from '@mui/material';
import { NextPage } from 'next';

const contacto:NextPage = () => {
  return (
    <ShopLayout title='Contacto' pageDescription='Página de contacto'>
      <Typography variant='h1' component='h1' >
        CONTACTO
      </Typography>
    </ShopLayout>
  )
}

export default contacto
