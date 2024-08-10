"use client"

import { motion } from "framer-motion";

interface MenuButtonProps {
    open: boolean;
    onclick: () => void;
};

const MenuButton: React.FC<MenuButtonProps> = ({ open, onclick }) => {
    
    const topVariants={
        closed: {
            rotate: 0
        },
        opened: {
            rotate: 40,
            backgroundColor: "rgba(255, 255, 255)"
        }
    };

    const centerVariants={
        closed: {
            opacity: 1
        },
        opened: {
            opacity: 0
        }
    };

    const btVariants={
        closed: {
            rotate: 0
        },
        opened: {
            rotate: -40,
            backgroundColor: "rgba(255, 255, 255)"
        }
    };

    const baseClass = [
        "w-full",
        "h-1",
        "rounded",
        "origin-left"
    ].join(" ");

    const baseColor =  [
        "bg-gradient-to-r",
        "from-colorfrom to-colorto",
        "group-hover:from-blue-700",
        "group-hover:to-fuchsia-600"
    ].join(" ");

    const classMenu = `${baseClass} ${open ? "" : baseColor} `;

    return (
        <motion.button className="mt-4 w-8 h-6 flex flex-col justify-between group z-[60] relative" whileHover={{scale:1.1}} onClick={onclick}>
            <motion.div variants={topVariants} animate={open ? "opened" : "closed"}  className={classMenu}></motion.div>
            <motion.div variants={centerVariants} animate={open ? "opened" : "closed"} className={classMenu}></motion.div>
            <motion.div variants={btVariants} animate={open ? "opened" : "closed"} className={classMenu}></motion.div>
        </motion.button>
    );
}

export default MenuButton;
