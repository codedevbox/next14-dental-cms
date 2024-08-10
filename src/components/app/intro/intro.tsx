
"use client"

import Image from "next/image";
import { useTranslations } from "next-intl";

import Button from "@/components/app/button";
import Bubble from "@/components/app/bubble";
import { n2br } from "@/components/app/helpers/n2br";
import { bubble1, bubble2, bubble3, bubble4 } from "./introData";
import Fade from "../transition/fade";
import FadeMove from "../transition/fadeMove";

interface IntroProps {
    title: string | null;
    description: string | null;
    imageUrl: string | null;
};

const Intro: React.FC<IntroProps> = ({
    title,
    description,
    imageUrl
}) => {

    const t = useTranslations("WEBSITE.INTRO");

    return (
        <Fade>
            <div className="pt-2 px-4 sm:px-8 md:px-12 lg:px-10 xl:px-36 2xl:px-48">
                <div>
                    <div className="flex flex-col sm:flex-row">
                        <div className="w-full sm:w-1/2 z-10">
                            <div className="lg:px-4 xl:px-8 2xl:px-20">
                                {imageUrl && <Image className="max-w-full h-auto" quality={95} priority width={629} height={440} alt="Doctor" src={imageUrl} />}
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2 flex flex-row items-center justify-center z-30">
                            <div className="sm:pl-10 pt-10 sm:pt-0">
                                <FadeMove direction="x" delay={0.3} position={100}>
                                <h1 className="text-4xl sm:text-2xl lg:text-4xl font-extralight text-center sm:text-left">{title}</h1>
                                <div className=" hidden lg:block pt-6 text-xl font-thin">
                                    {description}
                                </div>
                                <div className="pt-6 sm:block sm-md1:hidden sm-md2:hidden text-center sm:text-left">
                                    <Button isModal text={t("INTRO_BUTTON")} />
                                </div>
                                </FadeMove>
                            </div>
                        </div>
                    </div>
                    <div className="relative sm:mt-[-165px] sm-md1:mt-[-145px] md-lg1:mt-[-175px] md:mt-[-205px] lg:mt-[-265px] xl-2xl1:mt-[-270px] xl:mt-[-320px] md:pb-[80px] lg:pb-0 lg-xl1:pb-[30px] lg-xl2:pb-[20px] xl-2xl1:pb-[30px] z-20">
                        <svg width="100%" height="100%" viewBox="0 0 1180 458" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_867_29)">
                                <path d="M-393.333 458C-721.111 408.09 -458.889 184.961 -393.333 158.538C-327.777 132.115 -131.111 299.461 0.000305701 299.461C131.111 299.461 262.223 158.538 393.334 158.538C524.445 158.538 655.556 299.461 786.667 299.461C917.778 299.461 1048.89 158.538 1180 158.538C1311.11 158.538 1507.78 249.551 1573.33 299.461C1638.89 349.372 1901.11 431.577 1573.33 458" fill="white" />
                                <path d="M-393.333 158.538C-327.778 182.025 -131.111 299.461 -0.000153855 299.461C131.111 299.461 262.222 158.538 393.333 158.538C524.444 158.538 655.555 299.461 786.667 299.461C917.778 299.461 1048.89 158.538 1180 158.538C1311.11 158.538 1507.78 275.974 1573.33 299.461" stroke="url(#paint0_linear_867_29)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
                            </g>
                            <defs>
                                <linearGradient id="paint0_linear_867_29" x1="-42.6615" y1="258.5" x2="1225.09" y2="319.087" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#2B7BF8" />
                                    <stop offset="1" stopColor="#E56DCF" />
                                </linearGradient>
                                <clipPath id="clip0_867_29">
                                    <rect width="1180" height="458" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        <div className="w-full sm:mt-[-50px] md:mt-0 md:absolute md:bottom-0">
                            <div className="w-full relative flex flex-wrap items-center justify-center">

                                <div className="w-full p-2 xs-sm1:w-1/2 xs-sm1:p-1 xs-sm2:w-1/2 xs-sm2:p-1 sm:w-1/2 sm:p-1 flex justify-center md:w-auto md:absolute md:bottom-0 md:left-[0px] lg:left-[40px]" >
                                    <FadeMove delay={0.5}>
                                        <Bubble {...bubble1} />
                                    </FadeMove>
                                </div>

                                <div className="w-full p-2 xs-sm1:w-1/2 xs-sm1:p-1 xs-sm2:w-1/2 xs-sm2:p-1 sm:w-1/2 sm:p-1 flex justify-center md:w-auto  md:absolute md:bottom-[40px] md-lg1:bottom-[20px] md:left-[230px] md-lg1:left-[170px] md-lg2:left-[180px] lg:left-[270px]" >
                                    <FadeMove delay={0.7}>
                                        <Bubble {...bubble2} />
                                    </FadeMove>
                                </div>
                                <div className="w-full p-2 xs-sm1:w-1/2 xs-sm1:p-1 xs-sm2:w-1/2 xs-sm2:p-1 sm:w-1/2 sm:p-1 flex justify-center md:w-auto  md:absolute md:bottom-[0px] md:right-[150px]" >
                                    <FadeMove delay={0.9}>
                                        <Bubble {...bubble3} />
                                    </FadeMove>
                                </div>
                                <div className="w-full p-2 xs-sm1:w-1/2 xs-sm1:p-1 xs-sm2:w-1/2 xs-sm2:p-1 sm:w-1/2 sm:p-1 flex justify-center md:w-auto  md:absolute md:bottom-[75px] md:right-[0px]" >
                                    <FadeMove delay={1.1}>
                                        <Bubble {...bubble4} />
                                    </FadeMove>
                                </div>
                                <div className="hidden font-thin text-4xl lg:absolute lg:bottom-[50px] lg:pl-[150px] lg:flex lg:text-2xl  xl-2xl1:text-2xl xl-2xl2:text-2xl xl:text-4xl xl2:text-4xl lg-xl1:hidden">
                                    <FadeMove delay={1.3}>
                                        <div className="text-center">{n2br(t("INTRO_ ACHIEVEMENTS"))}</div>
                                    </FadeMove>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fade>
    );
};

export default Intro;
