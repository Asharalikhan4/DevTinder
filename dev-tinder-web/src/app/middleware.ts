import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const publicUrl = ['/signin','/signup','/verifyemail','/forgotpassword'];
  const isPublicPath = publicUrl.includes(request.nextUrl.pathname);

  const isAuthenticated = request.cookies.get('token') !== undefined;
  console.log('middleware log',{isPublicPath,isAuthenticated,pathname:request.nextUrl.pathname,token:request.cookies.get('token')})
  if(!isAuthenticated && !isPublicPath) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }
  if(isAuthenticated && isPublicPath) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
  ],
};