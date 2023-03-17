// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {

  //trae el token de next-auth
 const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
 
 //si no hay sesion
 if ( !session ) {

    if ( req.nextUrl.pathname.startsWith('/api/admin')) {
      return NextResponse.redirect( new URL('/', req.url ));
    }


    const requestedPage = req.nextUrl.pathname;  //la pagina a la cual queŕia ir el usuario
    const url = req.nextUrl.clone();
    url.pathname = `/auth/login`;
    url.search = `p=${ requestedPage }`;

    return NextResponse.redirect( url );
 }

 //si hay sesion
 const validRoles = ['admin'];
 if ( req.nextUrl.pathname.startsWith('/admin')) {
  if ( !validRoles.includes(session.user.role)) {
    return NextResponse.redirect( new URL('/', req.url ));
  }
 }

 if ( req.nextUrl.pathname.startsWith('/api/admin')) {
  if ( !validRoles.includes(session.user.role)) {
    return NextResponse.redirect( new URL('/', req.url ));
  }
 }


 //ahora vamos a la página que había indicado el usuario
 return NextResponse.next();


}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/checkout/:path*', '/checkout/resumentotalpedido', '/admin/:path*', '/api/admin/:path*'],
}
