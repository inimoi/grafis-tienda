import React from 'react'

import { NextPage } from 'next';

import { Typography } from '@mui/material';

import { ShopLayout } from '../components/layouts/ShopLayout';

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
