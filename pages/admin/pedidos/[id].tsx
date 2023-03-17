import React from 'react'
import { GetServerSideProps } from 'next'
import { NextPage } from 'next'

import { AirplaneTicketOutlined, CreditCardOffOutlined } from '@mui/icons-material';
import { CreditScoreOutlined } from '@mui/icons-material';
import { CardContent, Card } from '@mui/material';
import { Chip } from '@mui/material';
import { Divider } from '@mui/material';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';

import { CarritoList, PedidoResumen } from '../../../components/cart';
import { dbPedidos } from '../../../database';
import { IPedido } from '../../../interfaces/pedido';
import { AdminLayout } from '../../../components/layouts';




//interfaces de las props
interface Props {
  pedido: IPedido
}

const PedidoPagoPage : NextPage<Props> = ( { pedido } ) => {

 
  const { shippingAddress } = pedido;

  return (
    <AdminLayout title='Resumen del pedido' subTitle= { `PedidoId: ${ pedido._id }`} icon={ <AirplaneTicketOutlined />}>
      
      
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
                        
                                              
                        <Box display={'flex'} flexDirection='column' >

                          {
                            pedido.isPaid
                            ? (
                              <Chip 
                                  sx={{ mt: 2, flex: 1 }}
                                  label="Pedido pagado"
                                  variant='outlined'
                                  color='success'
                                  icon={ <CreditScoreOutlined />}      
                              />
                            ):(
                              <Chip 
                                sx={{ mt: 2 }}
                                label="Pendiente de pago"
                                variant='outlined'
                                color='error'
                                icon={ <CreditCardOffOutlined />}                            
                              />                         
                                
                            )
                          }
                        </Box>
                    </Box>
                </CardContent>
            </Card>

        </Grid>

      </Grid>
    </AdminLayout>
  )
}

//trabajaremos del lado del servidor SSP


export const getServerSideProps: GetServerSideProps = async ({ req, query}) => {
  
  //es el id que viene en la barra de direcciones
  const { id = '' } = query;

  //creamos una fucncion y hacemos llamar a dbPedidos nuestra funcion
  const pedido = await dbPedidos.getPedidoById( id.toString() );

  if ( !pedido ) {
    return {
      redirect: {
        destination: '/admin/pedidos',
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
