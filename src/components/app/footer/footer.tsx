"use client"

import { useState } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

import SvgIcon from "../icons/svgIcons";
import { n2br } from "../helpers/n2br";
import FadeMove from "../transition/fadeMove";

const DynamicMapWithNoSSR = dynamic(() => import("./map"), {
    ssr: false,
});

const Footer = () => {

    const t = useTranslations("WEBSITE.CONTENT");
    const s = useTranslations("WEBSITE.CONTACT");
    const year = new Date().getFullYear();

    const [phoneHovered, setPhoneHovered] = useState(false);
    const [mailHovered, setMailHovered] = useState(false);

    return (
        <FadeMove>
            <div className="py-20 px-4 sm:px-8 md:px-12 lg:px-10 xl:px-28 2xl:px-48">
                <div className="w-full flex flex-col justify-center items-center">

                    <div className="w-full mb-[-30px] relative z-20">
                        <div className=" w-full absolute top-[-2px] left-0 z-[500]">
                            <svg width="100%" height="100%" viewBox="0 0 1180 170" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g mask="url(#mask0_2795_53)">
                                    <g mask="url(#mask1_2795_53)">
                                        <path d="M-393.333 -147C-721.111 -97.0896 -458.889 126.039 -393.333 152.462C-327.778 178.885 -131.111 11.5386 7.41272e-05 11.5386C131.111 11.5386 262.222 152.462 393.333 152.462C524.445 152.462 655.556 11.5387 786.667 11.5387C917.778 11.5387 1048.89 152.462 1180 152.462C1311.11 152.462 1507.78 61.449 1573.33 11.5388C1638.89 -38.3715 1901.11 -120.577 1573.33 -147" fill="white" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M-398.982 154.486C-397.864 157.605 -394.429 159.228 -391.31 158.11C-374.551 152.106 -349.629 140.19 -320.052 125.939C-318.422 125.154 -316.777 124.361 -315.118 123.562C-286.511 109.773 -253.585 93.9022 -218.843 78.689C-145.085 46.3904 -64.1729 17.539 4.2941e-05 17.539C63.7463 17.539 127.886 51.848 193.826 87.2857L194.687 87.7482C259.586 122.627 326.265 158.462 393.333 158.462C460.402 158.462 527.08 122.627 591.98 87.7482L592.84 87.2857C658.781 51.848 722.92 17.5391 786.667 17.5391C850.413 17.5391 914.552 51.8481 980.493 87.2858L981.353 87.7481C1046.25 122.627 1112.93 158.462 1180 158.462C1246.94 158.462 1329.92 128.596 1403.66 96.3045C1438.61 81.0002 1471.71 65.0423 1500.29 51.266L1505.26 48.8723C1535.09 34.4983 1559.34 22.9271 1575.36 17.1876C1578.48 16.0699 1580.1 12.635 1578.98 9.51544C1577.86 6.3959 1574.43 4.77307 1571.31 5.89073C1554.55 11.8948 1529.63 23.8108 1500.05 38.0617L1495.12 40.441C1466.51 54.2296 1433.58 70.0995 1398.84 85.3122C1325.08 117.611 1244.17 146.462 1180 146.462C1116.25 146.462 1052.11 112.153 986.174 76.7155L985.313 76.2532C920.414 41.3743 853.735 5.53909 786.667 5.53908C719.598 5.53908 652.92 41.3742 588.02 76.2532L587.16 76.7155C521.219 112.153 457.08 146.462 393.333 146.462C329.587 146.462 265.448 112.153 199.507 76.7154L198.647 76.2531C133.747 41.3742 67.0684 5.53902 4.39901e-05 5.53901C-66.9381 5.53901 -149.915 35.4056 -223.657 67.6967C-258.605 83.0006 -291.711 98.9579 -320.291 112.734C-321.963 113.54 -323.62 114.338 -325.261 115.129C-355.093 129.503 -379.337 141.074 -395.357 146.814C-398.477 147.931 -400.099 151.366 -398.982 154.486Z" fill="url(#paint0_linear_2795_53)" />
                                    </g>
                                </g>
                                <defs>
                                    <linearGradient id="paint0_linear_2795_53" x1="-46.5227" y1="49.9876" x2="1229.38" y2="-6.54502" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#2B7BF8" />
                                        <stop offset="1" stopColor="#E56DCF" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                        <div className="w-full h-[450px] overflow-hidden z-10">
                            <DynamicMapWithNoSSR />
                        </div>
                    </div>
                    <div className="w-full py-10 px-6 bg-gradient-to-r from-colorfrom to-colorto rounded-2xl flex flex-col z-30">
                        <div className="flex flex-col sm:flex-row items-center justify-between">
                            <div className="mt-5 gap-5 flex order-2 sm:order-1 w-full sm:w-1/3 items-center flex-col lg:w-auto xl-2xl1:flex-col xl-2xl2:flex-col xl:mt-0 xl:flex-row text-base font-thin text-white lg:space-x-2">
                                <div className="order-3 xl-2xl1:order-3 xl-2xl2:order-3 xl:order-1">{`${t("COPYRIGHT")} ${year}`}</div>
                            </div>
                            <div className="flex order-1 sm:order-2 flex-col w-full sm:w-2/3 items-center  gap-5 lg:w-auto lg:flex-row lg:items-center text-base font-thin text-white ">
                                <div className="flex gap-4" onMouseEnter={() => setPhoneHovered(true)} onMouseLeave={() => setPhoneHovered(false)}>
                                    <div>
                                        <SvgIcon icon="phone" link={phoneHovered} rotate={true} />
                                    </div>
                                    <div><a className="border-b border-transparent hover:border-gray-200/50" href={`tel:${s("PHONE_NUMBER")}`}>{s("NICE_PHONE")}</a></div>
                                </div>
                                <div className="flex gap-4" onMouseEnter={() => setMailHovered(true)} onMouseLeave={() => setMailHovered(false)}>
                                    <div>
                                        <SvgIcon icon="mail" link={mailHovered} rotate={true} />
                                    </div>
                                    <div><a className="border-b hover:border-transparent border-gray-200/50" href={`mailto:${s("EMAIL")}`}>{s("EMAIL")}</a></div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div>
                                        <SvgIcon icon="point" />
                                    </div>
                                    <div>
                                        {n2br(s("ADDRESS"))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full pt-5 mt-5 border-t border-gray-200/10">
                            <div className="flex items-center justify-center space-x-5">
                                {s("FACEBOOK") && (
                                    <div>
                                        <a target="_blank" href={s("FACEBOOK")}>
                                            <SvgIcon icon="fb" selfHover={true} animateInTime={0.1} />
                                        </a>
                                    </div>
                                )}
                                {s("PHONE_NUMBER") && (
                                    <>
                                        <div>
                                            <a target="_blank" href={`viber://chat?number=%2B${s("PHONE_NUMBER").replace("+", "")}`}>
                                                <SvgIcon icon="viber" selfHover={true} animateInTime={0.1} />
                                            </a>
                                        </div>
                                        <div>
                                            <a target="_blank" href={`whatsapp://send?phone=${s("PHONE_NUMBER").replace("+", "")}`}>
                                                <SvgIcon icon="whatsapp" selfHover={true} animateInTime={0.1} />
                                            </a>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FadeMove>
    );
}

export default Footer;
