"use server";

import path from "path";

import { FormInputType } from "@/components/admin/form/formTypes";
import { parseLanguageData } from "@/components/admin/form/utils";
import { galleryFields } from "@/components/admin/form/configs/gallery/galleryFields";
import {
  createFirstGallery,
  createGalleryWithGid,
  deleteGalleryDbByUid,
  fetchGalleryByUid,
  fetchGalleryByUidAndLocale,
  updateGalleryDbById,
  updateGalleryStatusByUid
} from "@/db/queries/gallery";
import { checkFileExists, deleteFile } from "./utils";


export const addGallery = async (data: FormInputType): Promise<{ status: string, message: string, groupId?: string }> => {
    const languageData = parseLanguageData(galleryFields, data);

    let createdCount = 0;
    let groupId: string = "";

    try {
        for (const lang of Object.keys(languageData)) {
            if (!groupId) {
                const firstGallery = await createFirstGallery({...languageData[lang]});
                if (firstGallery?.groupId && firstGallery.groupId.length > 0) {
                    groupId = firstGallery.groupId;
                    createdCount++;
                }
            } else {
                const insertedItem = await createGalleryWithGid({ ...languageData[lang], groupId });
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
}

export const updateGalleryByUid = async (groupId: string, data: FormInputType): Promise<{ status: string, message: string }> => {
    const languageData = parseLanguageData(galleryFields, data);

    let updatedCount = 0;
    let createdCount = 0;

    try {
        for (const lang of Object.keys(languageData)) {
            const item = languageData[lang];
            const existingItem = await fetchGalleryByUidAndLocale(groupId, item.languageId);
            if (!existingItem) {
                const insertedItem = await createGalleryWithGid({ ...languageData[lang], groupId });
                if (insertedItem?.id && insertedItem.id.length > 0) {
                    createdCount++;
                }
            } else {
                const insertedItem = await updateGalleryDbById(existingItem.id, { ...languageData[lang], groupId });
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

export const changeGalleryStatusByUid = async (uid: string, status: boolean): Promise<{ status: string, message: string }> => {
    try {
        const result = await updateGalleryStatusByUid(uid, status);
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

export const deleteGalleryByUid = async (uid: string): Promise<{ status: string, message: string }> => {
    try {
        const items = await fetchGalleryByUid(uid);
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

        const result = await deleteGalleryDbByUid(uid);
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
