import { Languages } from "@prisma/client";

import { db } from "@/db";

export interface localizedSlugs {
    locale: string;
    slug: string;
};

export interface LocaleLink {
    locales: Languages[];
    links: localizedSlugs[];
};

export const getLocaleLinksForPage = async (locale: string, slug: string): Promise<LocaleLink | null> => {
    try {
        const locales = await db.languages.findMany({
            where: { published: true },
            orderBy: { sortOrder: "asc" }
        });
        
        const language = locales.find(lang => lang.locale === locale);
        if (!language) return null;
        
        const currentPage = await db.pages.findFirst({
            where: {
                languageId: language.id,
                slug,
                published: true
            },
            select: { groupId: true }
        });

        if (!currentPage) return null;

        const rawLocalesLinks = await db.pages.findMany({
            where: {
                groupId: currentPage.groupId,
                published: true
            },
            select: {
                slug: true,
                language: { select: { locale: true } }
            }
        });

        const links = rawLocalesLinks.map(link => ({
            locale: link.language.locale,
            slug: link.slug
        }));

        return { locales, links };
    } catch (error) {
        console.error("Failed to get locale links for page:", error);
        return null;
    }
};
