"use client"

import { useState } from "react";
import Link from "next/link";
import { Languages } from "@prisma/client";
import { usePathname } from "next/navigation";

interface AdminLanguageSwitcherProps {
    locale: string;
    languages: Languages[];
};

const AdminLanguageSwitcher: React.FC<AdminLanguageSwitcherProps> = ({ locale, languages }) => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        languages && languages.length > 0 && (
            <div className="relative">
                <div className="cursor-pointer" onClick={toggleMenu}>
                    <div className="flex items-center justify-center">
                        <div className="uppercase text-md font-extralight">{locale}</div>
                        <div className={`ml-1 text-xs ${isOpen ? "rotate-180 text-colorto" : "text-colorfrom"}`}>&#9660;</div>
                    </div>
                </div>
                {isOpen && (
                    <div className="absolute top-8 bg-white rounded-lg drop-shadow-lg border-t-[3px] border-t-colorto z-10">
                        {languages.filter(item => item.locale !== locale).map(item => (
                            <Link key={item.locale} 
                            className="uppercase py-3 px-4 flex text-md font-extralight" 
                            href={pathname.replace(/^\/[^\/]+/, `/${item.locale}`)}
                            >
                                {item.locale}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        )
    );
};

export default AdminLanguageSwitcher;
