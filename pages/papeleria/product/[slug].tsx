import { useContext, useState } from 'react';

import { NextPage } from 'next';
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router';

import { CarritoContext } from '../../../context/carrito/CarritoContext';

import { Grid, Box, Typography, Button, Chip } from '@mui/material';


import { ShopLayout } from '../../../components/layouts/ShopLayout';
import { ProductSlideshow } from '../../../components/products';
import { ItemCounter } from '../../../components/ui';
import { dbProducts } from '../../../database';
import { ICarritoProduct, IProduct } from '../../../interfaces';



interface Props {
  product: IProduct
}



const ProductPage: NextPage<Props> = ({ product }) => {

  const router = useRouter();

  const { addProductToCarrito } = useContext( CarritoContext );      //contexto de carrito

  const [ tempCarritoProduct, setTempCarritoProduct ] = useState<ICarritoProduct>({
    _id: product._id,
    image: product.imagenes[0],
    precio: product.precio,
    slug: product.slug,
    titulo: product.titulo,
    categoria: product.categoria,
    cantidad: 1,
  })
  
  const onUpdateQuantity = ( cantidad: number) => {
    setTempCarritoProduct( currentProduct => ({
      ...currentProduct,
      cantidad
    }));
  }

  const onAddProduct = () => {

    //llamar la acción de context para agregar al carrito
    addProductToCarrito( tempCarritoProduct);
    router.push('/carrito');
  }

  return (
    <ShopLayout title={ product.titulo } pageDescription={ product.descripcion } >
      <Grid container spacing={ 3 }>
        <Grid  item xs={ 12 } sm={ 7 }>
          <ProductSlideshow 
            imagenes={ product.imagenes }
          />
        </Grid>
        <Grid  item xs={ 12 } sm={ 5 }>
          <Box display= 'flex' flexDirection='column'>

            {/* Titulos */}
            <Typography variant='h1' component='h1'>{ product.titulo }</Typography>
            <Typography color='red' variant='subtitle1' component='h2'>{ `${product.precio}€` }</Typography>
            
            {/* Cantidad */}
            <Box>
              <Typography variant='subtitle2' >Cantidad</Typography>
              <ItemCounter 
                currentValue={ tempCarritoProduct.cantidad }
                updatedQuantity={ onUpdateQuantity }             
              
              />
            </Box>

            {/* Agregar al carrito  */}
            {
              (product.enStock > 0)     //Cuando no hay producto el chip y sino el boton
              ? <Button onClick={ onAddProduct } color='secondary' className='circular-btn'>Agregar al carrito</Button>
              : <Chip label='No hay disponibles' color='error' variant='outlined'></Chip>
            }         
                        
            
          </Box>

          {/* Descipcion */}
          <Box sx={{ mt:3}}>
              <Typography variant='subtitle2' >Descripción</Typography>
              <Typography variant='body2' >{ product.descripcion }</Typography>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

//NO usra ServerSideRenderin, no SSR

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

/* export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  
  const { slug= ''} =  params as { slug: string };

  const product = await dbProducts.getProductBySlug( slug );

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    }
  }
}
 */


// GetStaticPaths para generar estaticamente todos los paths
//bloquing
// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const productSlug = await dbProducts.getAllProductBySlug();

  return {
    paths: productSlug.map(( obj )=> ({
      params:{
        slug: obj.slug
      }

    })),  
    
    
    fallback: "blocking"
  }
}

// GetStaticProps
//revalidar cada 24 horas

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async ( { params }) => {
  
  const { slug = '' } = params as { slug: string };
  
  const product = await dbProducts.getProductBySlug(slug);

  if (!product ) {
    return {
      redirect:{
        destination:'/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    },
    revalidate: 60*60*24
  }
}

export default ProductPage
