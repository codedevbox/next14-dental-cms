"use server"

import { Services } from "@prisma/client";

import { BatchPayload, db } from "@/db";
import { fetchLanguageIdByLocale } from "./languages";

export type ServiceList = Pick<Services, "id" | "groupId" | "published" | "sortOrder" | "title">;
export type ServiceListTable = Omit<Services, "languageId" >;
type CreateFirstService = Omit<Services, "id" | "groupId">;
type CreateServiceWithGid = Omit<Services, "id">;

export const fetchServicesByLocale = async (locale: string): Promise<Services[] | null> => {
    const language = await fetchLanguageIdByLocale(locale);
    if (!language) {
        return null;
    }
    return db.services.findMany({
        where: {
            languageId: language.id
        },
        orderBy: {
            sortOrder: "asc"
        }
    });
};

export const fetchServicesPublishedByLocale = async (locale: string): Promise<Services[] | null> => {
    const language = await fetchLanguageIdByLocale(locale);
    if (!language) {
        return null;
    }
    return db.services.findMany({
        where: {
            languageId: language.id,
            published: true,
        },
        orderBy: {
            sortOrder: "asc"
        }
    });
};

export const fetchServiceListByLocale = async (locale: string): Promise<ServiceList[] | null> => {
    const language = await fetchLanguageIdByLocale(locale);
    if (!language) {
        return null;
    }
    return db.services.findMany({
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
            title: true
        }
    });
};

export const fetchServiceListTableByLocale = async (locale: string): Promise<ServiceListTable[] | null> => {
    const language = await fetchLanguageIdByLocale(locale);
    if (!language) {
        return null;
    }
    return db.services.findMany({
        where: {
            languageId: language.id
        },
        orderBy: {
            sortOrder: "asc"
        }
    });
};

export const fetchServicesByUidAndLocale = async (uid: string, locale: string): Promise<Services | null> => {
    return db.services.findFirst({
        where: {
            groupId: uid,
            languageId: locale
        },
        include: {
            language: true
        }
    });
};

export const fetchServicesByUid = async (uid: string): Promise<Services[] | null> => {
    return db.services.findMany({
        where: {
            groupId: uid
        },
        include: {
            language: true
        }
    });
};

export const updateServiceStatusByUid = async (uid: string, status: boolean): Promise<number> => {
    const result = await db.$transaction(async (prisma) => {
        const updateResult = await prisma.services.updateMany({
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

export const updateServiceById = async (id: string, data: Partial<Services> ): Promise<Services | null> => {
    return db.services.update({
        where: { id },
        data
    });
};

export const createFirstService = async (data: CreateFirstService ): Promise<Services | null> => {
    return db.services.create({data});
};

export const createServiceWithGid = async (data: CreateServiceWithGid ): Promise<Services | null> => {
    return db.services.create({data});
};

export const deleteServicesByUid = async (uid: string): Promise<BatchPayload> => {
    return db.services.deleteMany({
        where: { groupId: uid }
    });
};

export const fetchNextServicesOrder = async (): Promise<number> => {
    const result = await db.services.findFirst({
        orderBy: { sortOrder: "desc" },
        select: { sortOrder: true }
    });
    return result && result.sortOrder > 0 ? result.sortOrder + 1 : 0;
};
