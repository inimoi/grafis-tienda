import React, { useContext } from 'react';
import { CarritoContext } from '../../context/carrito/CarritoContext';

import { Grid, Typography } from '@mui/material';
import { currency } from '../../utils';



export const PedidoResumen = () => {

  const { numberOfItems , subTotal, total, impuesto } = useContext(CarritoContext)

  

  return (
    <Grid container >

      <Grid item xs={6}>
        <Typography>No. Productos</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>{ numberOfItems } {numberOfItems > 1 ? 'productos': 'producto'}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>{ currency.format( subTotal ) }</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Impuestos ( 21% )</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>{ currency.format( impuesto ) }</Typography>
      </Grid>

      <Grid item xs={6} sx={{ mt:2 }}>
        <Typography variant='subtitle1' >Total:</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end' sx={{ mt:2 }}>
        <Typography variant='subtitle1'>{ currency.format( total ) }</Typography>
      </Grid>

    </Grid>

   
  )
}

