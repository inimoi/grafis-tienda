import React from 'react'
import { NextPage } from 'next'
import NextLink from 'next/link'
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import AuthLayout from '../../components/layouts/AuthLayout'

const LoginPage: NextPage = () => {
  return (
    <AuthLayout title={'Ingresar'}>
        <Box sx={{ width: '350px', padding:'10px 20px'}}>
                        
            <Grid container spacing={ 2 }>
                <Grid item xs={12}>
                    <Typography variant='h1' component='h1'>Iniciar sesión</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField label='correo' variant='filled' fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <TextField label='contraseña' type='password' variant='filled' fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <Button color='secondary' size='large' className='circular-btn' fullWidth>
                        Ingresar
                    </Button> 
                </Grid>
                <Grid item xs={12} display='flex' justifyContent='end'>
                    <NextLink href='/auth/registro' passHref>
                        <Box color='black'>
                            ¿Aún no tienes cuenta?
                        </Box>
                    </NextLink> 
                </Grid>
            </Grid>
        </Box>
                
    </AuthLayout>
  )
}

export default LoginPage
