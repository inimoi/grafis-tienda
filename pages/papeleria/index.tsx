
import { Box, Card, CardActionArea, CardMedia, Grid, Typography, Button, InputLabel } from '@mui/material';
import React from 'react'
import { ShopLayout } from '../../components/layouts'
import { ProductList } from '../../components/products';
import { FullScreenLoading } from '../../components/ui';
import { useProducts } from '../../hooks';



const index = () => {

  const { products, isLoading } = useProducts('/products')                 //el custom hook de SWR que hemos creado para traer los productos

  return (
    <ShopLayout title='Papelería' pageDescription='Página principal de la papelería'>
      <Box marginTop='100px'>
        <Typography variant='h1' component='h1'>TIENDA PAPELERIA</Typography>
        <Box display='block' mt='10px' mb='10px' sx={{ border:'2px solid black', padding:'5px', borderRadius:'5px'}}>
          <Button>Acuarelas</Button>
          <Button>Agenda escolar</Button>
          <Button>Bolígrafos</Button>
          <Button>Calculadoras</Button>
          <Button>Carpetas</Button>
          <Button>Ceras</Button>
          <Button>Cinta Dymo</Button>
          <Button>Compases</Button>
          <Button>Correctores</Button>
          <Button>Dossiers</Button>
          <Button>Edding</Button>
          <Button>Estuches</Button>
          <Button>Forro  libros</Button>
          <Button>Fundas</Button>
          <Button>Gomas de borrar</Button>
          <Button>Grapadoras</Button>
          <Button>Lápices</Button>
          <Button>Libretas</Button>
          <Button>Marcadores</Button>
          <Button>Minas</Button>
          <Button>Pegamentos</Button>
          <Button>Pendrive</Button>
          <Button>Plastilina</Button>
          <Button>Porta planos</Button>
          <Button>Reglas</Button>
          <Button>Resmilleria</Button>
          <Button>Roller pilot</Button>
          <Button>Rotuladores</Button>
          <Button>Sacapuntas</Button>
          <Button>Talonarios</Button>
          <Button>Tarifarios</Button>
          <Button>Tijeras</Button>

        </Box>
          
        
      </Box>

      {
          isLoading
          ? <FullScreenLoading />
          : <ProductList products={ products }/>

      }
     
      
    </ShopLayout>
  )
}

export default index
