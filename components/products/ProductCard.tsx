import React, { FC, useMemo, useState } from 'react'
import NextLink from 'next/link'
import { Grid, Card, CardActionArea, CardMedia, Box, Typography , Chip} from '@mui/material';

import { IProduct } from '../../interfaces';


interface Props {
    product: IProduct;
}

export const ProductCard: FC<Props>= ( { product }) => {

    const [ isHovered, setIsHovered ] = useState( false )

    const [ isImageLoaded, setIsImageLoaded ] = useState( false )

    const productImage = useMemo(() =>{
        return isHovered
            ? product.imagenes[0]
            : product.imagenes[0]

    }, [isHovered, product.imagenes ])

  return (
    <Grid item 
        xs={ 12 } 
        sm={ 6 } 
        md={ 2 } 
        onMouseEnter={ () => setIsHovered(true)} /* con la propiedad esta nos indica cuand el mouse entra en el araea epecificada */
        onMouseLeave={ () => setIsHovered(false)} /* con la propiedad esta nos indica cuand el mouse esta fuera del araea epecificada */
        >
        <Card>
            <NextLink href={ `/papeleria/product/${ product.slug }` } passHref prefetch={ false } > 
                <Box>                    
                    <CardActionArea>
                        {
                            (product.enStock === 0) && (
                                <Chip
                            
                                label="No hay disponibles"
                                sx={{ position:"absolute", zIndex: 99, top:'30px', left: '10px', backgroundColor:'black', color:'white'}}
                                />   
                            )
                        }
                        
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



