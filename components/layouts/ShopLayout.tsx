import Head from 'next/head';
import React, { FC } from 'react';
import { Navbar, SideMenu } from '../ui';


interface Props{
    title:string;
    pageDescription:string;
    imageFullUrl?:string;
    children: React.ReactNode;
}

export const ShopLayout:FC<Props> = ( { children ,title , pageDescription , imageFullUrl}) => {
  return (
    <>
        {/* El Head de next */}
      <Head>
        <title>{ title }</title>
        <meta name="descripcion" content={ pageDescription }/>
        {/* estos metas son para las redes sociales */}
        <meta name="og:title" content={ title }/>
        <meta name="og:description" content={ pageDescription }/>
        {
            imageFullUrl &&(
                <meta name="og:image" content={ imageFullUrl }/>
            )
        }
      </Head>
      <nav>
        <Navbar />
      </nav>

      <SideMenu />

      <main style={{
        margin:'80px auto',
        padding:'0px 30px',
        maxWidth:'1400px',
      }}>
        { children }
      </main>

      <footer>


      </footer>
    </>
  )
}


