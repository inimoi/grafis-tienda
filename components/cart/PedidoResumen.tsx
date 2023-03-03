import React, { FC, useContext } from 'react';
import { CarritoContext } from '../../context/carrito/CarritoContext';

import { Grid, Typography } from '@mui/material';
import { currency } from '../../utils';


interface Props {
  pedidoValues?: {
    numberOfItems: number;
    subTotal: number;
    total: number;
    impuesto: number;
  }

}

export const PedidoResumen: FC<Props> = ({ pedidoValues}) => {

  const { numberOfItems , subTotal, total, impuesto } = useContext(CarritoContext)

  //estos osn los valores que vienen del backen del pedido validado
  const resumenValues = pedidoValues ? pedidoValues: { numberOfItems , subTotal, total, impuesto };
  
  return (
    <Grid container >

      <Grid item xs={6}>
        <Typography>No. Productos</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>{ resumenValues.numberOfItems } { resumenValues.numberOfItems > 1 ? 'productos': 'producto'}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>{ currency.format( resumenValues.subTotal ) }</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Impuestos ( 21% )</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>{ currency.format( resumenValues.impuesto ) }</Typography>
      </Grid>

      <Grid item xs={6} sx={{ mt:2 }}>
        <Typography variant='subtitle1' >Total:</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end' sx={{ mt:2 }}>
        <Typography variant='subtitle1'>{ currency.format( resumenValues.total ) }</Typography>
      </Grid>

    </Grid>

   
  )
}

