"use client"

import { useState } from "react";
import Link from "next/link";
import { LocaleLink } from "@/services/languageService";

interface LanguageSwitcherProps {
    locale: string;
    localeLink: LocaleLink | null;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ locale, localeLink }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        localeLink && localeLink.locales.length > 0 && (
            <div className="absolute right-0 top-0 z-20">
                <div className="cursor-pointer pl-2 pb-2" onClick={toggleMenu}>
                    <div className="flex items-center justify-center">
                        <div className="uppercase text-md font-extralight">{locale}</div>
                        <div className={`ml-1 text-xs ${isOpen ? "rotate-180 text-colorto" : "text-colorfrom"}`}>&#9660;</div>
                    </div>
                </div>
                {isOpen && (
                    <div className="absolute top-8 bg-white rounded-lg drop-shadow-lg border-t-[3px] border-t-colorto">
                        {localeLink.links.filter(item => item.locale !== locale).map(item => (
                            <Link key={item.locale} className="uppercase py-3 px-4 flex text-md font-extralight" href={`/${item.locale}/${item.slug}`}>{item.locale}</Link>
                        ))}
                    </div>
                )}
            </div>
        )
    );
};

export default LanguageSwitcher;
