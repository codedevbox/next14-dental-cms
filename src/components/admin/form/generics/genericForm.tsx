import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { SubmitHandler, UseFormReturn } from "react-hook-form";

import { Button } from "@nextui-org/react";
import { InboxArrowDownIcon } from "@heroicons/react/24/solid";
import { Languages } from "@prisma/client";

import { FormInputType } from "../formTypes";
import GenericFild from "./genericFild";
import { fetchTranslateZodByLocale } from "@/db/queries/translate";

interface GenericFormProps {
    formMethods: UseFormReturn<FormInputType>;
    languages: Languages[];
    fields: any[];
    isSubmitting: boolean;
    onSubmit: SubmitHandler<FormInputType>;
    imagePath?: string;
};

const GenericForm: React.FC<GenericFormProps> = ({
    formMethods,
    languages,
    fields,
    isSubmitting,
    onSubmit,
    imagePath
}) => {
    const { register, handleSubmit, formState: { errors }, control, setValue } = formMethods;

    const t = useTranslations("ADMIN.FIELDS");
    const [zodTranslate, setzodTranslate] = useState({});
    const locale = useLocale();

    useEffect(() => {
        const loadZod = async () => {
            const zodMsg = await fetchTranslateZodByLocale(locale) || {}; 
            setzodTranslate(zodMsg);
        }
        loadZod();
    }, [locale]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {fields.map((field) => (
                <div key={field.name}>
                    {field.title && (
                        <div className="flex items-center mb-3 pb-1 border-b-1 border-default-100">
                            <div className="w-2 h-2 bg-default-200 mr-3 rounded-full "></div>
                            <div className="text-medium text-default-600 font-medium">{t(field.title)}:</div>
                        </div>
                    )}
                    <div className="lg:pl-4">
                        <GenericFild
                            field={field}
                            languages={languages}
                            register={register}
                            errors={errors}
                            control={control}
                            setValue={setValue}
                            imagePath={imagePath}
                            zodTranslate={zodTranslate}
                        />
                    </div>
                </div>
            ))}
            <div className="z-10 fixed right-0 bottom-6 flex flex-col  w-full items-center">
                <div className="w-full max-w-[1200px] flex justify-end">
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        isLoading={isSubmitting}
                        radius="full"
                        startContent={<InboxArrowDownIcon />}
                        className=" mr-6  border-1 border-white  bg-gradient-to-r from-colorfrom to-colorto text-white shadow-lg">
                        {isSubmitting ? `${t("Saving")}...` : `${t("Save")}`}
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default GenericForm;
