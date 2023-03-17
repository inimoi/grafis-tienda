import React, { useContext } from 'react';
import NextLink from 'next/link';

import { AppBar,Box,Button,Toolbar, Typography } from '@mui/material';

import { UiContext } from '../../context';


export const AdminNavbar = () => {
 
  const { toggleSideMenu } = useContext(UiContext); 

  return (
    <AppBar>
      <Toolbar >
        <NextLink className='none' href='/'> 
          <Box display='block'>
            <Typography variant='h1'>Grafis</Typography>
            <Typography sx={{ ml: 0.5 }}>Papelería Copistería</Typography>
          </Box>
        </NextLink>

        <Box flex={1} />   
              
        <Button sx={{ fontSize:18, ml:5}} onClick={ toggleSideMenu }>
          Menu
        </Button> 
        
      </Toolbar>
    </AppBar>
)

}
