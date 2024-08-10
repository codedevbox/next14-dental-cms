"use server"

import { Gallery } from "@prisma/client";
import { BatchPayload, db } from "@/db";

import { fetchLanguageIdByLocale } from "./languages";

export type GalleryListTable = Omit<Gallery, "languageId" >;
type CreateFirstGallery = Omit<Gallery, "id" | "groupId">;
type CreateGalleryWithGid = Omit<Gallery, "id">;

export const fetchGalleryListByLocale = async (locale: string): Promise<Gallery[] | null> => {
    const language = await fetchLanguageIdByLocale(locale);
    if (!language) {
        return null;
    }
    return db.gallery.findMany({
        where: {
            languageId: language.id
        },
        orderBy: {
            sortOrder: "asc"
        }
    });
};

export const fetchGalleryListPublishedByLocale = async (locale: string): Promise<Gallery[] | null> => {
    const language = await fetchLanguageIdByLocale(locale);
    if (!language) {
        return null;
    }
    return db.gallery.findMany({
        where: {
            languageId: language.id,
            published: true,
        },
        orderBy: {
            sortOrder: "asc"
        }
    });
};

export const fetchGalleryByUidAndLocale = async (uid: string, locale: string): Promise<Gallery | null> => {
    return db.gallery.findFirst({
        where: {
            groupId: uid,
            languageId: locale
        },
        include: {
            language: true
        }
    });
};

export const fetchGalleryByUid = async (uid: string): Promise<Gallery[] | null> => {
    return db.gallery.findMany({
        where: {
            groupId: uid
        },
        include: {
            language: true
        }
    });
};

export const fetchGalleryListTableByLocale = async (locale: string): Promise<GalleryListTable[] | null> => {
    const language = await fetchLanguageIdByLocale(locale);
    if (!language) {
        return null;
    }
    return await db.gallery.findMany({
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
            image: true
        }
    });
};

export const updateGalleryStatusByUid = async (uid: string, status: boolean): Promise<number> => {
    const result = await db.$transaction(async (prisma) => {
        const updateResult = await prisma.gallery.updateMany({
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

export const updateGalleryDbById = async (id: string, data: Partial<Gallery> ): Promise<Gallery | null> => {
    return db.gallery.update({
        where: { id },
        data
    });
};

export const createFirstGallery = async (data: CreateFirstGallery ): Promise<Gallery | null> => {
    return db.gallery.create({data});
};

export const createGalleryWithGid = async (data: CreateGalleryWithGid ): Promise<Gallery | null> => {
    return db.gallery.create({data});
};

export const deleteGalleryDbByUid = async (uid: string): Promise<BatchPayload> => {
    return db.gallery.deleteMany({
        where: { groupId: uid }
    });
};

export const fetchNextGalleryOrder = async (): Promise<number> => {
    const result = await db.gallery.findFirst({
        orderBy: { sortOrder: "desc" },
        select: { sortOrder: true }
    });
    return result && result.sortOrder > 0 ? result.sortOrder + 1 : 0;
};
