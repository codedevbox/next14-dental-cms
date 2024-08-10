"use client"

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import LogoImage from "@/../public/images/company/dental/logo.png";
import { LocaleLink } from "@/services/languageService";
import LanguageSwitcher from "./languageSwitcher";

interface LogoProps {
    locale: string;
    localeLink: LocaleLink | null;
};

const Logo: React.FC<LogoProps> = ({ locale, localeLink }) => {
    const pathName = usePathname();
    const isHomePage = pathName === "/" || pathName === "/" + locale;

    const logoImage = (
        <Image alt="logo" src={LogoImage} quality={100} width={300} priority />
    );

    return (
        <div className="flex-1 sm:w-1/2 sm:order-1 relative pr-10 md:pr-0">
            <div className="relative inline-block pr-6">
                <div className="z-10">
                    {isHomePage ? (
                        logoImage
                    ) : (
                        <Link href={"/" + locale}>
                            {logoImage}
                        </Link>
                    )}
                </div>
                <LanguageSwitcher locale={locale} localeLink={localeLink} />
            </div>
        </div>
    );
};

export default Logo;
