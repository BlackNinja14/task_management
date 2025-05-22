import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('access');
  const isTasksRoute = request.nextUrl.pathname.startsWith('/tasks');

  if (isTasksRoute && !accessToken) {
    console.log('here')
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/tasks/:path*'],
};
