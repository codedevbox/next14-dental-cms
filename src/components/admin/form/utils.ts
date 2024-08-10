import DOMPurify from "dompurify";
import { z } from "zod";
import { Languages } from "@prisma/client";

import { dataDbType, Field, FormDataConfig, FormInputType } from "./formTypes";

import { fetchPublicLanguages } from "@/db/queries/languages";
import { fetchNextTranslateOrder } from "@/db/queries/translate";
import { fetchNextFaqOrder } from "@/db/queries/faq";
import { fetchNextGalleryOrder } from "@/db/queries/gallery";
import { fetchNextServicesOrder } from "@/db/queries/services";
import { fetchNextSettingsOrder } from "@/db/queries/settings";
import { fetchNextTestimonialsOrder } from "@/db/queries/testimonials";

const getLastSortOrder = async (tableName: string): Promise<number> => {
    switch (tableName) {
        case "faq":
            return await fetchNextFaqOrder();
        case "gallery":
            return await fetchNextGalleryOrder();
        case "services":
            return await fetchNextServicesOrder();
        case "settings":
            return await fetchNextSettingsOrder();
        case "testimonials":
            return await fetchNextTestimonialsOrder();
        case "translate":
            return await fetchNextTranslateOrder();
        default:
            return 0;
    }
};

export const setLastSortOrder = async (initialValues: FormInputType, tableName: string): Promise<void> => {
    const lastSortOrder = await getLastSortOrder(tableName);
    initialValues.sortOrder = lastSortOrder;
};

export const prepareFormData = async (fields: Field[]) => {
    try {
        const languages = await fetchPublicLanguages() || [];
        const schema = generateSchema(languages, fields);
        const initialValues = createInitialFormDefault(languages, fields);
        return { languages, schema, initialValues };
    } catch (error) {
        console.error("Failed to fetch data:", error);
        return { languages: [], schema: null, initialValues: {} };
    }
};

export const prepareFormDataFromDb = async <T extends dataDbType>(uid: string, fields: Field[], dataItems: T[]) => {
    try {
        const languages = await fetchPublicLanguages() || [];
        const schema = generateSchema(languages, fields);
        const initialValues = createInitialFormValues(languages, dataItems, fields);
        return { languages, schema, initialValues };
    } catch (error) {
        console.error("Failed to fetch data:", error);
        return { languages: [], schema: null, initialValues: {} };
    }
};

export const fetchAndPrepareFormData = async <T extends dataDbType>(uid: string, config: FormDataConfig<T>) => {
    try {
        const dataItems = await config.fetchByUid(uid) || [];
        const languages = await fetchPublicLanguages() || [];
        const schema = generateSchema(languages, config.fields);
        const initialValues = createInitialFormValues(languages, dataItems, config.fields);
        return { languages, schema, initialValues };
    } catch (error) {
        console.error("Failed to fetch data:", error);
        return { languages: [], schema: null, initialValues: {} };
    }
};

export const generateSchema = (languages: Languages[], fields: Field[]): z.ZodObject<any, any> => {
    const schemaObject: { [key: string]: any } = {};
    fields.forEach(field => {
        if (field.oneLanguage) {
            schemaObject[field.name] = field.schema;
        } else {
            languages.forEach(language => {
                schemaObject[`${field.name}_${language.locale}`] = field.schema;
            });
        }
    });
    return z.object(schemaObject);
};

export const generateSampleSchema = (fields: Field[]): z.ZodObject<any, any> => {
    const schemaObject: { [key: string]: any } = {};
    fields.forEach(field => {
        schemaObject[field.name] = field.schema;
    });
    return z.object(schemaObject);
};

