import { Grid, Typography } from '@mui/material'
import React from 'react'




export const PedidoResumen = () => {
  return (
    <Grid container >

      <Grid item xs={6}>
        <Typography>No. Productos</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>3 items</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>155.36 €</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Impuestos ( 21% )</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>28.36 €</Typography>
      </Grid>

      <Grid item xs={6} sx={{ mt:2 }}>
        <Typography variant='subtitle1' >Total:</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end' sx={{ mt:2 }}>
        <Typography variant='subtitle1'>28.36 €</Typography>
      </Grid>

    </Grid>

   
  )
}

