import React, { FC } from 'react'

import { IProduct } from '../../interfaces';
import { ProductCard } from './ProductCard';

import { Grid } from '@mui/material'


interface Props {
    products: IProduct[];

}

export const ProductList: FC<Props> = ( { products }) => {
  return (    
    <Grid container spacing={3}>
        {
            products.map( product =>(
                <ProductCard 
                    key={ product.slug }  /* luego pondremos el product._id  */
                    product={ product }
                />

            ))
        }

    </Grid>
    
  )
}


