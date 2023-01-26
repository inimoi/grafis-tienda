import React, { useState, useContext } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import NextLink from 'next/link'
import { Box, Button, Chip, Grid, TextField, Typography } from '@mui/material'
import { ErrorOutline } from '@mui/icons-material'

import { AuthContext } from '../../context'
import AuthLayout from '../../components/layouts/AuthLayout'
import { useForm } from 'react-hook-form'
import { validations } from '../../utils'
import { grafisApi } from '../../api'



type FormData = {
    email: string,
    password: string,
  };

const LoginPage: NextPage = () => {

    //importacion del useRouter de next
    const router = useRouter()

    //llamada al AuthContext
    const { loginUser } = useContext( AuthContext);

    //descripcion del react-hook-form
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();  
    
    //estado de los errores de autenticacion
    const [ showError, setShowError ] = useState(false);


    const onLoginUser = async ( { email, password}: FormData ) => {
        
        setShowError(false);

        const isValidLogin = await loginUser( email, password );

        if ( !isValidLogin) {
            setShowError(true);
            //para que solo se vea el error solo 3 segundos
            setTimeout(() => setShowError(false), 3000); 
            return;
        }

       // navegar a la pantall que el usuario estaba
        router.replace('/');
    }


    return (
        <AuthLayout title={'Ingresar'}>
            
            <form onSubmit={ handleSubmit( onLoginUser ) } noValidate>          
                <Box sx={{ width: '350px', padding:'10px 20px'}}>
                    
                    <Grid container spacing={ 2 }>
                        <Grid item xs={12}>
                            <Typography variant='h1' component='h1'>Iniciar sesión</Typography>
                            <Chip 
                                label="No reconocemos ese usuario / contraseña"
                                color='error'
                                icon={ <ErrorOutline />}
                                className='fadeIn'
                                sx={{ display: showError ? 'flex': 'none'}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                type='email' 
                                label='correo' 
                                variant='filled' 
                                fullWidth
                                {...register('email', {
                                    required: { value: true, message:'Este campo es requerido'},
                                    validate: ( val ) => validations.isEmail( val )    
                                })}
                                error={ !!errors.email}
                                helperText={ errors.email?.message}
                                />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                label='contraseña' 
                                type='password' 
                                variant='filled' 
                                fullWidth
                                {...register('password', {
                                    required: { value: true, message:'Este campo es requerido'},
                                    minLength: { value: 6, message: 'Mínimo 6 caracteres'}

                                })}
                                error={ !!errors.password}
                                helperText={ errors.password?.message}
                                />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type='submit'
                                color='secondary'
                                size='large'
                                className='circular-btn'
                                fullWidth
                                >
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
            </form>
        
                
    </AuthLayout>
  )
}

export default LoginPage
