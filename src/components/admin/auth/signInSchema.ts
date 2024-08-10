import { z } from "zod";

export const signInSchema = z.object({
    login: z.string()
        .min(1, "FIELD_NOT_EMPTY")
        .regex(/^[a-z0-9_-]{3,15}$/g, "INVALID_LOGIN"),
    password: z.string()
        .min(1, "FIELD_NOT_EMPTY")
        .min(8, "PASSWORD_MIN_8_CHARS"),
});
