"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";

import { sendMessage } from "@/actions/sendMessageActions";
import { messageSchema } from "./modal/messageSchema";
import Button from "./button";
import FadeMove from "./transition/fadeMove";

type MessageFormValues = z.infer<typeof messageSchema>;

const ContactForm: React.FC = () => {
    const t = useTranslations("WEBSITE.CONTENT");
    const t2 = useTranslations("WEBSITE.BUTTONS");

    const { register, handleSubmit, formState: { errors }, reset } = useForm<MessageFormValues>({
        resolver: zodResolver(messageSchema)
    });

    const [serverResponse, setServerResponse] = useState<{ status: string; message: string } | null>(null);

    const onSubmit = async (data: MessageFormValues) => {
        const response = await sendMessage(data);
        setServerResponse(response);
        if (response.status === "ok") {
            reset();
        }
    };

    return (
        <FadeMove>
            <div className="pt-20 px-4 sm:px-8 md:px-12 lg:px-10 xl:px-36 2xl:px-48">
                <h2 className="text-center font-thin text-4xl">{t("FORM_TITLE")}</h2>
                <div className="pt-10 w-full flex justify-center">
                    <div className="text-center font-thin text-base max-w-[780px]">{t("FORM_DESCRIPTION")}</div>
                </div>
                <div className="w-full">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="w-full text-center">
                            <div className="w-full px-10 md:px-0 mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-center justify-between gap-10">
                                <div className="md:w-full">
                                    <div className="bg-gradient-to-tr from-colorfrom to-colorto pb-[1px]">
                                        <div className="w-full bg-white px-3">
                                            <input
                                                className="w-full bg-transparent outline-none font-light text-lg"
                                                placeholder={t("INPUT_NAME")}

                                                type="text"
                                                {...register("name")}
                                            />
                                        </div>
                                    </div>
                                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                                </div>
                                <div className="md:w-full">
                                    <div className="bg-gradient-to-tr from-colorfrom to-colorto pb-[1px]">
                                        <div className="w-full bg-white px-3">
                                            <input
                                                className="w-full bg-transparent outline-none font-light text-lg"
                                                placeholder={t("INPUT_EMAIL")}

                                                type="text"
                                                {...register("email")}
                                            />
                                        </div>
                                    </div>
                                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                                </div>
                                <div className="md:w-full">
                                    <div className="bg-gradient-to-tr from-colorfrom to-colorto pb-[1px]">
                                        <div className="w-full bg-white px-3">
                                            <input
                                                className="w-full bg-transparent outline-none font-light text-lg"
                                                placeholder={t("INPUT_PHONE")}

                                                type="text"
                                                {...register("phone")}
                                            />
                                        </div>
                                    </div>
                                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                                </div>
                                <div className="md:w-full">
                                    <div className="bg-gradient-to-tr from-colorfrom to-colorto pb-[1px]">
                                        <div className="w-full bg-white px-3">
                                            <input
                                                className="w-full bg-transparent outline-none font-light text-lg"
                                                placeholder={t("INPUT_MESSAGE")}

                                                type="text"
                                                {...register("message")}
                                            />
                                        </div>
                                    </div>
                                    {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
                                </div>
                            </div>
                            <div className="mt-10">
                                <Button text={t2("MAKE_APPOINTMENT")} isSubmit />
                            </div>
                        </div>
                    </form>
                    {serverResponse && (
                        <div className={`text-center mt-4 ${serverResponse.status === "ok" ? "text-green-600" : "text-red-500"}`}>
                            {serverResponse.message}
                        </div>
                    )}
                </div>
            </div>
        </FadeMove>
    );
};

export default ContactForm;
