import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest, res: NextResponse) {
  const authPages = /\/login|\/register/;
  const requestPageName = req.nextUrl.pathname;
  const url = req.nextUrl.clone();

  if (requestPageName === '/') {
    url.pathname = '/events';
    return NextResponse.redirect(url);
  }

  // do not allow users to login/register if authenticated
  if (authPages.test(requestPageName) && req.cookies['uid']) {
    url.pathname = '/events';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
