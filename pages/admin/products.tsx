import React from 'react'
import { NextPage } from 'next';
import Nextlink from 'next/link';
import useSWR from 'swr';

import { AddBoxOutlined, CategoryOutlined } from '@mui/icons-material';
import { Box, Button, CardMedia, Grid, Link } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import { GridColDef, GridRenderCellParams, renderActionsCell } from '@mui/x-data-grid';

import { AdminLayout } from '../../components/layouts';
import { IProduct } from '../../interfaces';


const columns: GridColDef[] = [
    { 
        field: 'img', 
        headerName: 'Foto',
        renderCell: ({ row }:GridRenderCellParams) => {
            return (
                <a href={ `/papeleria/product/${ row.slug }`} target='_blank'>
                    <CardMedia 
                        component='img'
                        alt={ row.title }
                        className='fadeIn'
                        image={ row.img }                    
                    />
                </a>
            )
        }
    
    },
    { 
        field: 'title', 
        headerName: 'Title', 
        width: 250,
        renderCell: ({ row }: GridRenderCellParams ) => {
            return (
                <Nextlink href={`/admin/products/${ row.slug }`} passHref>
                    <Link underline='always'>
                        { row.title }
                    </Link>
                </Nextlink>
            )
        }
    
    },
    { field: 'enStock', headerName: 'Inventario' },
    { field: 'precio', headerName: 'Precio' },
    
];


const ProductsPage: NextPage = () => {

    const { data, error } = useSWR<IProduct[]>('/api/admin/products');

    //validacion e cuando todavia no hay data ni error
    if ( !data && !error ) {
        return  (
            <>
            </>
        )
    }

    const rows = data!.map( product => ({
        id: product._id,
        img: product.imagenes[0],
        title: product.titulo,
        enStock: product.enStock,
        precio: product.precio,
        slug: product.slug,
    }));

    return (
        <AdminLayout 
            title={`Productos (${ data?.length})`} 
            subTitle={'Mantenimiento de productos'} 
            icon={ <CategoryOutlined />}
        >
            
            <Box display={'flex'} justifyContent='end' sx={{ mb: 2}} >
                <Button
                    startIcon= { <AddBoxOutlined />}
                    color= 'secondary'
                    href="/admin/products/new"
                >
                    Crear producto
                </Button>
            </Box>
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

export default ProductsPage
