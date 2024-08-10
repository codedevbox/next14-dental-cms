"use client"

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer"; // Импортируйте хук

interface FadeMoveProps {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
    direction?: string;
    position?: number;
};

const FadeMove: React.FC<FadeMoveProps> = ({ 
    children, delay = 0, duration = 0.7, direction = "y", position = 60 
}) => {

    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.15,
    });

    return (
        <motion.div
            ref={ref}
            className="h-full"
            initial={{ opacity: 0, [direction]: position }}
            animate={{ opacity: inView ? 1 : 0, [direction]: inView ? 0 : position }}
            transition={{ duration: inView ? duration : 0, delay: inView ? delay : 0 }}
        >
            {children}
        </motion.div>
    );
};

export default FadeMove;
