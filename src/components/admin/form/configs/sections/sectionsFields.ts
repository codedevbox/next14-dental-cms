import { z } from "zod";

import { Field } from "@/components/admin/form/formTypes";

export const sectionsFields: Field[] = [
    { name: "languageId", type: "hidden", schema: z.string() },
    { name: "name", type: "text", title: "Title", schema: z.string().min(1) },
    { name: "slug", type: "hidden", schema: z.string(), oneLanguage: true },
    { name: "sortOrder", type: "number", title: "Serial Number", oneLanguage: true, schema: z.number().min(0), asInt: true, default: 0},
    { name: "title", type: "text", title: "Meta Title", schema: z.string().min(1) },
    { name: "description", type: "text", title: "Meta Description", schema: z.string().min(1) },
    { name: "h1", type: "text", title: "Meta Headline", schema: z.string().min(1) },
    { name: "headImage", type: "image", title: "Header Image", oneLanguage: true, schema: z.string()},
    { name: "headTitle", type: "text", title: "Header Title", schema: z.string().min(1) },
    { name: "headDescription", type: "text", title: "Header Description", schema: z.string().min(1) },
    { name: "content", type: "texteditor", title: "Description", schema: z.any()}
];
