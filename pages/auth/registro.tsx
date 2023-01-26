import React, { useContext, useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import NextLink from 'next/link'

import { Box, Button, Chip, Grid, TextField, Typography } from '@mui/material'
import AuthLayout from '../../components/layouts/AuthLayout'
import { useForm } from 'react-hook-form'
import { validations } from '../../utils'
import { grafisApi } from '../../api'
import { ErrorOutline } from '@mui/icons-material'
import { AuthContext } from '../../context'


type FormData = {
    name: string;
    email: string;
    password: string;
  };


const RegistroPage: NextPage = () => {

    //llamamos al useRouter de next
    const router = useRouter();

    //llamamos al AuthContext
    const { registerUser } = useContext( AuthContext);

    //descripcion del react-hook-form
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();  
    
    //estado de los errores de autenticacion
    const [ showError, setShowError ] = useState(false);

    //creamos este estado para manejar el error que puede venir del regsiteruser
    const [ errorMessage, setErrorMessage] = useState('');

    const onRegisterForm = async ( { name, email, password}: FormData) => {
        setShowError(false);

        const { hasError, message } = await registerUser( name, email, password);

        if ( hasError ) {
            setShowError(true);
            setErrorMessage( message!);
            //para que solo se vea el error solo 3 segundos
            setTimeout(() => setShowError(false), 3000); 
            return; 
        }

        //ir a la pantalla que el usuarioe estaba
        router.replace('/');

        
    }

    return (
        <AuthLayout title={'Ingresar'}>
                <Chip 
                    label="No reconocemos ese usuario / contraseña"
                    color='error'
                    icon={ <ErrorOutline />}
                    className='fadeIn'
                    sx={{ display: showError ? 'flex': 'none'}}
                />
            <form onSubmit={ handleSubmit( onRegisterForm ) } noValidate> 
                <Box sx={{ width: '350px', padding:'10px 20px'}}>
                    <Grid container spacing={ 2 } >
                        <Grid item xs={12}>
                            <Typography 
                                variant='h1'
                                component='h1'>Crear cuenta
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                label='nombre'
                                variant='filled'
                                fullWidth 
                                {...register('name', {
                                    required: { value: true, message:'Este campo es requerido'},
                                    minLength: { value: 2, message: 'Mínimo 2 caracteres'}

                                })}
                                error={ !!errors.name}
                                helperText={ errors.name?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                type="email"
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
                                type="submit"
                                color='secondary'
                                size='large'
                                className='circular-btn'
                                fullWidth
                            >
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
            </form>      
        </AuthLayout>
    )
    }

export default RegistroPage