import React from 'react'

import Nextlink from 'next/link';
import { NextPage } from 'next';

import { Box } from '@mui/material';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import { Divider } from '@mui/material';

import { ShopLayout } from '../../components/layouts'
import { ProductList } from '../../components/products';


interface Props {
    products: IProduct[];
    existenProducts: boolean;
    query: string
}

const SearchPage: NextPage<Props> = ({ products, existenProducts, query}) => {

  
  return (
    <ShopLayout title='Search' pageDescription='Página principal de búsqueda'>
      <Box marginTop='100px'>
        <Typography variant='h1' component='h1'>BUSCAR PRODUCTOS</Typography>
        {
          existenProducts
            ? <Typography variant='h2' sx={{ mb: 1 }} textTransform='capitalize'>Término: { query }</Typography>
            : (
                <Box display={'flex'}>
                  <Typography variant='h2' sx={{ mb: 1 }}>no encontramos ningún producto</Typography>
                  <Typography variant='h2' sx={{ ml: 1 }} color='secondary' >{ query }</Typography>
                </Box>
            )

        }
        
        
        
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
           
            <ProductList products={ products }/>
            
          </Grid>  
        </Grid>
          
          
        
      </Box>

      
     
      
    </ShopLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from 'next'
import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces/products';

export const getServerSideProps: GetServerSideProps = async ( { params }) => {
    
    const { query = ''} = params as { query: string};

    if ( query.length === 0) {
        return {
            redirect: {
                destination: '/',
                permanent: true
            }
        }
    }

    // sino hay productso de lo que ha buscado
    let products = await dbProducts.getProductByTerm( query );
    const existenProducts = products.length > 0;


    // TODO: retornar otros productos que le pueden gustar o todos los productos
    if ( !existenProducts ) {
      products = await dbProducts.getAllProducts(); //obtener todos los productos
    }


    return {
        props: {
            products,
            existenProducts,
            query
        }
    }
}

export default SearchPage