"use client"

import { motion } from "framer-motion";

import { useModal } from "@/context/modalContext";

interface ButtonProps {
    text: string;
    isModal?: boolean;
    isSubmit?: boolean;
    size?: string;
    customClass?: string;
};

const Button: React.FC<ButtonProps> = ({ text, isModal, isSubmit, size, customClass}) => {
    const { openModal } = useModal();

    const defaultClass = [
        "mt-3",
        "px-7",
        "py-2",
        "text-white",
        size || "text-lg",
        "font-light",
        "rounded-full",
        "bg-gradient-to-r",
        "from-colorfrom",
        "to-colorto",
        "hover:from-colorfromdark",
        "hover:to-colortodark"
    ].join(" ");

    const baseClass = customClass || defaultClass;

    return (
        <>
            {isModal ? (
                <motion.button onClick={openModal} className={baseClass} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>{text}</motion.button>
            ) : isSubmit ? (
                <motion.button type="submit" className={baseClass} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>{text}</motion.button>
            ) : (
                <motion.button className={baseClass} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>{text}</motion.button>
            )}
        </>
    );
};

export default Button;
