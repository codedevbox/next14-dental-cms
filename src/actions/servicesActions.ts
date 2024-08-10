"use server";

import path from "path";

import { FormInputType } from "@/components/admin/form/formTypes";
import { servicesFields } from "@/components/admin/form/configs/services/servicesFields";
import { parseLanguageData } from "@/components/admin/form/utils";
import {
  createFirstService,
  createServiceWithGid,
  deleteServicesByUid,
  fetchServicesByUid,
  fetchServicesByUidAndLocale,
  updateServiceById,
  updateServiceStatusByUid
} from "@/db/queries/services";
import { checkFileExists, deleteFile } from "./utils";

export const addServices = async (data: FormInputType): Promise<{ status: string, message: string, groupId?: string }> => {
    const languageData = parseLanguageData(servicesFields, data);

    let createdCount = 0;
    let groupId: string = "";

    try {
        for (const lang of Object.keys(languageData)) {
            if (!groupId) {
                const firstService = await createFirstService({...languageData[lang]});
                if (firstService?.groupId && firstService.groupId.length > 0) {
                    groupId = firstService.groupId;
                    createdCount++;
                }
            } else {
                const insertedItem = await createServiceWithGid({ ...languageData[lang], groupId });
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

export const updateServicesByUid = async (groupId: string, data: FormInputType): Promise<{ status: string, message: string }> => {
    const languageData = parseLanguageData(servicesFields, data);

    let updatedCount = 0;
    let createdCount = 0;

    try {
        for (const lang of Object.keys(languageData)) {
            const item = languageData[lang];
            const existingService = await fetchServicesByUidAndLocale(groupId, item.languageId);

            if (!existingService) {
                const insertedItem = await createServiceWithGid({ ...languageData[lang], groupId });
                if (insertedItem?.id && insertedItem.id.length > 0) {
                    createdCount++;
                }
            } else {
                const insertedItem = await updateServiceById(existingService.id, { ...languageData[lang], groupId });
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

export const changeServiceStatusByUid = async (uid: string, status: boolean): Promise<{ status: string, message: string }> => {
    try {
        const result = await updateServiceStatusByUid(uid, status);
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

export const deleteServiceByUid = async (uid: string): Promise<{ status: string, message: string }> => {
    try {
        const items = await fetchServicesByUid(uid);
        if (!items || items.length === 0) {
            throw new Error("OBJECT_NOT_FOUND");
        }
        
        for (const item of items) {
            if (item.image) {
                const rawPath = item.image.replace(/^\/api\/images\//, "");
                const decodedPath = decodeURIComponent(rawPath);
                const filePath = path.join("./storage/images/", decodedPath);
                console.log(filePath);
                const fileExists = await checkFileExists(filePath);
                if (fileExists) {
                    try {
                        await deleteFile(filePath);
                    } catch (error) {
                        if (error instanceof Error) {
                            console.log(`Error ${error}`);
                            throw new Error("FILE_DELETION_FAILED");
                        }
                    }
                }          
            }
        }

        const result = await deleteServicesByUid(uid);
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
