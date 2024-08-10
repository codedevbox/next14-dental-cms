"use client";

import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { signOut } from "next-auth/react";
import Link from "next/link";

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { HomeIcon } from "@heroicons/react/16/solid";

import { AdminMenuData, AdminMenuDataItem, iconMap } from "@/components/admin/adminMenuData";
import AdminLanguageSwitcher from "./adminLanguageSwitcher";
import { Languages } from "@prisma/client";

interface AdminNavBarProps {
    locale: string;
    languages: Languages[];
};

const AdminNavBar: React.FC<AdminNavBarProps> = ({ locale, languages }) => {

    const t = useTranslations("ADMIN.MENU");
    const pathName = usePathname();
    const isHomeAdmin = pathName === "/" + locale + "/admin";

    return (
        <div className="">
            <div className="p-3">
                <div className=" bg-white rounded-lg w-full flex p-4 lg:px-6 justify-between">
                    <div className="flex items-center gap-4 justify-center">
                        {!isHomeAdmin && (
                            <Link href={`/${locale}/admin`}>
                                <HomeIcon className="size-10 text-blue-500" />
                            </Link>
                        )}
                        <Dropdown>
                            <div>
                                <DropdownTrigger>
                                    <Button radius="full" className="bg-gradient-to-r from-colorfrom to-colorto text-white shadow-lg">
                                        {t("Menu")}
                                    </Button>
                                </DropdownTrigger>
                            </div>
                            <DropdownMenu
                                aria-label="ACME features"
                                className="w-[250px] left-0 origin-top-left"
                                itemClasses={{
                                    base: "gap-4",
                                }}
                            >
                                {AdminMenuData && AdminMenuData.map((item: AdminMenuDataItem) => {
                                    const IconComponent = iconMap[item.icon];
                                    return (
                                        <DropdownItem
                                            startContent={<IconComponent className={`size-4 ${item.color}`} />}
                                            key={`dropmenu${item.slug}`}
                                            textValue={item.name[locale]}
                                        >
                                            <Link className="w-full block text-lg" href={`/${locale}/admin/${item.slug}`}>
                                                {item.name[locale]}
                                            </Link>
                                        </DropdownItem>
                                    )
                                })}
                            </DropdownMenu>
                        </Dropdown>
                        <AdminLanguageSwitcher locale={locale} languages={languages} />
                    </div>
                    <div>
                        <div>
                            <Button onClick={() => signOut()} color="primary" variant="light">
                                {t("Exit")}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminNavBar;
