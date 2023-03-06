import { NextPage } from 'next';

import { Box } from '@mui/material';
import { Typography } from '@mui/material';

import { ShopLayout } from '../components/layouts/ShopLayout';


const Custom404:NextPage = () => {
  return (
    <ShopLayout title='Page not found' pageDescription='Página de error 404, page not found'>
      <Box 
        display='flex' 
        justifyContent='center' 
        alignItems='center' 
        height='calc(100vh - 100px)'
        sx={{ flexDirection:{ xs:'column', sm:'column', md:'row'}}}
        >
        <Typography variant='h1' component='h1'fontSize='4rem' >404 |</Typography>
        <Typography marginLeft='20px'>Página no encontrada</Typography>
      </Box>
    </ShopLayout>
  )
}


export default Custom404
