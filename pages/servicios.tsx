import React from 'react'
import { ShopLayout } from '../components/layouts/ShopLayout';
import { Typography } from '@mui/material';
import { NextPage } from 'next';

const servicios:NextPage = () => {
  return (
    <ShopLayout title='Servicios' pageDescription='Que hacemos, servicios'>
      <Typography variant='h1' component='h1'>
        SERVICIOS
      </Typography>
    </ShopLayout>
  )
}

export default servicios
