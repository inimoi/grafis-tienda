import React from 'react'
import { NextPage } from 'next';
import useSWR from 'swr';

import { ConfirmationNumberOutlined } from '@mui/icons-material';
import { Chip, Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import { AdminLayout } from '../../components/layouts';
import { IPedido, IUser } from '../../interfaces';


const columns: GridColDef[] = [
    { field: 'id', headerName: 'Pedido ID', width: 250 },
    { field: 'email', headerName: 'Correo', width: 250 },
    { field: 'name', headerName: 'Nombre completo', width: 300 },
    { field: 'total', headerName: 'Monto total', width: 300 },
    {
        field: 'isPaid',
        headerName: 'Pagada',
        renderCell: ({ row }: GridRenderCellParams) => {
            return row.isPaid
                ? ( <Chip variant='outlined' label="Pagada" color='success'  />)
                : ( <Chip variant='outlined' label="Pendiente" color='error'  />)
        }
    },
    { field: 'noProducts', headerName: 'Número productos', align:'center', width: 150 },
    {
        field: 'check',
        headerName: 'Ver orden',
        renderCell: ({ row }: GridRenderCellParams) => {
            return (
                <a href={ `/admin/pedidos/${ row.id }` } target="_blank" >
                    Ver orden
                </a>
            )
        }
    },
    { field: 'createdAt', headerName: 'Creada en', width: 300 },
]


const PedidosPage: NextPage = () => {

    const { data, error } = useSWR<IPedido[]>('/api/admin/pedidos');

    //validacion e cuando todavia no hay data ni error
    if ( !data && !error ) {
        return  (
            <>
            </>
        )
    }

    const rows = data!.map( pedido => ({
        id: pedido._id,
        email: (pedido.user as IUser).email,
        name: (pedido.user as IUser).name,
        total: pedido.total,
        isPaid: pedido.isPaid,
        noProducts: pedido.numberOfItems,
        createdAt: pedido.createdAt,
    }));

    return (
        <AdminLayout 
            title={'Pedidos'} 
            subTitle={'Mantenimiento de pedidos'} 
            icon={ <ConfirmationNumberOutlined />}
        >
            <Grid container className= 'fadeIn'>
                <Grid item xs={12} sx={{ height:650, width:'100%'}}>
                    <DataGrid 
                        rows={ rows }
                        columns={ columns }
                        pageSize={ 10 }
                        rowsPerPageOptions={ [10]}                
                    />
                </Grid>
            </Grid>
        </AdminLayout>
     
    
  )
}

export default PedidosPage
