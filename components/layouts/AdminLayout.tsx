import React, { FC } from 'react';

import { Box, Typography } from '@mui/material';

import { SideMenu } from '../ui';
import { AdminNavbar } from '../admin';


interface Props{
    title:string;
    subTitle:string;
    icon?:React.ReactNode;  //puede ser también como JSX.Element
    children: React.ReactNode;
}

export const AdminLayout:FC<Props> = ( { children ,title , subTitle, icon }) => {
  return (
    <>
       
      <nav>
        <AdminNavbar />
      </nav>

      <SideMenu />

      <main style={{
        margin:'80px auto',
        padding:'0px 30px',
        maxWidth:'1400px',
      }}>
        <Box display="flex" flexDirection="column">
            <Typography variant='h1' component='h1'>
                { icon }
                { title }
            </Typography>
            <Typography variant='h2' sx={{ mb:1 }}>
                { subTitle }
            </Typography>
        </Box>

        <Box className='fadeIn'>
            { children }
        </Box>

      </main>

      
    </>
  )
}
