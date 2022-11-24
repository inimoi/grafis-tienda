import React, { FC } from 'react';
import NextLink from 'next/link'
import { Box, Button, CardActionArea, CardMedia, Grid, Typography } from '@mui/material'

import { initialData } from '../../database/products'
import { ItemCounter } from '../ui';

const productsInCart = [

    initialData.products[1],
    initialData.products[2],
    initialData.products[3],
]

interface Props{
    editable?: boolean;
}

export const CarritoList:FC<Props> = ({ editable = false }) => {
  return (
    <>
      {
        productsInCart.map( product =>(
            <Grid container spacing={2} key={ product.slug} sx={{ mb:1}}>
                <Grid item xs={3}>
                    <NextLink href='/papeleria/product/slug' passHref>
                        <Box>
                            <CardActionArea>
                                <CardMedia 
                                    image={ `/products/${ product.images[0]}`}
                                    component='img'
                                    sx={{ borderRadius: '5px' }}
                                />
                            </CardActionArea>
                        </Box>
                    </NextLink>
                </Grid>
                <Grid item xs={7}>
                    <Box display='flex' flexDirection='column'>
                        <Typography variant='body1'>{ product.title }</Typography>

                        {/*  Condicional: que haya usuarios qu eno puedan añadir ni borrar esos elementos*/}
                        {
                            editable
                            ? <ItemCounter />
                            : <Typography variant='h5' >3 items</Typography>
                        }
                        
                    </Box>
                </Grid>
                <Grid item xs={2} display='flex' alignItems='center' flexDirection='column' >
                    <Typography variant='subtitle1'>{ `${product.price}€`}</Typography>

                    {/* editable */}
                    {
                        editable && (
                            <Button variant='text' color='secondary'>
                                Eliminar artículo
                            </Button>
                        )
                    }
                    
                </Grid>
            </Grid>

        ))
      }
    </>
  )
}


