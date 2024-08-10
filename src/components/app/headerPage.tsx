"use client"

import Image from "next/image";

import Fade from "./transition/fade";
import FadeMove from "./transition/fadeMove";

interface HeaderProps {
    title: string | null;
    description: string | null;
    imageUrl: string | null;
};

const Header: React.FC<HeaderProps> = ({
    title,
    description,
    imageUrl
}) => {

    return (
        <>
            <Fade>
                <div className="my-5 px-4 sm:px-8 md:px-12 lg:px-10 xl:px-36 2xl:px-48">
                    <div className=" relative">
                        <div className="flex flex-col sm:flex-row">
                            <div className="w-full sm:w-1/2 flex flex-row pt-0 sm:pt-10 items-start justify-center sm:justify-start z-30">
                                <div className="pl-0 sm:pl-10 pt-0 md:pt-10">
                                    <FadeMove direction="x" position={-100}>
                                        {title && (
                                            <div className="text-4xl sm:text-2xl lg:text-4xl font-extralight text-center sm:text-left">{title}</div>
                                        )}
                                        {description && (
                                            <div className=" hidden lg:block pt-6 text-xl font-thin">
                                                {description}
                                            </div>
                                        )}
                                    </FadeMove>
                                </div>
                            </div>
                            {imageUrl && title && (
                                <div className="w-full sm:w-1/2 z-10 flex justify-center">
                                    <div className="">
                                        <Image quality={95} className="max-w-full h-auto" priority width={629} height={440} alt={title} src={imageUrl} />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className=" w-full absolute bottom-0 left-0 z-30">
                            <svg width="100%" height="100%" viewBox="0 0 1180 184" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g mask="url(#mask0_2825_36)">
                                    <path d="M-393.333 318C-721.111 268.09 -458.889 44.9614 -393.333 18.5383C-327.778 -7.88473 -131.111 159.461 0.000122595 159.461C131.111 159.461 262.222 18.5383 393.333 18.5383C524.445 18.5383 655.556 159.461 786.667 159.461C917.778 159.461 1048.89 18.5383 1180 18.5383C1311.11 18.5383 1507.78 109.551 1573.33 159.461C1638.89 209.372 1901.11 291.577 1573.33 318" fill="white" />
                                    <path d="M-393.333 18.5381C-327.778 42.0253 -131.111 159.461 -3.17848e-05 159.461C131.111 159.461 262.222 18.5381 393.333 18.5381C524.444 18.5381 655.556 159.461 786.667 159.461C917.778 159.461 1048.89 18.5381 1180 18.5381C1311.11 18.5381 1507.78 135.974 1573.33 159.461" stroke="url(#paint0_linear_2825_36)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
                                </g>
                                <defs>
                                    <linearGradient id="paint0_linear_2825_36" x1="-42.6614" y1="118.5" x2="1225.09" y2="179.087" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#2B7BF8" />
                                        <stop offset="1" stopColor="#E56DCF" />
                                    </linearGradient>
                                </defs>
                            </svg>

                        </div>
                    </div>
                </div>
            </Fade>
        </>
    );
};

export default Header;
