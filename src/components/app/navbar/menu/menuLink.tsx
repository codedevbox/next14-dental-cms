"use client"

import Link from "next/link";

import { usePathname } from "next/navigation";

interface MenuLinkProps {
    slug: string;
    name: string;
};

const MenuLink: React.FC<MenuLinkProps> = ({ slug, name }) => {

    const pathName = usePathname();
    const isActiveLink = pathName === slug;

    const baseClass = [
        "border-b-2",
        "whitespace-nowrap",
        "border-transparent",
        "hover:border-dotted",
        "hover:border-blue-700",
        "hover:text-blue-700"
    ].join(" ");
    const activeClass = "text-colorto";
    const linkClass = `${baseClass} ${isActiveLink ? activeClass : ""}`;

    if (typeof slug !== "string" || slug.trim() === "") {
        return null;
    }

    return (
        <Link className={linkClass} href={slug}>{name}</Link>
    )
}

export default MenuLink;
