"use client"

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import { Gallery } from "@prisma/client";
import { Spinner } from "@nextui-org/react";

import { fetchGalleryListPublishedByLocale } from "@/db/queries/gallery";

import Lightbox from "./lightbox";
import FadeMove from "../transition/fadeMove";

const GaleryList: React.FC = () => {

    const locale = useLocale();
    const t = useTranslations("WEBSITE.CONTENT");

    const [GaleryData, setGaleryData] = useState<Gallery[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchGalleryData = async () => {
            try {
                const data = await fetchGalleryListPublishedByLocale(locale);
                setGaleryData(data || []);
            } catch (error) {
                console.error("Error fetching gallery data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGalleryData();
    }, [locale]);

    if (loading) {
        return <div className=" text-center py-10"><Spinner /></div>;
    };

    if (GaleryData.length === 0) {
        return;
    };

    return (
        <FadeMove>
        <div className="pt-20 px-4 sm:px-8 md:px-12 lg:px-10 xl:px-36 2xl:px-48">
            <h2 className="text-center font-thin text-4xl">{t("GALLERY_TITLE")}</h2>
            <div className=" pt-10 w-full flex justify-center">
                <div className="text-center font-thin text-base  max-w-[780px]">{t("GALLERY_DESCRIPTION")}</div>
            </div>
            <div className="pt-10 w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                {GaleryData && (
                    <Lightbox images={GaleryData} />
                )}
            </div>
        </div>
        </FadeMove>
    );
};

export default GaleryList;
