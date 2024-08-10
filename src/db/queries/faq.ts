
"use server"

import { Faq } from "@prisma/client";
import { BatchPayload, db } from "@/db";

import { fetchLanguageIdByLocale } from "./languages";

export type FaqListTable = Omit<Faq, "languageId" >;
type CreateFirstFaq = Omit<Faq, "id" | "groupId">;
type CreateFaqWithGid = Omit<Faq, "id">;

export const fetchFaqListByLocale = async (locale: string): Promise<Faq[] | null> => {
    const language = await fetchLanguageIdByLocale(locale);
    if (!language) {
        return null;
    }
    return db.faq.findMany({
        where: {
            languageId: language.id
        },
        orderBy: {
            sortOrder: "asc"
        }
    });
};

export const fetchFaqListPublishedByLocale = async (locale: string): Promise<Faq[] | null> => {
    const language = await fetchLanguageIdByLocale(locale);
    if (!language) {
        return null;
    }
    return db.faq.findMany({
        where: {
            languageId: language.id,
            published: true
        },
        orderBy: {
            sortOrder: "asc"
        }
    });
};

export const fetchFaqListTableByLocale = async (locale: string): Promise<FaqListTable[] | null> => {
    const language = await fetchLanguageIdByLocale(locale);
    if (!language) {
        return null;
    }
    return await db.faq.findMany({
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
            question: true, 
            answer: true
        }
    });
};

export const fetchFaqsByUidAndLocale = async (uid: string, locale: string): Promise<Faq | null> => {
    return db.faq.findFirst({
        where: {
            groupId: uid,
            languageId: locale
        },
        include: {
            language: true
        }
    });
};

export const fetchFaqsByUid = async (uid: string): Promise<Faq[] | null> => {
    return db.faq.findMany({
        where: {
            groupId: uid
        },
        include: {
            language: true
        }
    });
};

export const updateFaqStatusByUid = async (uid: string, status: boolean): Promise<number> => {
    const result = await db.$transaction(async (prisma) => {
        const updateResult = await prisma.faq.updateMany({
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


export const updateFaqById = async (id: string, data: Partial<Faq> ): Promise<Faq | null> => {
    return db.faq.update({
        where: { id },
        data
    });
};

export const createFirstFaq = async (data: CreateFirstFaq ): Promise<Faq | null> => {
    return db.faq.create({data});
};

export const createFaqWithGid = async (data: CreateFaqWithGid ): Promise<Faq | null> => {
    return db.faq.create({data});
};

export const deleteFaqByUid = async (uid: string): Promise<BatchPayload> => {
    return db.faq.deleteMany({
        where: { groupId: uid }
    });
};

export const fetchNextFaqOrder = async (): Promise<number> => {
    const result = await db.faq.findFirst({
        orderBy: { sortOrder: "desc" },
        select: { sortOrder: true }
    });
    return result && result.sortOrder > 0 ? result.sortOrder + 1 : 0;
};
