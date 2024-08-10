
"use server"

import { Testimonials } from "@prisma/client";

import { BatchPayload, db } from "@/db";
import { fetchLanguageIdByLocale } from "./languages";

export type TestimonialsListTable = Omit<Testimonials, "languageId" >;
type CreateFirstTestimonial = Omit<Testimonials, "id" | "groupId">;
type CreateTestimonialWithGid = Omit<Testimonials, "id">;

export const fetchTestimonialListByLocale = async (locale: string): Promise<Testimonials[] | null> => {
    const language = await fetchLanguageIdByLocale(locale);
    if (!language) {
        return null;
    }
    return db.testimonials.findMany({
        where: {
            languageId: language.id
        },
        orderBy: {
            sortOrder: "asc"
        }
    });
};

export const fetchTestimonialPublishedByLocale = async (locale: string): Promise<Testimonials[] | null> => {
    const language = await fetchLanguageIdByLocale(locale);
    if (!language) {
        return null;
    }
    return db.testimonials.findMany({
        where: {
            languageId: language.id,
            published: true
        },
        orderBy: {
            sortOrder: "asc"
        }
    });
};

export const fetchTestimonialsByUidAndLocale = async (uid: string, locale: string): Promise<Testimonials | null> => {
    return db.testimonials.findFirst({
        where: {
            groupId: uid,
            languageId: locale
        },
        include: {
            language: true
        }
    });
};

export const fetchTestimonialsByUid = async (uid: string): Promise<Testimonials[] | null> => {
    return db.testimonials.findMany({
        where: {
            groupId: uid
        },
        include: {
            language: true
        }
    });
};

export const fetchTestimonialListTableByLocale = async (locale: string): Promise<TestimonialsListTable[] | null> => {
    const language = await fetchLanguageIdByLocale(locale);
    if (!language) {
        return null;
    }
    return await db.testimonials.findMany({
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
            image: true,
            text: true,
        }
    });
};

export const updateTestimonialStatusByUid = async (uid: string, status: boolean): Promise<number> => {
    const result = await db.$transaction(async (prisma) => {
        const updateResult = await prisma.testimonials.updateMany({
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

export const updateTestimonialById = async (id: string, data: Partial<Testimonials> ): Promise<Testimonials | null> => {
    return db.testimonials.update({
        where: { id },
        data
    });
};

export const createFirstTestimonial = async (data: CreateFirstTestimonial ): Promise<Testimonials | null> => {
    return db.testimonials.create({data});
};

export const createTestimonialWithGid = async (data: CreateTestimonialWithGid ): Promise<Testimonials | null> => {
    return db.testimonials.create({data});
};

export const deleteTestimonialsByUid = async (uid: string): Promise<BatchPayload> => {
    return db.testimonials.deleteMany({
        where: { groupId: uid }
    });
};

export const fetchNextTestimonialsOrder = async (): Promise<number> => {
    const result = await db.testimonials.findFirst({
        orderBy: { sortOrder: "desc" },
        select: { sortOrder: true }
    });
    return result && result.sortOrder > 0 ? result.sortOrder + 1 : 0;
};
