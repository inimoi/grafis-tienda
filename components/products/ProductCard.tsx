import React, { FC, useMemo, useState } from 'react'
import NextLink from 'next/link'
import { Grid, Card, CardActionArea, CardMedia, Box, Typography } from '@mui/material';

import { IProduct } from '../../interfaces';


interface Props {
    product: IProduct;
}

export const ProductCard: FC<Props>= ( { product }) => {

    const [ isHovered, setIsHovered ] = useState( false )

    const [ isImageLoaded, setIsImageLoaded ] = useState( false )

    const productImage = useMemo(() =>{
        return isHovered
            ?`products/${ product.imagenes[1] }`
            :`products/${ product.imagenes[0] }`

    }, [isHovered, product.imagenes ])

  return (
    <Grid item 
        xs={ 6 } 
        sm={ 4 } 
        md={ 2 } 
        onMouseEnter={ () => setIsHovered(true)} /* con la propiedad esta nos indica cuand el mouse entra en el araea epecificada */
        onMouseLeave={ () => setIsHovered(false)} /* con la propiedad esta nos indica cuand el mouse esta fuera del araea epecificada */
        >
        <Card>
            <NextLink href="papeleria/product/slug" passHref prefetch={ false } >
                <Box>
                    <CardActionArea>
                        <CardMedia
                            component={'img'}
                            className='fadeIn'
                            image={ productImage } 
                            alt={ product.titulo }
                            onLoad= { () => setIsImageLoaded(true)}
                        />                           
                    </CardActionArea>
                </Box>
            </NextLink>
        </Card> 

        <Box sx={{ mt: 1, display: isImageLoaded ? 'block' : 'none' }} className='fadeIn'>
            <Typography fontWeight={700}>{ product.titulo }</Typography>
            <Typography fontWeight={400}>{ `$${product.precio}` }</Typography>
        </Box>    
    </Grid>
  )
}



