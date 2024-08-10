"use server"
import { getTranslations } from "next-intl/server";
import { z } from "zod";

const messageSchema = z.object({
    name: z.string().min(1),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/),
    email: z.string().email().optional().or(z.literal("")),
    message: z.string().min(1)
});

type MessageFormValues = z.infer<typeof messageSchema>;

export async function sendMessage(data: MessageFormValues) {

    const t = await getTranslations("SERVER.MESSAGES");

    const validation = messageSchema.safeParse(data);
    const {SMTP_EMAIL, SMTP_PASSWORD} = process.env;

    if (!validation.success) {
        return {
            status: "error",
            message: "DATA_ERROR"
        };
    }

    try {
        const nodemailer = require("nodemailer");
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            auth: {
                user: SMTP_EMAIL,
                pass: SMTP_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: `"${t("SENDERS_ADDRESS")}" <"+SMTP_EMAIL+">`,
            to: SMTP_EMAIL,
            subject: t("EMAIL_SUBJECT"),
            text: `Имя: ${data.name}\nТелефон: ${data.phone}\nEmail: ${data.email}\nСообщение: ${data.message}`,
        });

        return {
            status: "ok",
            message: t("MESSAGE_SENT_SUCCESSFULLY")
        };
    } catch (error) {
        console.error(t("EMAIL_SENDING_ERROR"), error);
        return {
            status: "error",
            message: t("EMAIL_SENDING_ERROR")
        };
    }
};
