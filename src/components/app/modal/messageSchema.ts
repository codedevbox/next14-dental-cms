import { z } from "zod";

export const messageSchema = z.object({
    name: z.string().min(1),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/),
    email: z.string().email().optional().or(z.literal("")),
    message: z.string().min(1)
});
