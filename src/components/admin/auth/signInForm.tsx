"use client"

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Card, Input, Button } from "@nextui-org/react";

import { signInSchema } from "./signInSchema";
import { useTranslations } from "next-intl";

interface SignInFormProps {
    locale: string;
    callbackUrl?: string;
}

type SignInInputType = z.infer<typeof signInSchema>;

const SignInForm: React.FC<SignInFormProps> = ({ locale, callbackUrl }) => {

    const router = useRouter();

    const t = useTranslations("ADMIN.AUTH");
    const er = useTranslations("ADMIN.FIELDS");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignInInputType>({
        resolver: zodResolver(signInSchema),
    });

    const [authError, setAuthError] = useState("");

    const onSubmit: SubmitHandler<SignInInputType> = async (data) => {
        try {
            const result = await signIn("credentials", {
                redirect: false,
                login: data.login,
                password: data.password,
            });

            if (!result?.ok) {
                setAuthError(t("AUTHORIZATION_ERROR_CHECK_DATA"));
                return;
            }
            router.push(callbackUrl ? callbackUrl : "/" + locale + "/admin");
        } catch (error) {
            setAuthError(t("AUTHORIZATION_ERROR_CHECK_DATA"));
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card className="p-10 w-80 border border-gray-200 rounded-lg flex flex-col gap-5">
                <h3 className="text-center">{t("LOGIN_FORM")}</h3>
                <Input type="text" label="login" {...register("login")} isInvalid={!!errors.login} errorMessage={errors.login ? er(errors.login.message) : ""} />
                <Input type="password" label="password" {...register("password")} isInvalid={!!errors.password} errorMessage={errors.password ? er(errors.password.message) : ""} />
                {authError && <div className="relative p-1 text-tiny text-danger animate-in fade-in-0 slide-in-from-left-1">{t("AUTHORIZATION_ERROR_CHECK_DATA")}</div>}
                <Button type="submit" disabled={isSubmitting} isLoading={isSubmitting} radius="full" className="bg-gradient-to-r from-colorfrom to-colorto text-white shadow-lg">
                    {isSubmitting ? `${t("LOGIN_FORM")}...` : t("SIGN_IN_FORM")}
                </Button>
            </Card>
        </form>
    )
}

export default SignInForm;
