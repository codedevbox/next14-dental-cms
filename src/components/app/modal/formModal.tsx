"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useModal } from "@/context/modalContext";
import { sendMessage } from "@/actions/sendMessageActions";
import { messageSchema } from "./messageSchema";
import Button from "../button";

type MessageFormValues = z.infer<typeof messageSchema>;

const FormModal: React.FC = () => {
    const t = useTranslations("WEBSITE.CONTENT");

    const { isOpen, closeModal } = useModal();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<MessageFormValues>({
        resolver: zodResolver(messageSchema)
    });

    const [mouseDownInside, setMouseDownInside] = useState(false);
    const [serverResponse, setServerResponse] = useState<{ status: string; message: string } | null>(null);

    const onSubmit = async (data: MessageFormValues) => {
        const response = await sendMessage(data);
        setServerResponse(response);
        if (response.status === "ok") {
            reset();
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
            setServerResponse(null);
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if ((e.target as HTMLElement).closest(".modal-content")) {
            setMouseDownInside(true);
        } else {
            setMouseDownInside(false);
        }
    };

    const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!mouseDownInside && (e.target as HTMLElement).closest(".modal-content") === null) {
            closeModal();
        }
        setMouseDownInside(false);
    };

    return (
        <div
            className="fixed inset-0 bg-gray-800 bg-opacity-50 z-[70] flex justify-center items-center"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            <div
                className="modal-content bg-gradient-to-tr from-colorfrom to-colorto text-white  rounded-lg shadow-lg p-6 w-96 max-h-full overflow-y-auto"
                onClick={e => e.stopPropagation()}
            >
                <h2 className="text-xl mb-4">{t("INPUT_WRITE_MESSAGE")}</h2>
                {serverResponse?.status === "error" && (
                    <div className=" text-center mb-4">
                        {serverResponse.message}
                    </div>
                )}

                {serverResponse?.status === "ok" ? (
                    <div className="text-green-600 text-center">
                        {serverResponse.message}
                        <button
                            onClick={closeModal}
                            className="mt-4 py-2 px-4 bg-indigo-600 rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {t("INPUT_CLOSE")}
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-white opacity-80">
                                {t("INPUT_NAME")}
                            </label>
                            <input
                                id="name"
                                type="text"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                {...register("name")}
                            />
                            {errors.name && <p className=" text-black font-extralight text-sm">{errors.name.message}</p>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="phone" className="block text-sm font-medium text-white opacity-60 ">
                                {t("INPUT_PHONE")}
                            </label>
                            <input
                                id="phone"
                                type="text"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                {...register("phone")}
                            />
                            {errors.phone && <p className="text-black  font-extralight text-sm">{errors.phone.message}</p>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-white opacity-60 ">
                                {t("INPUT_EMAIL")}
                            </label>
                            <input
                                id="email"
                                type="email"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                {...register("email")}
                            />
                            {errors.email && <p className="text-black  font-extralight text-sm">{errors.email.message}</p>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="message" className="block text-sm font-medium text-white opacity-60 ">
                                {t("INPUT_MESSAGE")}
                            </label>
                            <textarea
                                id="message"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                {...register("message")}
                            />
                            {errors.message && <p className="text-black  font-extralight text-sm">{errors.message.message}</p>}
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="mt-3 mr-3 px-7 py-2  text-lg font-light rounded-full bg-transparent hover:opacity-50"
                            >
                                {t("INPUT_CANCEL")}
                            </button>
                            <Button isSubmit customClass="bg-transparent border border-white/80 mt-3 px-7 py-2 text-white text-md font-light rounded-full " text={t("INPUT_SEND")} />
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default FormModal;
