"use client"

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface TextParams {
    title: string;
    class: string;
};

interface BubbleProps {
    width: number;
    bgClass: string;
    text1: TextParams;
    text2: TextParams;
};


const Bubble: React.FC<BubbleProps> = ({ width, bgClass, text1, text2 }) => {
    const t = useTranslations("WEBSITE.BUBBLE");

    return (
        <motion.div
            className={`flex flex-col items-center justify-center ${bgClass} rounded-full`}
            style={{ width: `${width}px`, height: `${width}px` }}
            whileHover={{ scale: 1.1 }}
        >
            <div className={`${text1.class}`}>{text1.title}</div>
            <div className={`${text2.class}`}>{t(text2.title)}</div>
        </motion.div>
    );
};

export default Bubble;
