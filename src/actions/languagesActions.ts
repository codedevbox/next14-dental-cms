"use server";

import { FormInputType } from "@/components/admin/form/formTypes";
import { parseFormData } from "@/components/admin/form/utils";
import { languagesFields } from "@/components/admin/form/configs/languages/languagesFields";
import {
  CreateLanguage,
  createLanguage,
  deleteLanguageFromDbById,
  fetchLanguageById,
  fetchMainLanguage,
  UpdateLanguage,
  updateLanguageDbById,
  updateLanguageStatusDbById
} from "@/db/queries/languages";

export const addLanguages = async (data: FormInputType): Promise<{ status: string, message: string, id?: string }> => {
    try {
        if (data.main) {
            const mainLanguage = await fetchMainLanguage();
            if (mainLanguage !== null) {
                throw new Error("Another item is main. Change its status.");
            }
        }

        const addFields = languagesFields.filter(field => field.name !== "id");
        const newData = parseFormData<CreateLanguage>(addFields, data);
        if (newData === null) {
            throw new Error("DATA_ERROR");
        }

        const addedLanguage = await createLanguage(newData);
        
        if (addedLanguage === null) {
            throw new Error("ADD_ERROR");
        }

        return {
            status: "success",
            message: "SUCCESSFULLY_ADDED",
            id: addedLanguage.id
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

export const updateLanguagesById = async (id: string, data: FormInputType): Promise<{ status: string, message: string }> => {
    let updatedCount = 0;
    let createdCount = 0;

    try {
        const items = await fetchLanguageById(id);
        if (items === null) {
            throw new Error("DATA_ERROR");
        }

        const newData = parseFormData<UpdateLanguage>(languagesFields, data);
        if (newData === null) {
            throw new Error("DATA_ERROR");
        }

        if (newData.main) {
            const mainLanguage = await fetchMainLanguage();
            
            if (mainLanguage !== null) {
                if (mainLanguage && mainLanguage.length>0 && mainLanguage[0].id !== id) {
                    throw new Error("Another item is main. Change its status.");
                }
            }
        }
        
        const updatedItem = await updateLanguageDbById(id, newData);
        if (updatedItem?.id && updatedItem.id.length > 0) {
            updatedCount++;
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

export const changeLanguageStatusById = async (id: string, status: boolean): Promise<{ status: string, message: string }> => {
    try {
        const result = await updateLanguageStatusDbById(id, status);
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

export const deleteLanguageById = async (id: string): Promise<{ status: string, message: string }> => {
    try {
        const items = await fetchLanguageById(id);
        if (items === null) {
            throw new Error("DATA_ERROR");
        }
        if (items.main) {
            throw new Error("Cant delete main language.");
        }

        const result = await deleteLanguageFromDbById(id);

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
