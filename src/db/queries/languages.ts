"use server"

import { Languages } from "@prisma/client";

import { FormInputType } from "@/components/admin/form/formTypes";
import { db } from "@/db";

export type LanguageId = Pick<Languages, "id">;
type OmitFullName = Omit<Languages, "fullName">;
export type LanguagesListTable = OmitFullName & {
    title: Languages["fullName"];
};
export type CreateLanguage = Omit<Languages, "id" | "published">;
export type UpdateLanguage = Omit<Languages, "published">;

export const getAvailableLocales = async (): Promise<string[]> => {
    const locales = await db.languages.findMany({
        where: {
            published: true,
        },
        select: {
            locale: true,
        },
        orderBy: {
            sortOrder: "asc",
        },
    });
    return locales.map(lang => lang.locale);
};

export const getDefaultLocale = async (): Promise<string> => {
    const defaultLocale = await db.languages.findFirst({
        where: {
            published: true,
            main: true,
        },
        select: {
            locale: true,
        },
    });
    return defaultLocale?.locale ?? "en";
};

export const fetchLanguageIdByLocale = async (locale: string): Promise<LanguageId | null> => {
    return db.languages.findUnique({
        where: {
            locale: locale
        },
        select: {
            id: true
        }
    });
};

export const fetchLanguageById = async (id: string): Promise<Languages | null> => {
    return db.languages.findUnique({
        where: {
            id: id
        }
    });
};

export const fetchLanguagesById = async (id: string): Promise<Languages[] | null> => {
    return db.languages.findMany({
        where: {
            id: id
        }
    });
};

export const fetchMainLanguage = async (): Promise<Languages[] | null> => {
    return db.languages.findMany({
        where: {
            main: true
        }
    });
};

export const fetchPublicLanguages = async (): Promise<Languages[] | null> => {
    return db.languages.findMany({
        orderBy: {
            sortOrder: "asc"
        }
    });
};

export const fetchLanguagesListTable = async (): Promise<LanguagesListTable[] | null> => {

    const languages = await db.languages.findMany({
        orderBy: {
            sortOrder: "asc"
        }
    });

    return languages.map(language => ({
        ...language,
        title: language.fullName
    }));
};

export const updateLanguageStatusDbById = async (id: string, status: boolean): Promise<Languages> => {
    return await db.languages.update({
        where: {
            id: id
        },
        data: {
            published: status
        }
    });
};

export const updateLanguageDbById = async (id: string, data: UpdateLanguage): Promise<Languages | null> => {
    return db.languages.update({
        where: { id },
        data
    });
};

export const createLanguage = async (data: CreateLanguage): Promise<Languages | null> => {
    return db.languages.create({ data });
};

export const deleteLanguageFromDbById = async (id: string): Promise<{ count: number }> => {
    return db.languages.deleteMany({
        where: { id: id }
    });
};

export const transformToUpdateLanguage = (data: FormInputType): UpdateLanguage | null => {
    if (
        typeof data.id === "string" &&
        typeof data.fullName === "string" &&
        typeof data.shortName === "string" &&
        typeof data.locale === "string" &&
        typeof data.icon === "string" &&
        typeof data.main === "boolean" &&
        typeof data.sortOrder === "number"
    ) {
        return {
            id: data.id,
            fullName: data.fullName,
            shortName: data.shortName,
            locale: data.locale,
            icon: data.icon,
            main: data.main,
            sortOrder: data.sortOrder
        };
    } else {
        return null;
    }
}

export const transformToCreateLanguage = (data: FormInputType): CreateLanguage | null => {
    if (
        typeof data.fullName === "string" &&
        typeof data.shortName === "string" &&
        typeof data.locale === "string" &&
        typeof data.icon === "string" &&
        typeof data.main === "boolean" &&
        typeof data.sortOrder === "number"
    ) {
        const res = {
            fullName: data.fullName,
            shortName: data.shortName,
            locale: data.locale,
            icon: data.icon,
            main: data.main,
            sortOrder: data.sortOrder
        };

        return res;
    } else {
        return null;
    }
};
