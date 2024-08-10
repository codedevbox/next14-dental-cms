import { Languages } from "@prisma/client";

import { FieldValues, UseFormRegister, FieldErrors, UseFormSetValue, Control } from "react-hook-form";
import { Chip } from "@nextui-org/react";

import { TranslateMessage } from "@/db/queries/translate";
import { Field, FormInputType } from "../formTypes";
import GenericFieldByType from "./genericFieldByType";

interface GenericFildProps {
    field: Field;
    languages: Languages[];
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    control: Control<FormInputType>;
    setValue: UseFormSetValue<FieldValues>;
    imagePath?: string;
    zodTranslate: TranslateMessage;
};

const GenericFild: React.FC<GenericFildProps> = ({ field, languages, register, errors, control, setValue, imagePath, zodTranslate }) => {
    return field.oneLanguage ? (
        <div className="mb-12 mt-2">
            <GenericFieldByType
                type={field.type}
                fieldName={field.name}
                register={register}
                errors={errors}
                control={control}
                setValue={setValue}
                imagePath={imagePath}
                zodTranslate={zodTranslate}
            />
        </div>
    ) : field.type == "hidden" ? (
        <div>
            {languages.map(language => (
                <div key={language.id} >
                    <GenericFieldByType
                        type={field.type}
                        fieldName={`${field.name}_${language.locale}`}
                        register={register}
                        errors={errors}
                        control={control}
                        setValue={setValue}
                        imagePath={imagePath}
                        zodTranslate={zodTranslate}
                    />
                </div>
            ))}
        </div>
    ) : field.type == "texteditor" ? (
        <div className="mb-12 mt-2 ">
            {languages.map(language => (
                <div key={language.id} className="mb-5 flex flex-col">
                    <div className="justify-start pb-3">
                        <Chip size="lg"
                            classNames={{
                                base: "bg-default-100 px-3 h-10",
                                content: " text-default-400 uppercase",
                            }}
                        >
                            {language.locale}
                        </Chip>
                    </div>
                    <div className="w-full">
                        <GenericFieldByType
                            type={field.type}
                            fieldName={`${field.name}_${language.locale}`}
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
        </div>
    ) : (
        <div className="mb-10 mt-2 ">
            {languages.map(language => (
                <div key={language.id} className="mb-5 flex">
                    <div className="justify-start pr-2">
                        <Chip size="lg"
                            classNames={{
                                base: "bg-default-100 px-3 h-10",
                                content: " text-default-400 uppercase",
                            }}
                        >
                            {language.locale}
                        </Chip>
                    </div>
                    <div className="w-full">
                        <GenericFieldByType
                            type={field.type}
                            fieldName={`${field.name}_${language.locale}`}
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
        </div>
    );
};

export default GenericFild;
