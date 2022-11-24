import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { NextPage } from 'next'
import React from 'react'
import { ShopLayout } from '../../components/layouts/ShopLayout';

const direccionPage : NextPage = () => {
  return (
    <ShopLayout title={'Dirección'} pageDescription={'Confirmar dirección de destino'} >
      <Typography variant='h1' component='h1' >Dirección</Typography>

      <Grid container spacing={ 2 } sx={{ mt: 2}}>

        <Grid item xs={ 12 } sm={ 6 } >
            <TextField  label='Nombre' variant='outlined' fullWidth/>
        </Grid>

        <Grid item xs={ 12 } sm={ 6 } >
            <TextField  label='Apellido' variant='outlined' fullWidth/>
        </Grid>
        <Grid item xs={ 12 } sm={ 6 } >
            <TextField  label='Dirección' variant='outlined' fullWidth/>
        </Grid>

        <Grid item xs={ 12 } sm={ 6 } >
            <TextField  label='Dirección 2' variant='outlined' fullWidth/>
        </Grid>
        <Grid item xs={ 12 } sm={ 6 } >
            <TextField  label='Código postal' variant='outlined' fullWidth/>
        </Grid>

        <Grid item xs={ 12 } sm={ 6 } >
            <TextField  label='Ciudad' variant='outlined' fullWidth/>
        </Grid>
        <Grid item xs={ 12 } sm={ 6 } >
            <TextField  label='Provincia' variant='outlined' fullWidth/>
        </Grid>

        <Grid item xs={ 12 } sm={ 6 } >
            <FormControl fullWidth>
                <InputLabel>CCAA</InputLabel>
                <Select
                    variant='outlined'
                    label='CCAA'
                    value={1}
                >
                    <MenuItem value={1}>Andalucia</MenuItem>
                    <MenuItem value={2}>País Vasco</MenuItem>
                    <MenuItem value={3}>Cataluña</MenuItem>
                    <MenuItem value={4}>Madrid</MenuItem>

                </Select>
            </FormControl>
        </Grid>

      </Grid>

      <Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
        <Button color='secondary' className='circular-btn' size='large'>
            Revisar pedido
        </Button>
      </Box>
    </ShopLayout>
  )
}

export default direccionPage
