import { z } from "zod";

import { Field } from "@/components/admin/form/formTypes";

export const faqFields: Field[] = [
    { name: "languageId", type: "hidden", schema: z.string() },
    { name: "sortOrder", type: "number", title: "Serial Number", oneLanguage: true, schema: z.number().min(0), asInt: true, default: 0},
    { name: "question", type: "text", title: "Question", schema: z.string().min(1) },
    { name: "answer", type: "text", title: "Answer", schema: z.string() },
];
