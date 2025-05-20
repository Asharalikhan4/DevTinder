// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  // 1. Redirect already-authenticated users away from /signin
  if (pathname === '/signin' && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 2. Protect authenticated routes (e.g. /dashboard, /settings)
  // Adjust the paths as needed for your app
  const protectedPaths = ["/feed"];
  if (protectedPaths.some(path => pathname.startsWith(path))) {
    if (!token) {
      // No token: redirect to sign-in
      return NextResponse.redirect(new URL('/signin', request.url));
    }
    // Optionally, verify JWT here (e.g., using a verifyJwt function).
    // If invalid, you could clear the cookie and redirect as well.
  }

  // 3. For all other paths, continue
  return NextResponse.next();
}

// Configure which paths the middleware applies to.
// This example applies to all non-API and non-static routes.
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
