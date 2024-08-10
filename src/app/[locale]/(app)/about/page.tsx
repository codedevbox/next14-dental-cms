import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { Metadata } from "next";


import Breadcrumbs from "@/components/app/breadcrumbs";
import ContactForm from "@/components/app/contactForm";
import ContentOfPage from "@/components/app/contentPage";
import Footer from "@/components/app/footer/footer";
import GaleryList from "@/components/app/galery/galeryList";
import Header from "@/components/app/headerPage";
import Navbar from "@/components/app/navbar/navbar";

import { fetchPageBySlugAndLocale } from "@/db/queries/pages";
import { getLocaleLinksForPage } from "@/services/languageService";

export async function generateMetadata(): Promise<Metadata> {
    const locale = await getLocale();
    const data = await fetchPageBySlugAndLocale(locale, "about");
    return {
        title: data?.title || "About :: Dental Clinic",
        description: data?.description || "Trust us for personalized treatment and comprehensive solutions.",
    }
};

const AboutPage = async () => {
    const locale = await getLocale();
    const localeLink = await getLocaleLinksForPage(locale, "about");
    const data = await fetchPageBySlugAndLocale(locale, "about");

    if (!data) {
        notFound();
    };

    const headerData = {
        title: data.headTitle,
        description: data.headDescription,
        imageUrl: data.headImage
    };

    const breadcrumbs = [
        { title: "Home", url: "/" },
        { title: data.name, url: "" }
    ];

    return (
        <>
            <Navbar localeLink={localeLink} />
            <Header {...headerData} />
            <Breadcrumbs items={breadcrumbs} />
            <ContentOfPage title={data.h1} text={data.content} />
            <GaleryList />
            <ContactForm />
            <Footer />
        </>
    );
};

export default AboutPage;
