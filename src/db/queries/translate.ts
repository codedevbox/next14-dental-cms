"use server"

import { Translate } from "@prisma/client";

import { BatchPayload, db } from "@/db";
import { fetchLanguageIdByLocale } from "./languages";

export type TranslateListTable = Omit<Translate, "languageId" | "text" >;
type CreateFirstTranslate = Omit<Translate, "id" | "groupId">;
type CreateTranslateWithGid = Omit<Translate, "id">;

export interface TranslateMessage {
    [type: string]: {
        [category: string]: {
            [shorttag: string]: string;
        }
    };
};

export const fetchTranslateMessageByLocale = async (locale: string): Promise<TranslateMessage | null> => {
    const language = await fetchLanguageIdByLocale(locale);
    if (!language) {
        return null;
    }
    const messages = await db.translate.findMany({
        where: {
            languageId: language.id,
            published: true,
        },
        select: {
            id: true,
            type: true,
            category: true,
            shorttag: true,
            text: true,
        }
    });

    if (messages.length === 0) {
        return null;
    }

    return messages.reduce((acc: TranslateMessage, message) => {
        if (!acc[message.type]) {
            acc[message.type] = {};
        }
        if (!acc[message.type][message.category]) {
            acc[message.type][message.category] = {};
        }
        acc[message.type][message.category][message.shorttag] = message.text || "";
        return acc;
    }, {} as TranslateMessage);

};

export const fetchTranslateZodByLocale = async (locale: string): Promise<TranslateMessage | null> => {
    const language = await fetchLanguageIdByLocale(locale);
    if (!language) {
        return null;
    }
    const messages = await db.translate.findMany({
        where: {
            languageId: language.id,
            published: true,
            type: "ADMIN",
            category: "ZOD",
        },
        select: {
            id: true,
            type: true,
            category: true,
            shorttag: true,
            text: true,
        }
    });

    if (messages.length === 0) {
        return null;
    }

    return messages.reduce((acc: TranslateMessage, message) => {
        if (!acc[message.type]) {
            acc[message.type] = {};
        }
        if (!acc[message.type][message.category]) {
            acc[message.type][message.category] = {};
        }
        acc[message.type][message.category][message.shorttag] = message.text || "";
        return acc;
    }, {} as TranslateMessage);

};

export const fetchTranslateListByLocale = async (locale: string): Promise<Translate[] | null> => {
    const language = await fetchLanguageIdByLocale(locale);
    if (!language) {
        return null;
    }
    return db.translate.findMany({
        where: {
            languageId: language.id
        },
        orderBy: {
            sortOrder: "asc"
        }
    });
};

export const fetchTranslateListTableByLocale = async (locale: string): Promise<TranslateListTable[] | null> => {
    const language = await fetchLanguageIdByLocale(locale);
    if (!language) {
        return null;
    }
    return await db.translate.findMany({
        where: {
            languageId: language.id
        },
        orderBy: {
            sortOrder: "desc"
        },
        select: {
            id: true,
            groupId: true,
            published: true,
            sortOrder: true,
            name: true,
            type: true,
            category: true,
            shorttag: true,
        }
    });
};

export const fetchTranslatesByUidAndLocale = async (uid: string, locale: string): Promise<Translate | null> => {
    return db.translate.findFirst({
        where: {
            groupId: uid,
            languageId: locale
        },
        include: {
            language: true
        }
    });
};

export const fetchTranslatesByUid = async (uid: string): Promise<Translate[] | null> => {
    return db.translate.findMany({
        where: {
            groupId: uid
        },
        include: {
            language: true
        }
    });
};

export const updateTranslateStatusByUid = async (uid: string, status: boolean): Promise<number> => {
    const result = await db.$transaction(async (prisma) => {
        const updateResult = await prisma.translate.updateMany({
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


export const updateTranslateById = async (id: string, data: Partial<Translate> ): Promise<Translate | null> => {
    return db.translate.update({
        where: { id },
        data
    });
};

export const createFirstTranslate = async (data: CreateFirstTranslate ): Promise<Translate | null> => {
    return db.translate.create({data});
};

export const createTranslateWithGid = async (data: CreateTranslateWithGid ): Promise<Translate | null> => {
    return db.translate.create({data});
};

export const deleteTranslateDbByUid = async (uid: string): Promise<BatchPayload> => {
    return db.translate.deleteMany({
        where: { groupId: uid }
    });
};

export const fetchNextTranslateOrder = async (): Promise<number> => {
    const result = await db.translate.findFirst({
        orderBy: { sortOrder: "desc" },
        select: { sortOrder: true }
    });
    return result && result.sortOrder > 0 ? result.sortOrder + 1 : 0;
};
