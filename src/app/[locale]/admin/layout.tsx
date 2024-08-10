import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

import { Providers } from "@/components/admin/providers";

interface AdminLayoutProps {
    children: React.ReactNode;
    params: {
        locale: string;
    }
};

const notoSans = Noto_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Admin Panel",
    description: "Generate content of your website",
    robots: {
        index: false,
        follow: false,
    },
};

export default async function AdminLayout({ children, params: { locale } }: Readonly<AdminLayoutProps>) {
    const messages = await getMessages();
    return (
        <html lang={locale}>
            <body className={`${notoSans.className}`}>
                <NextIntlClientProvider messages={messages}>
                    <Providers>
                        {children}
                    </Providers>
                </NextIntlClientProvider>
            </body>
        </html>
    );
};
