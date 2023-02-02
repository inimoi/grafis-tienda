import type { NextPage } from 'next';

import { Typography } from '@mui/material';

import { ShopLayout } from '../components/layouts';


const Home: NextPage = () => {

  return (
   <ShopLayout title={'Grafis - Home'} pageDescription={'Página de inicio de Grafis'}>
    {/* el component es para el SEO de google para que vea que es un titulo*/}
    <Typography  variant='h1' component='h1'>Grafis</Typography> 
    <Typography  variant='h2' sx={{ mb: 1 , mt: 2}}>Vuestro comercio para papelería y copistería </Typography>    
   </ShopLayout>
  )
}

export default Home
