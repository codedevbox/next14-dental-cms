import { z } from "zod";

import { Field } from "@/components/admin/form/formTypes";

export const servicesFields: Field[] = [
    { name: "languageId", type: "hidden", schema: z.string() },
    { name: "title", type: "text", title: "Service Name", schema: z.string().min(1) },
    { name: "sortOrder", type: "number", title: "Serial Number", oneLanguage: true, schema: z.number().min(0), asInt: true, default: 0},
    { name: "description", type: "text", title: "Description", schema: z.string().min(1) },
    { name: "label", type: "text", title: "Label", schema: z.string() },
    { name: "price", type: "number", title: "Price", oneLanguage: true, schema: z.number().min(0), asInt: true, default: 0 },
    { name: "newPrice", type: "number", title: "New Price", oneLanguage: true, schema: z.number().min(0), asInt: true, default: 0 },
    { name: "request", type: "switch", title: "Contains Order Button", oneLanguage: true, schema: z.boolean(), asBool: true, default: false },
    { name: "image", type: "image", title: "Image", oneLanguage: true, schema: z.string() },
];
