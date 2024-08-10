import { Noto_Sans } from "next/font/google";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

import "./style.css";

import { ModalProvider } from "@/context/modalContext";
import FormModal from "@/components/app/modal/formModal";


interface AppLayoutProps {
    children: React.ReactNode;
    params: {
        locale: string;
    };
};

const notoSans = Noto_Sans({ subsets: ["latin"] });

export default async function AppLayout({ children, params: { locale } }: Readonly<AppLayoutProps>) {
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body className={notoSans.className}>
                    <NextIntlClientProvider messages={messages}>
                        <ModalProvider>
                            {children}
                            <FormModal />
                        </ModalProvider>
                    </NextIntlClientProvider>
            </body>
        </html>
    );
};
