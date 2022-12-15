
import { Box, Grid, Typography, Button, Divider } from '@mui/material';
import React from 'react'
import { ShopLayout } from '../../components/layouts'
import { ProductList } from '../../components/products';
import { FullScreenLoading } from '../../components/ui';
import { useProducts } from '../../hooks';
import Nextlink from 'next/link';
import { NextPage } from 'next';



const AcuarelasPage: NextPage = () => {

  const { products, isLoading } = useProducts('/products?categoria=Acuarelas')                 //el custom hook de SWR que hemos creado para traer los productos

  return (
    <ShopLayout title='Papelería - acuarelas' pageDescription='Página acuarelas de la papelería'>
      <Box marginTop='100px'>
        <Typography variant='h1' component='h1'>TIENDA PAPELERIA - ACUARELAS</Typography>
        <Grid container  columnSpacing={1} mt='20px'>
          <Grid item display='flex' flexDirection='column' xs={3.5} sm={2} md={1.5} >
              
              <Nextlink className='none' href='/categoria/acuarelas'> 
                <Box display='flex' alignItems='center'>
                  <Button>Acuarelas</Button>
                </Box>
              </Nextlink>
              <Divider />
              <Nextlink className='none' href='/categoria/agendaEscolar'> 
                <Box display='flex' alignItems='center'>
                  <Button>Agenda escolar</Button>
                </Box>
              </Nextlink>
              <Divider />
              <Nextlink className='none' href='/categoria/boligrafos'> 
                <Box display='flex' alignItems='center'>
                  <Button>Bolígrafos</Button>
                </Box>
              </Nextlink>
              <Divider />
              <Nextlink className='none' href='/categoria/calculadoras'> 
                <Box display='flex' alignItems='center'>
                  <Button>Calculadoras</Button>
                </Box>
              </Nextlink>
              <Divider />
              <Nextlink className='none' href='/categoria/carpetas'> 
                <Box display='flex' alignItems='center'>
                  <Button>Carpetas</Button>
                </Box>
              </Nextlink>
              <Divider />
              <Nextlink className='none' href='/categoria/ceras'> 
                <Box display='flex' alignItems='center'>
                  <Button>Ceras</Button>
                </Box>
              </Nextlink>
              <Divider />
              <Nextlink className='none' href='/categoria/cintaDymo'> 
                <Box display='flex' alignItems='center'>
                  <Button>Cinta Dymo</Button>
                </Box>
              </Nextlink>
              <Divider />
              <Nextlink className='none' href='/categoria/compases'> 
                <Box display='flex' alignItems='center'>
                  <Button>Compases</Button>
                </Box>
              </Nextlink>
              <Divider />
              <Nextlink className='none' href='/categoria/correctores'> 
                <Box display='flex' alignItems='center'>
                  <Button>Correctores</Button>
                </Box>
              </Nextlink>
              <Divider />
              <Nextlink className='none' href='/categoria/dossiers'> 
                <Box display='flex' alignItems='center'>
                  <Button>Dossiers</Button>
                </Box>
              </Nextlink>
              <Divider />
              <Nextlink className='none' href='/categoria/edding'> 
                <Box display='flex' alignItems='center'>
                  <Button>Edding</Button>
                </Box>
              </Nextlink>
              <Divider />
              <Nextlink className='none' href='/categoria/estuches'> 
                <Box display='flex' alignItems='center'>
                  <Button>Estuches</Button>
                </Box>
              </Nextlink>
              <Divider />
              <Nextlink className='none' href='/categoria/forroLibros'> 
                <Box display='flex' alignItems='center'>
                  <Button>Forro libros</Button>
                </Box>
              </Nextlink>
              <Divider />
              <Nextlink className='none' href='/categoria/fundas'> 
                <Box display='flex' alignItems='center'>
                  <Button>Fundas</Button>
                </Box>
              </Nextlink>
              <Divider />
              <Nextlink className='none' href='/categoria/gomasDeBorrar'> 
                <Box display='flex' alignItems='center'>
                  <Button>Gomas de borrar </Button>
                </Box>
              </Nextlink>
              <Divider />
              <Nextlink className='none' href='/categoria/grapadoras'> 
                <Box display='flex' alignItems='center'>
                  <Button>Grapadoras</Button>
                </Box>
              </Nextlink>
              <Divider />
              <Nextlink className='none' href='/categoria/lapices'> 
                <Box display='flex' alignItems='center'>
                  <Button>Lápices</Button>
                </Box>
              </Nextlink>
              <Divider />
              <Nextlink className='none' href='/categoria/libretas'> 
                <Box display='flex' alignItems='center'>
                  <Button>Libretas</Button>
                </Box>
              </Nextlink>
              <Divider />
              <Nextlink className='none' href='/categoria/marcadores'> 
                <Box display='flex' alignItems='center'>
                  <Button>Marcadores</Button>
                </Box>
              </Nextlink>
              <Divider />
              <Nextlink className='none' href='/categoria/minas'> 
                <Box display='flex' alignItems='center'>
                  <Button>Minas</Button>
                </Box>
              </Nextlink>
              <Divider />
              <Nextlink className='none' href='/categoria/pegamentos'> 
                <Box display='flex' alignItems='center'>
                  <Button>Pegamentos</Button>
                </Box>
              </Nextlink>
              <Divider />
              <Nextlink className='none' href='/categoria/pendrive'> 
                <Box display='flex' alignItems='center'>
                  <Button>Pendrive</Button>
                </Box>
              </Nextlink>
              <Divider />
              <Nextlink className='none' href='/categoria/plastilina'> 
                <Box display='flex' alignItems='center'>
                  <Button>Plastilina</Button>
                </Box>
              </Nextlink>
              <Divider />
              <Nextlink className='none' href='/categoria/portaPlanos'> 
                <Box display='flex' alignItems='center'>
                  <Button>Porta planos</Button>
                </Box>
              </Nextlink>
              <Divider />
              <Nextlink className='none' href='/categoria/reglas'> 
                <Box display='flex' alignItems='center'>
                  <Button>Reglas</Button>
                </Box>
              </Nextlink>
              <Divider />
              <Nextlink className='none' href='/categoria/resmilleria'> 
                <Box display='flex' alignItems='center'>
                  <Button>Resmilleria</Button>
                </Box>
              </Nextlink>
              <Divider />
              <Nextlink className='none' href='/categoria/rollerPilot'> 
                <Box display='flex' alignItems='center'>
                  <Button>Roller Pilot</Button>
                </Box>
              </Nextlink>
              <Divider />
              <Nextlink className='none' href='/categoria/rotuladores'> 
                <Box display='flex' alignItems='center'>
                  <Button>Rotuladores</Button>
                </Box>
              </Nextlink>
              <Divider />
              <Nextlink className='none' href='/categoria/sacapuntas'> 
                <Box display='flex' alignItems='center'>
                  <Button>Sacapuntas</Button>
                </Box>
              </Nextlink>
              <Divider />
              <Nextlink className='none' href='/categoria/talonarios'> 
                <Box display='flex' alignItems='center'>
                  <Button>Talonarios</Button>
                </Box>
              </Nextlink>
              <Divider />
              <Nextlink className='none' href='/categoria/tarifarios'> 
                <Box display='flex' alignItems='center'>
                  <Button>Tarifarios</Button>
                </Box>
              </Nextlink>
              <Divider />
              <Nextlink className='none' href='/categoria/tijeras'> 
                <Box display='flex' alignItems='center'>
                  <Button>Tijeras</Button>
                </Box>
              </Nextlink>

          </Grid>
          <Grid item xs={0.5} sm={0.5} md={0.5}>

          </Grid>
          <Grid item xs={8} sm={9.5} md={10}>
            {
            isLoading
            ? <FullScreenLoading />
            : <ProductList products={ products }/>

            }
          </Grid>  
        </Grid>
          
          
        
      </Box>

      
     
      
    </ShopLayout>
  )
}

export default AcuarelasPage;

