

import { AddBusiness, Article, ClearOutlined, ContactPage, DesignServices, SearchOffRounded, SearchOutlined, SegmentTwoTone, ShoppingCartOutlined } from '@mui/icons-material'
import { AppBar,Autocomplete,Badge,Box,Button,Grid,IconButton,Input,InputAdornment,Link,Toolbar, Typography } from '@mui/material'
import NextLink from 'next/link'
import {  useRouter } from 'next/router'
import React, { useContext, useState } from 'react'
import { UiContext } from '../../context'

export const Navbar = () => {

  const { asPath, push } = useRouter();
  
  const { toggleSideMenu } = useContext(UiContext);

  
  const [ searchTerm, setSearchTerm ] = useState('')
  const [ isSearchVisible, setIsSearchVisible ] = useState(false);

  const onSearchTerm = () => {
      if (searchTerm.trim().length === 0) return;          
      
      push(`/search/${ searchTerm }`);
  }



   

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

        <Box  sx={{ display: isSearchVisible ? 'none' :{ xs:'none', sm:'none', md:'flex'}}} alignItems='center'
              className='fadeIn'
        >
          <NextLink className='none' href='/'> 
            <Box display='flex' alignItems='center'>
              <Button color={ asPath === "/" ? 'info':'primary'}  startIcon={<SegmentTwoTone />}>Inicio</Button>
            </Box>
          </NextLink>
          <NextLink className='none' href='/papeleria'> 
            <Box display='flex' alignItems='center'>
              <Button color={ asPath === "/papeleria" ? 'info':'primary'} startIcon={<AddBusiness />}>Tienda papelería</Button>
              
            </Box>
          </NextLink>
          <NextLink className='none' href='/copisteria'> 
            <Box display='flex' alignItems='center'>
              <Button color={ asPath === "/copisteria" ? 'info':'primary'} startIcon={<Article />}>Copistería</Button>
            </Box>
          </NextLink>
          <NextLink className='none' href='/contacto'> 
            <Box display='flex' alignItems='center'>
              <Button color={ asPath === "/contacto" ? 'info':'primary'} startIcon={<ContactPage />}>Contacto</Button>
            </Box>
          </NextLink>
          <NextLink className='none' href='/servicios'> 
            <Box display='flex' alignItems='center'>
              <Button color={ asPath === "/servicios" ? 'info':'primary'} startIcon={<DesignServices />}>Servicios</Button>
            </Box>
          </NextLink>
        </Box>
        <Box flex={1} />

        {/*  pantallas grandes */}
        {/*  */}

        {
          isSearchVisible
            ? (
              <Input
              sx={{ display: { xs:'none', sm:'flex', md:'flex'}}}
              className='fadeIn'
              autoFocus
              value={ searchTerm }
              onChange={ (e) => setSearchTerm( e.target.value )}
              onKeyPress={ (e) =>e.key === 'Enter' ? onSearchTerm() : null}
              type='text'
              placeholder="Buscar..."
              endAdornment={
                  <InputAdornment position="end">
                      <IconButton
                          onClick={ () => setIsSearchVisible(false)}
                      >
                        <ClearOutlined />
                      </IconButton>
                  </InputAdornment>
              }
              />

              )
            :(
              <IconButton 
                onClick={ () => setIsSearchVisible(true)}
                className='fadeIn'
                sx={{ display: { xs: 'none', sm:'flex'}}}
              >
                <SearchOutlined/>
              </IconButton>
            )
        }
        

        {/*  pantallas peqieñas */}
        <IconButton 
          sx={{ display: { xs: 'flex', sm:'none'}}}
          onClick= { toggleSideMenu }
        >
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
        <Button sx={{ fontSize:18, ml:5}} onClick={ toggleSideMenu }>
          Menu
        </Button> 
        
      </Toolbar>
    </AppBar>
)

}
