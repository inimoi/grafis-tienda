import React, { useState } from 'react'
import { GetServerSideProps } from 'next'
import { NextPage } from 'next'
import NextLink from 'next/link'
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { PayPalButtons} from '@paypal/react-paypal-js';

import { CreditCardOffOutlined } from '@mui/icons-material';
import { CreditScoreOutlined } from '@mui/icons-material';
import { Button, CircularProgress } from '@mui/material';
import { Card } from '@mui/material';
import { CardContent } from '@mui/material';
import { Chip } from '@mui/material';
import { Divider } from '@mui/material';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';

import { CarritoList, PedidoResumen } from '../../components/cart';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { dbPedidos } from '../../database';
import { IPedido } from '../../interfaces/pedido';
import { grafisApi } from '../../apiConfig';



//el tipo de paypal del OrderresonseBody
export type OrderResponseBody = {
  id: string;
  status: "COMPLETED" | "SAVED" | "APPROVED" | "VOIDED" | "PAYER_ACTION_REQUIRED";
   };

//interfaces de las props
interface Props {
  pedido: IPedido
}

const PedidoPagoPage : NextPage<Props> = ( { pedido } ) => {

  const router = useRouter();

  const { shippingAddress } = pedido;

  //estado para condicionar el circular progress o los botones de paypal
  const [ isPaying, setIsPaying ] = useState(false);



  //actualizar pantalla e pasgo cuando se ha pagado
  const onOrderCompleted = async ( details: OrderResponseBody ) => {

    if ( details.status !== 'COMPLETED') {
      return alert('No hay pago en PayPal');
    }

    setIsPaying( true );

    try {
      const { data } = await grafisApi.post(`/pedidos/pay`, {
          transactionId: details.id,
          pedidoId: pedido._id,

      })
      //si sale todo bien recargamos la pagina
      router.reload();

    } catch (error) {
      setIsPaying( false);
      alert('error');
    }



}




  return (
    <ShopLayout title='Resumen del pedido' pageDescription='Resumen total de la compra'>
      <Typography variant='h1' component='h1'>Pedido { pedido._id }</Typography>
      
      {
        pedido.isPaid
        ? (
            <Chip 
              sx={{ mt: 2 }}
              label="Pedido pagado"
              variant='outlined'
              color='success'
              icon={ <CreditScoreOutlined />}

            />
        ):
        (
          <Chip 
            sx={{ mt: 2 }}
            label="Pendiente de pago"
            variant='outlined'
            color='error'
            icon={ <CreditCardOffOutlined />}
          
          /> 
        )
      } 


      <Grid container sx={{ mt: 5}} spacing={10} className='fadeIn'>
        <Grid item xs={ 12 } sm={ 7}>
            <CarritoList productos={ pedido.pedidoItems } />
        </Grid>

        <Grid item xs={ 12 } sm={ 5 } >
            <Card>
                <CardContent>
                    <Typography variant='h2' >Resumen ({ pedido.numberOfItems} { pedido.numberOfItems > 1 ? 'productos': 'producto'})</Typography>
                    <Divider sx={{ my:1 }} />

                    <Box display='flex' justifyContent='space-between'>
                      <Typography variant='subtitle1'>Dirección de entrega</Typography>                      
                    </Box>

                    <Typography>{ shippingAddress.nombre } { shippingAddress.apellido }</Typography>
                    <Typography>{ shippingAddress.direccion} { shippingAddress.direccion2 ? `${ shippingAddress.direccion2}`: ''}</Typography>
                    <Typography>{ shippingAddress.ciudad }</Typography>
                    <Typography>{ shippingAddress.provincia }</Typography>
                    <Typography>{ shippingAddress.telefono }</Typography>

                    <Divider sx={{ my:1 }} />
                    
                    <PedidoResumen 
                      pedidoValues={{
                        numberOfItems: pedido.numberOfItems,
                        subTotal: pedido.subTotal,
                        total: pedido.total,
                        impuesto: pedido.impuesto,
                    }}/>

                    <Box sx={{ mt:3 }} display="flex" flexDirection="column">
                        
                        {/* Para cuando estamos esperando la respuesta del backen para ver si se ha pagado */}
                        <Box display="flex" 
                            justifyContent="center" 
                            className='fadeIn' 
                            sx={{ display: isPaying ? 'flex': 'none'}}>
                          <CircularProgress />
                        </Box>
                        
                        <Box flexDirection='column' sx={{ display: isPaying ? 'none': 'flex', flex: 1}}>

                          {
                            pedido.isPaid
                            ? (
                              <Chip 
                                  sx={{ mt: 2 }}
                                  label="Pedido pagado"
                                  variant='outlined'
                                  color='success'
                                  icon={ <CreditScoreOutlined />}      
                              />
                            ):(
                                <PayPalButtons 
                                
                                  createOrder={(data, actions) => {
                                      return actions.order.create({
                                          purchase_units: [
                                              {
                                                  amount: {
                                                      value: `${pedido.total}`, 
                                                  },
                                              },
                                          ],
                                      });
                                  }}
                                  onApprove={(data, actions) => {
                                    
                                      return actions.order!.capture().then((details) => {
                                        /* console.log( { details })
                                        //aqui hacemos nuestra verificacion con nuestro backend
                                        const name = details.payer.name!.given_name;
                                          //alert(`Transaction completed by ${name}`); */
                                        onOrderCompleted( details );
                                      });
                                  }}
                            
                                />
                            )
                          }
                        </Box>
                    </Box>
                </CardContent>
            </Card>

        </Grid>

      </Grid>
    </ShopLayout>
  )
}

//trabajaremos del lado del servidor SSP


export const getServerSideProps: GetServerSideProps = async ({ req, query}) => {
  
  //es el id que viene en la barra de direcciones
  const { id = '' } = query;

  //validaciones
  //validacion si está autenticado
  const session:any = await getSession({ req })

  if ( !session ) {
    return {
      redirect: {
        destination: `/auth/login?p=/pedidos/${ id }`,
        permanent: false,
      }
    }
  }

  //creamos una fucncion y hacemos llamar a dbPedidos nuestra funcion
  const pedido = await dbPedidos.getPedidoById( id.toString() );

  if ( !pedido ) {
    return {
      redirect: {
        destination: '/pedidos/historialpedidos',
        permanent: false,
      }
    }
  }

  //ahora validamos que el usuario del pedido sea igual que le de la sesison
  if ( pedido.user !== session.user._id ) {
    return {
      redirect: {
        destination: '/pedidos/historialpedidos',
        permanent: false,
      }
    }
  }

  return {
    props: {
      pedido
    }
  }
}

export default PedidoPagoPage
