import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { Metadata } from "next";

import Intro from "@/components/app/intro/intro";
import FAQList from "@/components/app/faq/faqList";
import ServicesList from "@/components/app/services/servicesList";
import TestimonialsList from "@/components/app/testimonials/testimonialsList";
import GaleryList from "@/components/app/galery/galeryList";
import ContactForm from "@/components/app/contactForm";
import Footer from "@/components/app/footer/footer";
import Navbar from "@/components/app/navbar/navbar";

import { fetchPageBySlugAndLocale } from "@/db/queries/pages";
import { getLocaleLinksForPage } from "@/services/languageService";

export async function generateMetadata(): Promise<Metadata> {
    const locale = await getLocale();
    const data = await fetchPageBySlugAndLocale(locale, "/");
    return {
        title: data?.title || "Dental Clinic",
        description: data?.description || "Trust us for personalized treatment and comprehensive solutions.",
    }
};

const Home = async () => {
    const locale = await getLocale();
    const localeLink = await getLocaleLinksForPage(locale, "/");
    const data = await fetchPageBySlugAndLocale(locale, "/");

    if (!data) {
        notFound();
    }

    const headerData = {
        title: data.headTitle,
        description: data.headDescription,
        imageUrl: data.headImage,
    };

    return (
        <>
            <Navbar localeLink={localeLink} />
            <Intro {...headerData} />
            <ServicesList />
            <FAQList />
            <TestimonialsList />
            <GaleryList />
            <ContactForm />
            <Footer />
        </>
    );
};

export default Home;
