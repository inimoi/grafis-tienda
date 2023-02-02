// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {

  //trae el token de next-auth
 const session = await getToken({ req, secret: process.env.NEXTAUTH_URL })
 
 //informacion util sobre el usuario
 if ( !session ) {
    const requestedPage = req.nextUrl.pathname;  //la pagina a la cual queŕia ir el usuario
    const url = req.nextUrl.clone();
    url.pathname = `/auth/login`;
    url.search = `p=${ requestedPage }`;

    return NextResponse.redirect( url );
 }

 //ahora vamos a la página que había indicado el usuario
 return NextResponse.next();


}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/checkout/direccion', '/checkout/resumentotalpedido'],
}
