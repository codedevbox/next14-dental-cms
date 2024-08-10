import { useLocale } from "next-intl";

import Logo from "./logo";
import Contact from "./contact";
import Menu from "./menu/menu";

import { fetchPublishedPagesByLocale } from "@/db/queries/pages";
import { LocaleLink } from "@/services/languageService";

interface NavbarProps {
    localeLink: LocaleLink | null
};

const Navbar: React.FC<NavbarProps> = async ({localeLink}) => {
    const locale = useLocale();
    const publishedPages = await fetchPublishedPagesByLocale(locale);

    return (
        <div className="flex flex-wrap items-center justify-between py-6 px-4 sm:px-8 md:px-12 lg:px-10 xl:px-36 2xl:px-48">
            <Logo localeLink={localeLink} locale={locale} />
            {publishedPages && (
                <Menu locale={locale} pages={publishedPages} />
            )}
            <Contact />
        </div>
    );
}

export default Navbar;
