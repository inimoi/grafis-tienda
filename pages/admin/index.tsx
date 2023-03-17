import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { NextPage } from 'next';

import { AccessTimeOutlined, AttachMoneyOutlined, CancelPresentationOutlined, CategoryOutlined, CreditCardOffOutlined, CreditCardOutlined, DashboardOutlined, GroupOutlined, ProductionQuantityLimitsOutlined } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';

import { AdminLayout } from '../../components/layouts';
import { SummaryTile } from '../../components/admin';
import { DashboardSummaryResponse } from '../../interfaces';





const DashboardPage:NextPage = () => {

    //tilizamos el SWR para tarer la informacion de la api y refrescarlas cada cierto tiempo
    const { data, error } = useSWR<DashboardSummaryResponse>('/api/admin/dashboard', {
        refreshInterval: 30 * 1000   // 30 segundos
    })

    //para elcontador del refersh
    const [ refreshIn, setRefreshIn ] = useState(30);

    useEffect(() => {
        //ejecuta esto cada segundo quee sel tiempo que le ponemos
        const interval = setInterval(( ) => {
        setRefreshIn( refreshIn => refreshIn > 0 ? refreshIn - 1: 30 );
        }, 1000 );   //un segundo

        return () => clearInterval( interval );   // limpia el inrevalo mientras no estemos en la pagina, porque sino siempre estaria contando
    }, [ ]);





    //cuando se carga por primera vez no tenemos data ni error
    if ( !data && !error ) {
        return <></>
    }

    //si hay error
    if ( error ) {
        console.log( error );
        return <Typography>Error al cargar la informacion</Typography>
    }

    //si esta todo ok y viene la data
    const {
        numberOfOrders, 
        paidOrders,
        notPaidOrders, 
        numberOfClients, 
        numberOfProducts, 
        productsWithNoInventory, 
        lowInventrory, 
    } = data!;



    return (
      <AdminLayout
          title='Dashboard'
          subTitle='Estadisticas generales'
          icon={ <DashboardOutlined />}    
      >
      <Grid container spacing={2} mt={5}>

          <SummaryTile 
              title={ numberOfOrders }
              subTitle="Ordenes totales"
              icon={ <CreditCardOutlined color='secondary' sx={{ fontSize: 40 }} />}
          />

          <SummaryTile 
              title={ paidOrders }
              subTitle="Ordenes pagadas"
              icon={ <AttachMoneyOutlined color='success' sx={{ fontSize: 40 }} />}
          />

         <SummaryTile 
              title={ notPaidOrders }
              subTitle="Ordenes pendientes pago"
              icon={ <CreditCardOffOutlined color='error' sx={{ fontSize: 40 }} />}
          />

          <SummaryTile 
              title={ numberOfClients }
              subTitle="Clientes"
              icon={ <GroupOutlined color='primary' sx={{ fontSize: 40 }} />}
          />

          <SummaryTile 
              title={ numberOfProducts }
              subTitle="Productos"
              icon={ <CategoryOutlined color='warning' sx={{ fontSize: 40 }} />}
          />

          <SummaryTile 
              title={ productsWithNoInventory }
              subTitle="Productos sin existencias"
              icon={ <CancelPresentationOutlined color='error' sx={{ fontSize: 40 }} />}
          />

          <SummaryTile 
              title={ lowInventrory }
              subTitle="Bajo inventario"
              icon={ <ProductionQuantityLimitsOutlined color='warning' sx={{ fontSize: 40 }} />}
          />

          <SummaryTile 
              title={ refreshIn }
              subTitle="Actualización en:"
              icon={ <AccessTimeOutlined color='secondary' sx={{ fontSize: 40 }} />}
          />

      </Grid>
      </AdminLayout>
    )
}   

export default DashboardPage; 
