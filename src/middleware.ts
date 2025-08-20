import { NextRequest, NextResponse } from 'next/server';
import { checkAuthentication } from "@/core/utils/middleware";

export const config = {
    matcher: ['/sign-in', '/sign-up', '/dashboard/:path*'],
};

export default async function middleware(req: NextRequest) {
    const url = req.nextUrl.clone();
    const pathname = url.pathname;
    const authResult = checkAuthentication(req);

    const isAuthRoute = ['/sign-in', '/sign-up'].includes(pathname)

    if (!authResult.isAuthenticated && !isAuthRoute) {
        url.pathname = '/sign-in';
        return NextResponse.redirect(url);
    }

    // if (authResult.isAuthenticated && isAuthRoute) {
    //     url.pathname = '/dashboard/admin';
    //     return NextResponse.redirect(url);
    // }

    return NextResponse.next();
}
