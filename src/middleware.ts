import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import createIntlMiddleware from "next-intl/middleware";

const secret = process.env.AUTH_SECRET;

async function customMiddleware(req: NextRequest) {

    const response = await fetch(`${req.nextUrl.origin}/api/locales`);
    if (!response.ok) {
        console.error("Failed to fetch locales data from API");
        return new NextResponse(null, { status: 500 });
    }
    const { locales, defaultLocale } = await response.json();

    const { pathname } = req.nextUrl;
    const pathSegments = pathname.split("/");
    const locale = pathSegments[1];
    if (!locales.includes(locale)) {
        return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, req.nextUrl.href));
    }

    const token = await getToken({ req, secret });
    const isAdminPath = pathname.startsWith(`/${locale}/admin`);
    const isLoginPage = pathname === `/${locale}/admin/login`;
    const isRegisterPage = pathname === `/${locale}/admin/register`;

    if (isAdminPath && !isLoginPage && !isRegisterPage && !token) {
        return NextResponse.redirect(new URL(`/${locale}/admin/login`, req.nextUrl.href));
    }

    if ((isLoginPage || isRegisterPage) && token) {
        return NextResponse.redirect(new URL(`/${locale}/admin`, req.nextUrl.href));
    }

    const intlMiddleware = createIntlMiddleware({
        locales,
        defaultLocale
    });

    return intlMiddleware(req);
};

export default customMiddleware;

export const config = {
    matcher: ["/((?!api|_next|.*\\..*).*)"]
};
