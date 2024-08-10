"use server";

import { settingsFields } from "@/components/admin/form/configs/settings/settingsFields";
import { FormInputType } from "@/components/admin/form/formTypes";
import { parseLanguageData } from "@/components/admin/form/utils";
import {
  createFirstSetting,
  createSettingWithGid,
  deleteSettingsDbByUid,
  fetchSettingsByUid,
  fetchSettingsByUidAndLocale,
  updateSettingById,
  updateSettingStatusByUid
} from "@/db/queries/settings";

export const addSettings = async (data: FormInputType): Promise<{ status: string, message: string, groupId?: string }> => {
    const languageData = parseLanguageData(settingsFields, data);

    let createdCount = 0;
    let groupId: string = "";

    try {
        for (const lang of Object.keys(languageData)) {
            if (!groupId) {
                const firstItem = await createFirstSetting({...languageData[lang]});
                if (firstItem?.groupId && firstItem.groupId.length > 0) {
                    groupId = firstItem.groupId;
                    createdCount++;
                }
            } else {
                const insertedItem = await createSettingWithGid({ ...languageData[lang], groupId });
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

export const updateSettingsByUid = async (groupId: string, data: FormInputType): Promise<{ status: string, message: string }> => {
    const languageData = parseLanguageData(settingsFields, data);

    let updatedCount = 0;
    let createdCount = 0;

    try {
        for (const lang of Object.keys(languageData)) {
            const service = languageData[lang];
            const existingSettings = await fetchSettingsByUidAndLocale(groupId, service.languageId);
            if (!existingSettings) {
                const insertedItem = await createSettingWithGid({ ...languageData[lang], groupId });
                if (insertedItem?.id && insertedItem.id.length > 0) {
                    createdCount++;
                }
            } else {
                const insertedItem = await updateSettingById(existingSettings.id, { ...languageData[lang], groupId });
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

export const changeSettingsStatusByUid = async (uid: string, status: boolean): Promise<{ status: string, message: string }> => {
    try {
        const result = await updateSettingStatusByUid(uid, status);
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

export const deleteSettingsByUid = async (uid: string): Promise<{ status: string, message: string }> => {
    try {
        const services = await fetchSettingsByUid(uid);
        if (!services || services.length === 0) {
            throw new Error("OBJECT_NOT_FOUND");
        }
        
        const result = await deleteSettingsDbByUid(uid);
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
