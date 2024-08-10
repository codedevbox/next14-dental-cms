"use server";

import { FormInputType } from "@/components/admin/form/formTypes";
import { parseLanguageData } from "@/components/admin/form/utils";
import { sectionsFields } from "@/components/admin/form/configs/sections/sectionsFields";
import {
  createPageWithGid,
  fetchPagesByUidAndLocale,
  updatePageById,
  updatePageStatusByUid
} from "@/db/queries/pages";


export const updatePagesByUid = async (groupId: string, data: FormInputType): Promise<{ status: string, message: string }> => {
    const languageData = parseLanguageData(sectionsFields, data);

    let updatedCount = 0;
    let createdCount = 0;

    try {
        for (const lang of Object.keys(languageData)) {
            const service = languageData[lang];
            const existingService = await fetchPagesByUidAndLocale(groupId, service.languageId);
            if (!existingService) {
                const insertedItem = await createPageWithGid({ ...languageData[lang], groupId });
                if (insertedItem?.id && insertedItem.id.length > 0) {
                    createdCount++;
                }
            } else {
                const insertedItem = await updatePageById(existingService.id, { ...languageData[lang], groupId });
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

export const changePageStatusByUid = async (uid: string, status: boolean): Promise<{ status: string, message: string }> => {
    try {
        const result = await updatePageStatusByUid(uid, status);
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
