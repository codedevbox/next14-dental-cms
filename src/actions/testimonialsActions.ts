"use server";

import path from "path";

import { FormInputType } from "@/components/admin/form/formTypes";
import { parseLanguageData } from "@/components/admin/form/utils";
import { testimonialsFields } from "@/components/admin/form/configs/testimonials/testimonialsFields";
import {
  createFirstTestimonial,
  createTestimonialWithGid,
  deleteTestimonialsByUid,
  fetchTestimonialsByUid,
  fetchTestimonialsByUidAndLocale,
  updateTestimonialById,
  updateTestimonialStatusByUid,
} from "@/db/queries/testimonials";
import { checkFileExists, deleteFile } from "./utils";

export const addTestimonials = async (data: FormInputType): Promise<{ status: string, message: string, groupId?: string }> => {
    const languageData = parseLanguageData(testimonialsFields, data);

    let createdCount = 0;
    let groupId: string = "";

    try {
        for (const lang of Object.keys(languageData)) {
            if (!groupId) {
                const firstTestimonial = await createFirstTestimonial({...languageData[lang]});
                if (firstTestimonial?.groupId && firstTestimonial.groupId.length > 0) {
                    groupId = firstTestimonial.groupId;
                    createdCount++;
                }
            } else {
                const insertedItem = await createTestimonialWithGid({ ...languageData[lang], groupId });
                if (insertedItem?.id && insertedItem.id.length > 0) {
                    createdCount++;
                }
            }
        }
        return {
            status: "success",
            message: "SUCCESSFULLY_ADDED",
            groupId
        };
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(error);
            return { status: "error", message: error.message };
        }
        console.log(error);
        return { status: "error", message: "UNKNOWN_ERROR_OCCURRED" };
    }
};

export const updateTestimonialsByUid = async (groupId: string, data: FormInputType): Promise<{ status: string, message: string }> => {
    const languageData = parseLanguageData(testimonialsFields, data);

    let updatedCount = 0;
    let createdCount = 0;

    try {
        for (const lang of Object.keys(languageData)) {
            const item = languageData[lang];
            const existingItem = await fetchTestimonialsByUidAndLocale(groupId, item.languageId);

            if (!existingItem) {
                const insertedItem = await createTestimonialWithGid({ ...languageData[lang], groupId });
                if (insertedItem?.id && insertedItem.id.length > 0) {
                    createdCount++;
                }
            } else {
                const insertedItem = await updateTestimonialById(existingItem.id, { ...languageData[lang], groupId });
                if (insertedItem?.id && insertedItem.id.length > 0) {
                    updatedCount++;
                }
            }
        }
        return {
            status: "success",
            message: "SUCCESSFULLY_UPDATED",
        };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { status: "error", message: error.message };
        }
        return { status: "error", message: "UNKNOWN_ERROR_OCCURRED" };
    }    
};

export const changeTestimonialStatusByUid = async (uid: string, status: boolean): Promise<{ status: string, message: string }> => {
    try {
        const result = await updateTestimonialStatusByUid(uid, status);
        return {
            status: "success",
            message: "SUCCESSFULLY_UPDATED",
        };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { status: "error", message: error.message };
        }
        return { status: "error", message: "UNKNOWN_ERROR_OCCURRED" };
    }
};

export const deleteTestimonialByUid = async (uid: string): Promise<{ status: string, message: string }> => {
    try {
        const items = await fetchTestimonialsByUid(uid);
        if (!items || items.length === 0) {
            throw new Error("OBJECT_NOT_FOUND");
        }
        
        for (const item of items) {
            if (item.image) {
                console.log(item.image);
                const rawPath = item.image.replace(/^\/api\/images\//, "");
                console.log(rawPath);
                const decodedPath = decodeURIComponent(rawPath);
                console.log(decodedPath);
                const filePath = path.join("./storage/images/", decodedPath);
                console.log(filePath);
                const fileExists = await checkFileExists(filePath);
                if (fileExists) {
                    try {
                        await deleteFile(filePath);
                    } catch (error) {
                        if (error instanceof Error) {
                            throw new Error("FILE_DELETION_FAILED");
                        }
                    }
                }               
            }
        }

        const result = await deleteTestimonialsByUid(uid);

        if (result.count === 0) {
            throw new Error("DELETION_ERROR");
        }

        return {
            status: "success",
            message: "SUCCESSFULLY_DELETED",
        };
        
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { status: "error", message: error.message };
        }
        return { status: "error", message: "UNKNOWN_ERROR_OCCURRED" };
    }
};
