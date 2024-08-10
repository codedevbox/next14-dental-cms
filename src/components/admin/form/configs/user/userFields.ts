import { z } from "zod";

import { Field } from "@/components/admin/form/formTypes";

export const userFields: Field[] = [
    { name: "id", type: "hidden", oneLanguage: true, schema: z.string() },
    { name: "isadmin", type: "switch", oneLanguage: true, title: "Admin", schema: z.boolean(), asBool: true, default: false },
    { name: "name", type: "text", oneLanguage: true, title: "Name", schema: z.string().min(1) },
    { name: "login", type: "text", oneLanguage: true, title: "Login", schema: z.string().min(1).regex(/^[a-z0-9_-]{3,15}$/g) },
    { name: "password", type: "password", oneLanguage: true, title: "Password", schema: z.string().min(1).min(8)},
    { name: "email", type: "text", oneLanguage: true, title: "Email", schema: z.string().email() },
    { name: "image", type: "image", title: "Avatar", oneLanguage: true, schema: z.string() }
];
