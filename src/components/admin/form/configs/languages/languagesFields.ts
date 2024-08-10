import { z } from "zod";

import { Field } from "@/components/admin/form/formTypes";

export const languagesFields: Field[] = [
    { name: "id", type: "hidden", oneLanguage: true, schema: z.string() },
    { name: "icon", type: "hidden", oneLanguage: true, schema: z.string() },
    { name: "sortOrder", type: "number", oneLanguage: true, title: "Serial Number", schema: z.number().min(0), asInt: true, default: 0},
    { name: "fullName", type: "text", oneLanguage: true, title: "Full Name", schema: z.string().min(1) },
    { name: "shortName", type: "text", oneLanguage: true, title: "Short Name", schema: z.string() },
    { name: "locale", type: "text", oneLanguage: true, title: "Locale", schema: z.string().min(1) },
    { name: "main", type: "switch", oneLanguage: true, title: "Main Language", schema: z.boolean(), asBool: true, default: false }
];
