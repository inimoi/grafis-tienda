import { Box, Card, CardActionArea, CardMedia, Grid, Typography } from '@mui/material'
import React from 'react'
import { ShopLayout } from '../../components/layouts'

import { initialData } from '../../database/products';



const index = () => {
  return (
    <ShopLayout title='Papelería' pageDescription='Página principal de la papelería'>
      <Box marginTop='150px'>
        <Typography variant='h1' component='h1'>TIENDA PAPELERIA</Typography>
        <Typography variant='h2' component='h2'>Todos los productos</Typography>
        
      </Box>
      <Grid container spacing={4}>
        {
            initialData.products.map( product => (
                <Grid item xs={ 6 } sm={ 4 } key={product.slug}>
                    <Card>
                        <CardActionArea>
                            <CardMedia 
                                component={'img'}
                                image={ `products/${ product.images[0]}`} 
                                alt={ product.title }
                            />                           
                        </CardActionArea>
                    </Card>     
                </Grid>
            ))
        }
      </Grid>
      
    </ShopLayout>
  )
}

export default index
