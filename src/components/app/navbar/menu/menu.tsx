"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import MenuLink from "./menuLink";
import MenuButton from "./menuButton";

import { PublishedPage } from "@/db/queries/pages";

interface MenuProps {
    pages: PublishedPage[];
    locale: string;
};

const Menu: React.FC<MenuProps> = ({ pages, locale }) => {
    const [open, setOpen] = useState(false);

    const pathname = usePathname();
    const pegeSlug = pathname.split("/").filter(Boolean).pop();

    const menuVariant = {
        opend: {
            clipPath: `circle(150% at 100% 0%)`,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1,
                when: "beforeChildren",
                ease: "easeInOut"
            }
        },
        closed: {
            clipPath: `circle(0% at 100% 0%)`,
            transition: {
                duration: 0.5,
                ease: "easeInOut"
            }
        }
    };

    const listVariant = {
        opend: {
            x: 0,
            opacity: 1
        },
        closed: {
            x: -10,
            opacity: 0
        }
    };

    const clickMenu = () => {
        setOpen((prev) => !prev);
    };

    useEffect(() => {
        if (open) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
    }, [open]);

    return (
        <>
            <div className="hidden lg:flex lg-xl1:hidden lg:order-2 lg:w-1/3 lg:mx-4 flex-row  text-lg pt-5 font-extralight justify-between">
                {pages && pages.filter(link => link.slug !== "/").map((link) => (
                    <MenuLink slug={"/" + locale + "/" + link.slug} name={link.name} key={link.slug} />
                ))}
            </div>
            <div className="w-9 sm:w-9 sm:order-2 md:w-9 md:order-3 lg-xl1:order-3 lg-xl1:block lg:hidden">
                <MenuButton open={open} onclick={clickMenu} />
                <AnimatePresence>
                    {open && (
                        <motion.div
                            className="absolute top-0 left-0 w-screen h-screen bg-gradient-to-br from-colorfrom to-colorto text-white  z-[100]"
                            variants={menuVariant}
                            initial="closed"
                            animate="opend"
                            exit="closed">
                            <div className="menu-wrapper flex flex-col items-center justify-center gap-8 text-4xl">
                                {pages && pages.map((link) => (
                                    <motion.div variants={listVariant} key={link.slug} whileHover={{ scale: 1.1 }}>
                                        {link.slug !== pegeSlug ?
                                            <Link className=" opacity-70 hover:opacity-100" href={"/" + locale + "/" + link.slug}>{link.name}</Link>
                                            : <div className="">{link.name}</div>}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};

export default Menu;
