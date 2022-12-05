import Nextlink from 'next/link';

import { Box, Chip, Grid, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';
import { NextPage } from 'next'
import React from 'react'
import { ShopLayout } from '../../components/layouts/ShopLayout';


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
            ? <Chip color='success' label='Pagado' variant='outlined'/>
            : <Chip color='error' label='No Pagado' variant='outlined'/>
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
          <Nextlink href={`/pedidos/${params.row.id}`} passHref>
            <Box color='success'>
              Ver pedido
            </Box>
          </Nextlink>
      )
    }
  }
]

const rows = [
  {id: 1, paid: true, fullname: 'Iñigo Miranda'},
  {id: 2, paid: false, fullname: 'Iñigo Miranda'},
  {id: 3, paid: true, fullname: 'Iñigo Miranda'},
  {id: 4, paid: false, fullname: 'Iñigo Miranda'},
  {id: 5, paid: false, fullname: 'Iñigo Miranda'},
  {id: 6, paid: true, fullname: 'Iñigo Miranda'},
  {id: 7, paid: false, fullname: 'Iñigo Miranda'},
]

const HistorialPedidosPage: NextPage = () => {
  return (
    <ShopLayout title={'Historial pedidos'} pageDescription={'Historial pedidos del cliente'}>
      <Typography variant='h1' component='h1'>Historial de pedidos</Typography>
      <Grid container sx={{ mt: 2}}>
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

export default HistorialPedidosPage
    