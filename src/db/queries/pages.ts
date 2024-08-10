"use server"

import { Pages } from "@prisma/client";

import { db } from "@/db";
import { fetchLanguageIdByLocale } from "./languages";

export type PublishedPage = Pick<Pages, "name" | "slug">;
export type PageList = Pick<Pages, "id" | "groupId" | "published" | "sortOrder" | "name">;
export type PageListTable = Pick<Pages, "id" | "groupId" | "published" | "sortOrder" | "name">;
type CreatePage = Omit<Pages, "id">;
type CreatePageWithGid = Omit<Pages, "id">;

export const fetchPageBySlug = (slug: string): Promise<Pages | null> => {
    return db.pages.findFirst({
        where: { slug, published: true }
    });
};

export const fetchPublishedPages = async (): Promise<PublishedPage[]> => {
    return db.pages.findMany({
        where: { published: true },
        orderBy: {
            sortOrder: "asc"
        },
        select: {
            name: true,
            slug: true
        }
    });
};

export const fetchPageBySlugAndLocale = async (locale: string, slug: string): Promise<Pages | null> => {
    const language = await fetchLanguageIdByLocale(locale);
    if (!language) {
        return null;
    }
    return db.pages.findFirst({
        where: {
            slug, published: true,
            languageId: language.id
        }
    });
};

export const fetchPublishedPagesByLocale = async (locale: string): Promise<PublishedPage[]> => {
    const language = await fetchLanguageIdByLocale(locale);
    if (!language) {
        return [];
    }
    return db.pages.findMany({
        where: {
            published: true,
            languageId: language.id
        },
        orderBy: {
            sortOrder: "asc"
        },
        select: {
            name: true,
            slug: true
        }
    });
};

export const fetchPageListTableByLocale = async (locale: string): Promise<PageListTable[] | null> => {
    const language = await fetchLanguageIdByLocale(locale);
    if (!language) {
        return null;
    }
    return await db.pages.findMany({
        where: {
            languageId: language.id
        },
        orderBy: {
            sortOrder: "asc"
        },
        select: {
            id: true,
            groupId: true,
            published: true,
            sortOrder: true,
            name: true
        }
    });
};

export const fetchPageListByLocale = async (locale: string): Promise<PageList[] | null> => {
    const language = await fetchLanguageIdByLocale(locale);
    if (!language) {
        return null;
    }
    return db.pages.findMany({
        where: {
            languageId: language.id
        },
        orderBy: {
            sortOrder: "asc"
        },
        select: {
            id: true,
            groupId: true,
            published: true,
            sortOrder: true,
            name: true
        }
    });
};

export const fetchPagesByUid = async (uid: string): Promise<Pages[] | null> => {
    return db.pages.findMany({
        where: {
            groupId: uid
        },
        include: {
            language: true
        }
    });
};

export const fetchPagesByUidAndLocale = async (uid: string, locale: string): Promise<Pages | null> => {
    return db.pages.findFirst({
        where: {
            groupId: uid,
            languageId: locale
        },
        include: {
            language: true
        }
    });
};

export const updatePageStatusByUid = async (uid: string, status: boolean): Promise<number> => {
    const result = await db.$transaction(async (prisma) => {
        const updateResult = await prisma.pages.updateMany({
            where: {
                groupId: uid
            },
            data: {
                published: status
            }
        });
        return updateResult.count;
    });
    return result;
};

export const updatePageById = async (id: string, data: Partial<Pages> ): Promise<Pages | null> => {
    return db.pages.update({
        where: { id },
        data
    });
};

export const createPage = async (data: CreatePage ): Promise<Pages | null> => {
    return db.pages.create({data});
};

export const createPageWithGid = async (data: CreatePageWithGid ): Promise<Pages | null> => {
    return db.pages.create({data});
};
