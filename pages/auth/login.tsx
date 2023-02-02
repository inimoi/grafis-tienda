import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { signIn, getSession, getProviders } from 'next-auth/react'

import NextLink from 'next/link'
import { Box, Button, Chip, Divider, Grid, TextField, Typography } from '@mui/material'
import { ErrorOutline } from '@mui/icons-material'

//import { AuthContext } from '../../context'
import AuthLayout from '../../components/layouts/AuthLayout'
import { useForm } from 'react-hook-form'
import { validations } from '../../utils'




type FormData = {
    email: string,
    password: string,
  };

const LoginPage: NextPage = () => {

    //importacion del useRouter de next
    const router = useRouter()

    //llamada al AuthContext
    //const { loginUser } = useContext( AuthContext);

    //descripcion del react-hook-form
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();  
    
    //estado de los errores de autenticacion
    const [ showError, setShowError ] = useState(false);

    //usestate para los providers de next-authporque getprovider es una promesa
    const [ providers, setProviders ] = useState<any>({});

    useEffect(() => {
        getProviders().then( prov => {
            
            setProviders( prov);
        })

    }, [])

    const onLoginUser = async ( { email, password}: FormData ) => {
        
        setShowError(false);

        //este era el código de nuestra utenticacion personalizada
        /* const isValidLogin = await loginUser( email, password );

        if ( !isValidLogin) {
            setShowError(true);
            //para que solo se vea el error solo 3 segundos
            setTimeout(() => setShowError(false), 3000); 
            return;
        }

        // navegar a la pantall que el usuario estaba
        const destination = router.query.p?.toString() || '/';
        router.replace( destination ); */

        //este es con el next-auth
        await signIn('credentials', { email, password }) ;
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
                            <NextLink 
                                href={ router.query.p ? `/auth/registro?p=${ router.query.p }`: '/auth/registro'} 
                                passHref>
                                <Box color='black'>
                                    ¿Aún no tienes cuenta?
                                </Box>
                            </NextLink> 
                        </Grid>

                        
                        <Grid item xs={12} display='flex' direction={'column'} justifyContent='end'>
                         
                                <Divider sx={{ width:'100%', mb: 2}} />
                                {
                                    Object.values( providers ).map(( provider:any) => {

                                        if ( provider.id === 'credentials') return (<div key='credentials'></div>);
                                        return (
                                            <Button
                                                key={ provider.id}
                                                variant="outlined"
                                                fullWidth
                                                color='primary'
                                                sx={{ mb:1}}
                                                onClick={ () => signIn( provider.id )}
                                            >
                                                { provider.name }
                                            </Button>
                                        )
                                    })
                                }
                            
                            
                        </Grid>
                    </Grid>
                </Box>
            </form>
        
                
    </AuthLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    const session = await getSession({ req });

    const { p = '/'}= query;

    if ( session ) {
        return {
            redirect: {
                destination: p.toString(),
                permanent: false
            }
        }
    }

    return {
        props: {
            
        }
    }
}

export default LoginPage
