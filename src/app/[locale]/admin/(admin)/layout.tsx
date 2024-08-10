import { useLocale } from "next-intl";
import AdminNavBar from "@/components/admin/adminNavbar";
import { fetchPublicLanguages } from "@/db/queries/languages";

export default async function AdminPageLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const locale = useLocale();
    const languages = await fetchPublicLanguages() || [];

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-r from-colorfrom to-colorto w-full items-center">
            <div className="w-full max-w-[1200px] min-h-screen flex flex-col">
            <AdminNavBar locale={locale} languages={languages}/>
            {children}
            </div>
        </div>
    );
};
