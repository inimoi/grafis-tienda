import React, { useEffect } from 'react'
import {useContext} from 'react';
import { NextPage } from 'next'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography} from '@mui/material';
import Cookies from 'js-cookie';

import { ShopLayout } from '../../components/layouts/ShopLayout';
import { CarritoContext } from '../../context/carrito/CarritoContext';


type FormData = {
    nombre: string;
    apellido: string;
    direccion: string;
    direccion2?: string;
    codigoPostal: string;
    ciudad: string;
    provincia: string;
    telefono: string;

}

const getAddressFromCookies = ():FormData => {
    return {
        nombre: Cookies.get('nombre') || '' ,
        apellido: Cookies.get('apellido') || '' ,
        direccion: Cookies.get('direccion') || '' ,
        direccion2: Cookies.get('direccion2') || '' ,
        codigoPostal: Cookies.get('codigoPostal') || '' ,
        ciudad: Cookies.get('ciudad') || '' ,
        provincia: Cookies.get('provincia') || '' ,
        telefono: Cookies.get('telefono') || '' ,
    }
}


const direccionPage : NextPage = () => {

    //llamada al UseRouter de next
    const router = useRouter();

   

    //useEffect para evitar entrr en la pagina sin que haya datos en el carrito
    useEffect(() => {
        if ( !Cookies.get('carrito')) {
            router.push('/papeleria')
    }
  }, [ router ]);

  

    //llamamos al carritoContext para actualizar la direccion
    const { updateAddress } = useContext(CarritoContext);

    //llamada a useForm
    const { register, handleSubmit, formState: { errors }} = useForm<FormData>({
        defaultValues: getAddressFromCookies()
    });

    const onSubmitDireccion = ( data: FormData) => {
        
        updateAddress( data );

        router.push('/checkout/resumentotalpedido')

    }


    return (

        <ShopLayout title={'Dirección'} pageDescription={'Confirmar dirección de envío'} >

            <form onSubmit={ handleSubmit( onSubmitDireccion ) }>
                <Typography variant='h1' component='h1' >Dirección</Typography>

                <Grid container spacing={ 2 } sx={{ mt: 2}}>

                    <Grid item xs={ 12 } sm={ 6 } >
                        <TextField  
                            label='Nombre' 
                            variant='outlined' 
                            fullWidth
                            {...register('nombre', {
                                required: { value: true, message:'Este campo es requerido'},
                            })}
                            error={ !!errors.nombre}
                            helperText={ errors.nombre?.message}
                            />

                            
                        
                    </Grid>

                    <Grid item xs={ 12 } sm={ 6 } >
                        <TextField  
                            label='Apellido' 
                            variant='outlined' 
                            fullWidth
                            {...register('apellido', {
                                required: { value: true, message:'Este campo es requerido'},
                            })}
                            error={ !!errors.apellido }
                            helperText={ errors.apellido?.message}
                            />
                    </Grid>
                    <Grid item xs={ 12 } sm={ 6 } >
                        <TextField  
                            label='Dirección' 
                            variant='outlined' 
                            fullWidth
                            {...register('direccion', {
                                required: { value: true, message:'Este campo es requerido'},
                            })}
                            error={ !!errors.direccion}
                            helperText={ errors.direccion?.message}
                            />
                    </Grid>

                    <Grid item xs={ 12 } sm={ 6 } >
                        <TextField  
                            label='Dirección 2 (Opcional)' 
                            variant='outlined' 
                            fullWidth
                            {...register('direccion2')}                           
                            />
                    </Grid>
                    <Grid item xs={ 12 } sm={ 6 } >
                        <TextField  
                            label='Código postal' 
                            variant='outlined' 
                            fullWidth
                            {...register('codigoPostal', {
                                required: { value: true, message:'Este campo es requerido'},
                            })}
                            error={ !!errors.codigoPostal}
                            helperText={ errors.codigoPostal?.message}
                            />
                    </Grid>

                    <Grid item xs={ 12 } sm={ 6 } >
                        <TextField  
                            label='Ciudad' 
                            variant='outlined' 
                            fullWidth
                            {...register('ciudad', {
                                required: { value: true, message:'Este campo es requerido'},
                            })}
                            error={ !!errors.ciudad}
                            helperText={ errors.ciudad?.message}
                            />
                    </Grid>
                    <Grid item xs={ 12 } sm={ 6 } >
                        <TextField  
                            label='Provincia (solo entrega en península)' 
                            variant='outlined' 
                            fullWidth
                            {...register('provincia', {
                                required: { value: true, message:'Este campo es requerido'},
                            })}
                            error={ !!errors.provincia}
                            helperText={ errors.provincia?.message}
                            />
                    </Grid>

                    <Grid item xs={ 12 } sm={ 6 } >
                        <TextField  
                            label='Teléfono' 
                            variant='outlined' 
                            fullWidth
                            {...register('telefono', {
                                required: { value: true, message:'Este campo es requerido'},
                            })}
                            error={ !!errors.telefono}
                            helperText={ errors.telefono?.message}
                            />
                    </Grid>

                </Grid>

                <Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
                    <Button type="submit" color='secondary' className='circular-btn' size='large'>
                        Revisar pedido
                    </Button>
                </Box>
                
            </form>
        
        </ShopLayout>
    )
}

export default direccionPage
