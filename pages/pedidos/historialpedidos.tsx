import React from 'react'
import { GetServerSideProps } from 'next'
import { NextPage } from 'next'
import Nextlink from 'next/link';
import { getSession } from 'next-auth/react';

import { Box } from '@mui/material';
import { Chip } from '@mui/material';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { GridColDef } from '@mui/x-data-grid';
import { GridRenderCellParams } from '@mui/x-data-grid';
import { GridValueGetterParams } from '@mui/x-data-grid';

import { ShopLayout } from '../../components/layouts/ShopLayout';
import { dbPedidos } from '../../database';
import { IPedido } from '../../interfaces/pedido';




const columns: GridColDef[] = [
  {field: 'id', headerName: 'ID', width: 100},
  {field: 'fullname', headerName: 'Nombre completo', width: 300},
  {
    field: 'paid',
    headerName: 'Pagada',
    description: 'Muestra si se ha pagado o no el pedido',
    width: 200,
    renderCell: ( params: GridRenderCellParams) =>{
      return (
          params.row.paid
          //   ? <Chip color='success' label='Pagado' variant='outlined'/>
          //   : <Chip color='error' label='No Pagado' variant='outlined'/>
      )
    }
  },
  {
    field: 'pedido',
    headerName: 'Número de pedido',
    description: 'Muestra el número de pedido',
    width: 200,
    sortable: false,
    renderCell: ( params: GridRenderCellParams) =>{
      return (
          <Nextlink href={`/pedidos/${params.row.pedidoId}`} passHref>
            <Box color='success'>
              Ver pedido
            </Box>
          </Nextlink>
      )
    }
  }
]

//se bloque ya que eran los datos iniciales para llenar la tabla de pedidos
/* const rows = [
  {id: 1, paid: true, fullname: 'Iñigo Miranda'},
  {id: 2, paid: false, fullname: 'Iñigo Miranda'},
  {id: 3, paid: true, fullname: 'Iñigo Miranda'},
  {id: 4, paid: false, fullname: 'Iñigo Miranda'},
  {id: 5, paid: false, fullname: 'Iñigo Miranda'},
  {id: 6, paid: true, fullname: 'Iñigo Miranda'},
  {id: 7, paid: false, fullname: 'Iñigo Miranda'},
] */


interface Props {
  pedidos: IPedido[];
}


const HistorialPedidosPage: NextPage<Props> = ({ pedidos }) => {
  
  //vamos a recorrer los pedidos que nos vienen del backen
  const rows = pedidos.map( ( pedido, idx ) => ({
    id: idx + 1,
    paid: pedido.isPaid,
    fullname: `${ pedido.shippingAddress.nombre } ${ pedido.shippingAddress.apellido }`,
    pedidoId: pedido._id,
  }))
  

  return (
    <ShopLayout title={'Historial pedidos'} pageDescription={'Historial pedidos del cliente'}>
      <Typography variant='h1' component='h1'>Historial de pedidos</Typography>
      <Grid container sx={{ mt: 2}} className='fadeIn'>
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid 
            rows={ rows }
            columns={ columns }
            pageSize={ 10 }
            rowsPerPageOptions={ [10]}
          
          />          
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

//el ssp para receibir dellado del servidor todas las ordenes que tiene el usuario

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  
  //validacion de autenticacion
  const session: any = await getSession({ req });

  if ( !session ) {
    return {
      redirect: {
        destination: '/auth/login?p=/pedidos/historialpedidos',
        permanent: false,
      }
    }
  }

  //aqui llamamos a la función que nos deb traer los pedidos por el usuario
  const pedidos = await dbPedidos.getPedidosByUser( session.user._id);
  

  //pasamos los pedidos porlas props
  return {
    props: {
      pedidos
    }
  }
}


export default HistorialPedidosPage
    