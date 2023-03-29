import React, { FC, Fragment, useContext} from 'react';
import NextLink from 'next/link'
import { Box, Button, CardActionArea, CardMedia, Grid, Typography } from '@mui/material'

import { ItemCounter } from '../ui';
import { CarritoContext } from '../../context/carrito/CarritoContext';
import { ICarritoProduct } from '../../interfaces';
import { IPedidoItem } from '../../interfaces';




interface Props{
    editable?: boolean;
    productos?: IPedidoItem[];
}

export const CarritoList:FC<Props> = ({ editable = false, productos }) => {

    const { carrito, updateCarritoCantidad, eliminarCarritoProducto } =  useContext(CarritoContext);


    //creamos la fuuncion para realizar el cambio de la cantidad
    const onNewCartQuantityValue = ( product: ICarritoProduct, newQuantityValue: number) => {
        product.cantidad = newQuantityValue;
        updateCarritoCantidad( product )
    }

    //como estamos reutilizando este componnete en varios sitios, tenemos que ver sii vienen los productos del baackend del pedido
    const productosToShow = productos ? productos: carrito;

    return (
        <Fragment>
        {
            productosToShow.map ( product =>(
                <Grid container spacing={2} key={ product.slug} sx={{ mb:1}}>
                    <Grid item xs={3}>
                        <NextLink href={ `/papeleria/product/${ product.slug }`} passHref>
                            <Box>
                                <CardActionArea>
                                    <CardMedia 
                                        image={ product.image }
                                        component='img'
                                        sx={{ borderRadius: '5px' }}
                                    />
                                </CardActionArea>
                            </Box>
                        </NextLink>
                    </Grid>
                    <Grid item xs={7}>
                        <Box display='flex' flexDirection='column'>
                            <Typography variant='body1'>{ product.titulo }</Typography>

                            {/*  Condicional: que haya usuarios qu eno puedan añadir ni borrar esos elementos*/}
                            {
                                editable
                                ? <ItemCounter 
                                        currentValue={product.cantidad}
                                        updatedQuantity={( newValue )=> onNewCartQuantityValue( product as ICarritoProduct, newValue )}
                                
                                />
                                : <Typography variant='h5' >{ product.cantidad } { product.cantidad>1 ? 'productos' : 'producto'}</Typography>
                            }
                            
                        </Box>
                    </Grid>
                    <Grid item xs={2} display='flex' alignItems='center' flexDirection='column' >
                        <Typography variant='subtitle1'>{ `${product.precio}€`}</Typography>

                        {/* editable */}
                        {
                            editable && (
                                <Button 
                                    onClick={ () => eliminarCarritoProducto( product as ICarritoProduct)}
                                    variant='text' 
                                    color='secondary'
                                    >
                                    Eliminar artículo
                                </Button>
                            )
                        }
                        
                    </Grid>
                </Grid>

            ))
        }
        </Fragment>
  )
}


