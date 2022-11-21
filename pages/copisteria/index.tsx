
import { Typography } from '@mui/material'
import { NextPage } from 'next'
import React from 'react'
import { ShopLayout } from '../../components/layouts'

const index:NextPage = () => {
  return (
    <ShopLayout title='Copisteria' pageDescription='Página principal de la copistería'>
      <Typography variant='h1' component='h1'>
        COPISTERIA
      </Typography>
    </ShopLayout>
  )
}

export default index

