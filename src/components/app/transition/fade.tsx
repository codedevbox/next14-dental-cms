"use client"

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface FadeProps {
    children: React.ReactNode;
    delay?: number; 
    duration?: number; 
};

const Fade: React.FC<FadeProps> = ({ children, delay = 0, duration = 1 }) => {
    
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.15,
    });

    return (
        <motion.div
            ref={ref}
            className="h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ duration: inView ? duration : 0, delay: inView ? delay : 0 }}
        >
            {children}
        </motion.div>
    );
};

export default Fade;
