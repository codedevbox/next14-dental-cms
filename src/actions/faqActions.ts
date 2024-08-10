"use server";

import { FormInputType } from "@/components/admin/form/formTypes";
import { parseLanguageData } from "@/components/admin/form/utils";
import { faqFields } from "@/components/admin/form/configs/faq/faqFields";
import {
  createFirstFaq,
  createFaqWithGid,
  deleteFaqByUid,
  fetchFaqsByUid,
  fetchFaqsByUidAndLocale,
  updateFaqById,
  updateFaqStatusByUid
} from "@/db/queries/faq";


export const addFaq = async (data: FormInputType): Promise<{ status: string, message: string, groupId?: string }> => {
    const languageData = parseLanguageData(faqFields, data);

    let createdCount = 0;
    let groupId: string = "";

    try {
        for (const lang of Object.keys(languageData)) {
            if (!groupId) {
                const firstItem = await createFirstFaq({...languageData[lang]});
                if (firstItem?.groupId && firstItem.groupId.length > 0) {
                    groupId = firstItem.groupId;
                    createdCount++;
                }
            } else {
                const insertedItem = await createFaqWithGid({ ...languageData[lang], groupId });
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

export const updateFaqByUid = async (groupId: string, data: FormInputType): Promise<{ status: string, message: string }> => {
    const languageData = parseLanguageData(faqFields, data);

    let updatedCount = 0;
    let createdCount = 0;

    try {
        for (const lang of Object.keys(languageData)) {
            const service = languageData[lang];
            const existingFaq = await fetchFaqsByUidAndLocale(groupId, service.languageId);
            if (!existingFaq) {
                const insertedItem = await createFaqWithGid({ ...languageData[lang], groupId });
                if (insertedItem?.id && insertedItem.id.length > 0) {
                    createdCount++;
                }
            } else {
                const insertedItem = await updateFaqById(existingFaq.id, { ...languageData[lang], groupId });
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

export const changeFaqStatusByUid = async (uid: string, status: boolean): Promise<{ status: string, message: string }> => {
    try {
        const result = await updateFaqStatusByUid(uid, status);
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

export const deleteFaqsByUid = async (uid: string): Promise<{ status: string, message: string }> => {
    try {
        const services = await fetchFaqsByUid(uid);
        if (!services || services.length === 0) {
            throw new Error("OBJECT_NOT_FOUND");
        }        
        const result = await deleteFaqByUid(uid);
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
