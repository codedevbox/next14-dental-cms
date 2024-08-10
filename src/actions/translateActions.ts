"use server";

import { settingsFields } from "@/components/admin/form/configs/settings/settingsFields";
import { FormInputType } from "@/components/admin/form/formTypes";
import { parseLanguageData } from "@/components/admin/form/utils";
import {
  createFirstTranslate,
  createTranslateWithGid,
  deleteTranslateDbByUid,
  fetchTranslatesByUid,
  fetchTranslatesByUidAndLocale,
  updateTranslateById,
  updateTranslateStatusByUid,
} from "@/db/queries/translate";

export const addTranslate = async (data: FormInputType): Promise<{ status: string, message: string, groupId?: string }> => {
    const languageData = parseLanguageData(settingsFields, data);

    let createdCount = 0;
    let groupId: string = "";

    try {
        for (const lang of Object.keys(languageData)) {
            if (!groupId) {
                const firstItem = await createFirstTranslate({...languageData[lang]});
                if (firstItem?.groupId && firstItem.groupId.length > 0) {
                    groupId = firstItem.groupId;
                    createdCount++;
                }
            } else {
                const insertedItem = await createTranslateWithGid({ ...languageData[lang], groupId });
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

export const updateTranslateByUid = async (groupId: string, data: FormInputType): Promise<{ status: string, message: string }> => {
    const languageData = parseLanguageData(settingsFields, data);

    let updatedCount = 0;
    let createdCount = 0;

    try {
        for (const lang of Object.keys(languageData)) {

            const service = languageData[lang];
            const existingTranslate = await fetchTranslatesByUidAndLocale(groupId, service.languageId);

            if (!existingTranslate) {
                const insertedItem = await createTranslateWithGid({ ...languageData[lang], groupId });
                if (insertedItem?.id && insertedItem.id.length > 0) {
                    createdCount++;
                }
            } else {
                const insertedItem = await updateTranslateById(existingTranslate.id, { ...languageData[lang], groupId });
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

export const changeTranslateStatusByUid = async (uid: string, status: boolean): Promise<{ status: string, message: string }> => {
    try {
        const result = await updateTranslateStatusByUid(uid, status);
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

export const deleteTranslateByUid = async (uid: string): Promise<{ status: string, message: string }> => {
    try {

        const services = await fetchTranslatesByUid(uid);

        if (!services || services.length === 0) {
            throw new Error("OBJECT_NOT_FOUND");
        }
        
        const result = await deleteTranslateDbByUid(uid);

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
