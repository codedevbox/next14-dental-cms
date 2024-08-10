import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { Metadata } from "next";

import Breadcrumbs from "@/components/app/breadcrumbs";
import ContactForm from "@/components/app/contactForm";
import ContentOfPage from "@/components/app/contentPage";
import Footer from "@/components/app/footer/footer";
import Header from "@/components/app/headerPage";
import Navbar from "@/components/app/navbar/navbar";

import { fetchPageBySlugAndLocale } from "@/db/queries/pages";
import { getLocaleLinksForPage } from "@/services/languageService";

export async function generateMetadata(): Promise<Metadata> {
    const locale = await getLocale();
    const data = await fetchPageBySlugAndLocale(locale, "contact");
    return {
        title: data?.title || "Contact :: Dental Clinic",
        description: data?.description || "Trust us for personalized treatment and comprehensive solutions.",
    }
};

const ContactPage = async () => {
    const locale = await getLocale();
    const localeLink = await getLocaleLinksForPage(locale, "contact");
    const data = await fetchPageBySlugAndLocale(locale, "contact");

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
            <ContactForm />
            <Footer />
        </>
    );
};

export default ContactPage;
