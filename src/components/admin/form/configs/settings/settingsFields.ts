import { z } from "zod";

import { Field } from "@/components/admin/form/formTypes";

export const settingsFields: Field[] = [
    { name: "languageId", type: "hidden", schema: z.string() },
    { name: "sortOrder", type: "number", title: "Serial Number", oneLanguage: true, schema: z.number().min(0), asInt: true, default: 0},
    { name: "name", type: "text", title: "Title", schema: z.string().min(1) },
    { name: "type", type: "text", title: "Type", oneLanguage: true, schema: z.string().min(1) },
    { name: "category", type: "text", title: "Category", oneLanguage: true, schema: z.string().min(1) },
    { name: "shorttag", type: "text", title: "SHORT_TAG", oneLanguage: true, schema: z.string().min(1) },
    { name: "text", type: "text", title: "Text", schema: z.string() },
];
