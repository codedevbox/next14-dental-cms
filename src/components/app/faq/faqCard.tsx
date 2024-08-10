"use client"

import { useState } from "react";
import { Faq } from "@prisma/client";

import FadeMove from "../transition/fadeMove";

interface FaqCaedProps {
    index: number;
    faq: Faq
};

const FaqCard: React.FC<FaqCaedProps> = ({ index, faq }) => {
    const [open, setOpen] = useState(false);

    const openStyle = {
        fill: "#E56DCF"
    };
    const closeStyle = {
        fill: "#2B7BF8",
        transform: "rotate(180deg)"
    };
    const baseStyle = open ? openStyle : closeStyle;

    return (
        <div className="flex w-full mt-8">
            <div className="flex-grow flex-col text-lg">
                <div className="flex w-full">
                    <div className="hidden md:block whitespace-nowrap font-medium pr-3 text-colorfrom">
                        Question {index + 1} :
                    </div>
                    <div className="flex-grow font-medium">
                        {faq.question}
                    </div>
                </div>
                {open && (
                    <FadeMove duration={0.3}>
                        <div className="flex w-full mt-2">
                            <div className="hidden md:block whitespace-nowrap font-medium pr-3 text-colorto">
                                Answer :
                            </div>
                            <div className="flex-grow font-thin">
                                {faq.answer}
                            </div>
                        </div>
                    </FadeMove>
                )}
            </div>
            <div className="flex items-start pl-5 cursor-pointer" onClick={() => { setOpen(prev => !prev) }}>
                <svg style={baseStyle} width="33" height="21" viewBox="0 0 33 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.3403 1.54327L1.29354 13.7143C-0.18904 15.0974 -0.271136 17.4616 1.11194 18.9441C2.49501 20.4267 4.85918 20.5088 6.34176 19.1257L16.6457 9.51339L26.2581 19.8173C27.6411 21.2999 30.0053 21.382 31.4879 19.9989C32.2292 19.3074 32.6197 18.3885 32.6546 17.3855C32.6869 16.4542 32.361 15.5104 31.672 14.6975L19.5701 1.72488C18.1154 0.239807 15.8229 0.160199 14.3403 1.54327Z" />
                </svg>
            </div>
        </div>
    );
};

export default FaqCard;
