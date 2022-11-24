

import { AddBusiness, Article, ContactPage, DesignServices, SearchOffRounded, SearchOutlined, SegmentTwoTone, ShoppingCartOutlined } from '@mui/icons-material'
import { AppBar,Autocomplete,Badge,Box,Button,Grid,IconButton,Link,Toolbar, Typography } from '@mui/material'
import NextLink from 'next/link'
import React from 'react'

export const Navbar = () => (

  <AppBar>
    <Toolbar >
      <NextLink className='none' href='/'> 
        <Box display='block'>
          <Typography variant='h1'>Grafis</Typography>
          <Typography sx={{ ml: 0.5 }}>Papelería Copistería</Typography>
        </Box>
      </NextLink>

      <Box flex={1} />

      <Box  sx={{ display:{ xs:'none', sm:'none', md:'flex'}}}alignItems='center'>
        <NextLink className='none' href='/'> 
          <Box display='flex' alignItems='center'>
            <Button startIcon={<SegmentTwoTone />}>Inicio</Button>
          </Box>
        </NextLink>
        <NextLink className='none' href='/papeleria'> 
          <Box display='flex' alignItems='center'>
            <Button startIcon={<AddBusiness />}>Tienda papelería</Button>
            
          </Box>
        </NextLink>
        <NextLink className='none' href='/copisteria'> 
          <Box display='flex' alignItems='center'>
            <Button startIcon={<Article />}>Copistería</Button>
          </Box>
        </NextLink>
        <NextLink className='none' href='/contacto'> 
          <Box display='flex' alignItems='center'>
            <Button startIcon={<ContactPage />}>Contacto</Button>
          </Box>
        </NextLink>
        <NextLink className='none' href='/servicios'> 
          <Box display='flex' alignItems='center'>
            <Button startIcon={<DesignServices />}>Servicios</Button>
          </Box>
        </NextLink>
      </Box>
      <Box flex={1} />
      <IconButton >
        <SearchOutlined/>
      </IconButton>
      <NextLink className='none' href='/carrito'> 
        <Box display='flex' alignItems='center'>
          <IconButton>
            <Badge badgeContent={2} color={'secondary'}>
              <ShoppingCartOutlined />
            </Badge>
          </IconButton>
        </Box>
      </NextLink>
      <Button sx={{ fontSize:18, ml:5}}>
        Menu
      </Button> 
      
    </Toolbar>
  </AppBar>
)


