"use server"

import { Settings } from "@prisma/client";

import { BatchPayload, db } from "@/db";
import { fetchLanguageIdByLocale } from "./languages";
import { TranslateMessage } from "./translate";

export type SettingsListTable = Omit<Settings, "languageId" | "text" >;
type CreateFirstSetting = Omit<Settings, "id" | "groupId">;
type CreateSettingWithGid = Omit<Settings, "id">;

export const fetchSettingListByLocale = async (locale: string): Promise<Settings[] | null> => {
    const language = await fetchLanguageIdByLocale(locale);
    if (!language) {
        return null;
    }
    return db.settings.findMany({
        where: {
            languageId: language.id
        },
        orderBy: {
            sortOrder: "asc"
        }
    });
};

export const fetchSettingsByUidAndLocale = async (uid: string, locale: string): Promise<Settings | null> => {
    return db.settings.findFirst({
        where: {
            groupId: uid,
            languageId: locale
        },
        include: {
            language: true
        }
    });
};

export const fetchSettingsByUid = async (uid: string): Promise<Settings[] | null> => {
    return db.settings.findMany({
        where: {
            groupId: uid
        },
        include: {
            language: true
        }
    });
};

export const fetchSettingListTableByLocale = async (locale: string): Promise<SettingsListTable[] | null> => {
    const language = await fetchLanguageIdByLocale(locale);
    if (!language) {
        return null;
    }
    return await db.settings.findMany({
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
            name: true,
            type: true,
            category: true,
            shorttag: true,
        }
    });
};

export const updateSettingStatusByUid = async (uid: string, status: boolean): Promise<number> => {
    const result = await db.$transaction(async (prisma) => {
        const updateResult = await prisma.settings.updateMany({
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

export const updateSettingById = async (id: string, data: Partial<Settings> ): Promise<Settings | null> => {
    return db.settings.update({
        where: { id },
        data
    });
};

export const createFirstSetting = async (data: CreateFirstSetting ): Promise<Settings | null> => {
    return db.settings.create({data});
};

export const createSettingWithGid = async (data: CreateSettingWithGid ): Promise<Settings | null> => {
    return db.settings.create({data});
};

export const deleteSettingsDbByUid = async (uid: string): Promise<BatchPayload> => {
    return db.settings.deleteMany({
        where: { groupId: uid }
    });
};

export const fetchNextSettingsOrder = async (): Promise<number> => {
    const result = await db.settings.findFirst({
        orderBy: { sortOrder: "desc" },
        select: { sortOrder: true }
    });
    return result && result.sortOrder > 0 ? result.sortOrder + 1 : 0;
};

export const fetchSettingsByLocale = async (locale: string): Promise<TranslateMessage | null> => {
    const language = await fetchLanguageIdByLocale(locale);
    if (!language) {
        return null;
    }
    const messages = await db.settings.findMany({
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
