import { z } from "zod";

import { Field } from "@/components/admin/form/formTypes";

export const testimonialsFields: Field[] = [
    { name: "languageId", type: "hidden", schema: z.string() },
    { name: "sortOrder", type: "number", title: "Serial Number", oneLanguage: true, schema: z.number().min(0), asInt: true, default: 0},
    { name: "name", type: "text", title: "Name", schema: z.string().min(1) },
    { name: "image", type: "image", title: "Image", oneLanguage: true, schema: z.string() },
    { name: "text", type: "text", title: "Reviews", schema: z.string() },
];
