import { useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";

import { fetchServicesPublishedByLocale } from "@/db/queries/services";

import ServiceCard from "./serviceCard";
import FadeMove from "../transition/fadeMove";

const ServicesList = async () => {

    const locale = useLocale();
    const ServicesData = await fetchServicesPublishedByLocale(locale);
    if (ServicesData?.length === 0) { return; }
    const t = await getTranslations("WEBSITE.CONTENT");

    return (
        <FadeMove>
            <div className="pt-20 px-4 sm:px-8 md:px-12 lg:px-10 xl:px-36 2xl:px-48">
                <h2 className="text-center font-thin text-4xl">{t("SERVICES_TITLE")}</h2>
                <div className=" pt-10 w-full flex justify-center">
                    <div className="text-center font-thin text-base  max-w-[780px]">{t("SERVICES_DESCRIPTION")}</div>
                </div>
                {ServicesData && (
                    <div className="pt-10 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 lg-xl1:gap-2 lg-xl2:gap-2 xl-2xl1:gap-2 xl-2xl2:gap-2 gap-4">
                        {ServicesData.map((item) => (

                            <div key={item.id} className="flex  justify-center">
                                <FadeMove>
                                    <ServiceCard service={item} />
                                </FadeMove>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </FadeMove>
    );
};

export default ServicesList;
