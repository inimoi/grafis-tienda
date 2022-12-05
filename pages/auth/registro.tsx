import React from 'react'
import { NextPage } from 'next'
import NextLink from 'next/link'
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import AuthLayout from '../../components/layouts/AuthLayout'

const RegistroPage: NextPage = () => {
  return (
    <AuthLayout title={'Ingresar'}>
        <Box sx={{ width: '350px', padding:'10px 20px'}}>
            <Grid container spacing={ 2 } >
                <Grid item xs={12}>
                    <Typography variant='h1' component='h1'>Crear cuenta</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField label='nombre' variant='filled'  fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <TextField label='correo' variant='filled' fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <TextField label='contraseña' type='password' variant='filled' fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <Button color='secondary' size='large' className='circular-btn' fullWidth>
                        Registrate
                    </Button> 
                </Grid>
                <Grid item xs={12} display='flex' justifyContent='end'>
                    <NextLink href='/auth/login' passHref>
                        <Box color='black'>
                            ¿Ya tienes cuenta?
                        </Box>
                    </NextLink> 
                </Grid>
                
            </Grid>
        </Box>
                
    </AuthLayout>
  )
}

export default RegistroPage