"use client"

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

import Button from "../button";
import { Services } from "@prisma/client";

interface ServiceCardProps {
    service: Services
};

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {

    const t = useTranslations("WEBSITE.BUTTONS");
    const labelColor = service.label && ["Sale", "Vente"].includes(service.label) ? "bg-colorto" : "bg-colorfrom";

    return (
        <motion.div whileHover={{ scale: 1.05 }} className="relative bg-transparent p-2 md-lg3:w-[400px] md-lg4:w-[400px] lg-xl1:w-[240px] lg-xl2:w-[260px] lg-xl3:w-[260px] xl-2xl1:w-[260px] xl-2xl2:w-[280px] w-[300px]">
            <div className="bg-gradient-to-tr from-colorfrom to-colorto p-[1px] rounded-lg">
                <div className="bg-white hover:bg-gradient-to-tr hover:from-blue-50 hover:to-fuchsia-50 p-4 pb-8 rounded-lg flex flex-col items-center">
                    {service.label && (
                        <div className={labelColor + " absolute top-4 right-4 py-1 px-4 text-white  text-sm rounded-full"}>
                            {service.label}
                        </div>
                    )}
                    {service.image && (
                        <div className="mt-5 relative rounded-full overflow-hidden">
                            <Image alt={service.title} src={service.image} width={180} height={180} />
                        </div>
                    )}
                    <div className="mt-5 h-[56px] overflow-hidden flex items-center justify-center font-medium text-xl text-center">{service.title}</div>
                    <div className="mt-5 h-[150px] overflow-hidden font-light text-base text-center">{service.description}</div>
                    {service.price && (
                        <div className="font-normal text-xl">
                            {service.newPrice && service.newPrice > 0 ?
                                <><span className="line-through">${service.price}</span> - <span>${service.newPrice}</span></>
                                :
                                <span>${service.price}</span>
                            }
                        </div>
                    )}
                    {service.request && (
                        <div className="mt-5">
                            <Button size="text-sm" isModal text={t("MAKE_APPOINTMENT")} />
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ServiceCard;