export const createInitialFormValues = (languages: Languages[], data: dataDbType[], fields: Field[]) => {
    const initialValues: FormInputType = {};
    fields.forEach(field => {
        if (field.oneLanguage) {
            initialValues[field.name] = data[0]?.[field.name] ?? "";
        } else {
            languages.forEach(lang => {
                if (field.name === "languageId") {
                    initialValues[`${field.name}_${lang.locale}`] = lang.id;
                }
                else {
                    const localeData = data.find(item => item.languageId === lang.id);
                    initialValues[`${field.name}_${lang.locale}`] = localeData?.[field.name] ?? "";
                }
            });
        }
    });
    return initialValues;
};

export const createInitialFormDefault = (languages: Languages[], fields: Field[]) => {
    const initialValues: FormInputType = {};
    fields.forEach(field => {
        if (field.oneLanguage) {
            initialValues[field.name] = field.type === "text" ? "" : (field.default !== undefined && field.default !== null ? field.default : "");
        } else {
            languages.forEach(lang => {
                if (field.name === "languageId") {
                    initialValues[`${field.name}_${lang.locale}`] = lang.id;
                }
                else {
                    initialValues[`${field.name}_${lang.locale}`] = field.type === "text" ? "" : (field.default !== undefined && field.default !== null ? field.default : "");
                }
            });
        }
    });
    return initialValues;
};

export const safelyGetProperty = <T extends object, K extends keyof T>(obj: T | undefined, key: string): string => {
    const safeKey = key as K;
    if (obj && safeKey in obj) {
        const value = obj[safeKey];
        return value !== null && value !== undefined ? String(value) : "";
    }
    return "";
};

export const parseLanguageData = (fields: Field[], formData: { [key: string]: any }) => {
    const fieldMap = new Map(fields.map(field => [field.name, field]));
    const commonKeys = fields.filter(field => field.oneLanguage).map(field => field.name);
    const commonData = commonKeys.reduce((acc, key) => {
        const field = fieldMap.get(key);
        let value = formData[key];
        if (field) {
            if (field.sanitize) {
                value = DOMPurify.sanitize(value);
            }
            if (field.asInt) {
                value = parseInt(value, 10) || (field.default ? field.default : 0);
            }
            if (field.asBool) {
                value = Boolean(value);
            }
            if (field.asSlug) {
                value = slugify(value);
            }
        }
        acc[key] = value;
        return acc;
    }, {} as any);

    const languageData: { [key: string]: any } = {};

    Object.keys(formData).forEach(key => {
        if (!commonKeys.includes(key)) {
            const match = key.match(/^(.+?)_([a-z]{2})$/);
            if (match) {
                const [_, baseKey, language] = match;
                const field = fieldMap.get(key);
                let value = formData[key];
                if (field) {
                    if (field.sanitize) {
                        value = DOMPurify.sanitize(value);
                    }
                    if (field.asInt) {
                        value = parseInt(value, 10) || (field.default ? field.default : 0);
                    }
                    if (field.asBool) {
                        value = Boolean(value);
                    }
                    if (field.asSlug) {
                        value = slugify(value);
                    }
                }
                languageData[language] = languageData[language] || { ...commonData, languageId: formData[`languageId_${language}`] };
                languageData[language][baseKey as keyof typeof languageData] = value;
            }
        }
    });
    return languageData;
};

export const parseFormData = <T extends Record<string, unknown>>(fields: Field[], formData: FormInputType): T => {
    const fieldMap = new Map(fields.map(field => [field.name, field]));
    const commonKeys = fields.filter(field => field.oneLanguage).map(field => field.name);
    const commonData = commonKeys.reduce((acc: Record<string, unknown>, key) => {
        const field = fieldMap.get(key);
        let value: any = formData[key];
        if (field) {
            if (field.sanitize) {
                value = DOMPurify.sanitize(value);
            }
            if (field.asInt) {
                value = parseInt(value, 10) || (field.default ? field.default : 0);
            }
            if (field.asBool) {
                value = Boolean(value);
            }
            if (field.asSlug) {
                value = slugify(value);
            }
        }
        acc[key] = value;
        return acc;
    }, {} as T);
    return commonData as T;
};

export const slugify = (str: string) =>
    str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
