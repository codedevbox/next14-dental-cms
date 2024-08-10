"use client"

import dynamic from "next/dynamic";
import Image from "next/image";

import { Input, Checkbox, Switch } from "@nextui-org/react";
import { Controller, FieldErrors, UseFormRegister } from "react-hook-form";

import { TranslateMessage } from "@/db/queries/translate";
import UploadFilePond from "../inputs/uploadFilePond";

interface GenericFieldByTypeProps {
    type: string;
    fieldName: string;
    register: UseFormRegister<any>;
    errors: FieldErrors<any>;
    control: any
    setValue?: any
    imagePath?: string;
    zodTranslate: TranslateMessage;
};

const GenericFieldByType: React.FC<GenericFieldByTypeProps> = ({ type, fieldName, register, errors, control, setValue, imagePath, zodTranslate }) => {

    const error = errors[fieldName] ? errors[fieldName] : null;

    const renderError = () => {
        if (error && typeof error.message === "string") {
            const message = zodTranslate.ADMIN.ZOD[error.message];
            return <>{message || error.message}</>;
        }
        return null;
    };

    const TextEditor = dynamic(() => import("../inputs/textEditor/textEditor"), { ssr: false });

    const handleFileUploadSuccess = (filePath: string) => {
        setValue(fieldName, filePath, { shouldValidate: true });
    };

    switch (type) {
        case "text":
            return (
                <Input
                    type={type}
                    {...register(fieldName)}
                    isInvalid={!!error}
                    errorMessage={renderError()}
                />
            );
        case "password":
            return (
                <Controller
                    name={fieldName}
                    control={control}
                    render={({ field }) => (
                        <Input
                            type="password"
                            {...field}
                            isInvalid={!!error}
                            errorMessage={renderError()}
                        />
                    )}
                />
            );
        case "number":
            return (
                <Controller
                    name={fieldName}
                    control={control}
                    render={({ field }) => (
                        <Input
                            type="number"
                            {...field}
                            onChange={e => {
                                const value = parseInt(e.target.value, 10);
                                if (isNaN(value)) {
                                    field.onChange("");
                                } else {
                                    field.onChange(value);
                                }
                            }}
                            value={field.value === "" ? "" : field.value}
                            isInvalid={!!error}
                            errorMessage={renderError()}
                        />
                    )}
                />
            );
        case "hidden":
            return (
                <input
                    type={type}
                    {...register(fieldName)}
                />
            );
        case "image":
            return (
                <Controller
                    name={fieldName}
                    control={control}
                    render={({ field }) => {
                        return (
                            <>
                                {field.value && (
                                    <div className=" relative w-auto h-[200px]">
                                        <Image
                                            fill
                                            sizes="50vw"
                                            priority
                                            className="object-contain"
                                            alt="img" src={field.value} />
                                    </div>
                                )}
                                <Input
                                    classNames={{
                                        input: ["text-center"]
                                    }}
                                    disabled
                                    type="text"
                                    {...field}
                                    isInvalid={!!error}
                                    errorMessage={renderError()}
                                />
                                <UploadFilePond uploadUrl={`/api/upload/${imagePath}`} onFileUploadSuccess={handleFileUploadSuccess} />
                            </>
                        );
                    }}
                />
            );
        case "texteditor":
            return (
                <Controller
                    control={control}
                    name={fieldName}
                    render={({ field: { onChange, value, ref } }) => (
                        <TextEditor content={value} onChange={onChange} />
                    )}
                />
            );
        case "checkbox":
            return (
                <Controller
                    name={fieldName}
                    control={control}
                    render={({ field }) => {
                        return (
                            <Checkbox
                                isSelected={field.value}
                                onValueChange={(value) => field.onChange(value)}
                            >
                                Option
                            </Checkbox>
                        );
                    }}
                />
            );
        case "switch":
            return (
                <Controller
                    name={fieldName}
                    control={control}
                    render={({ field }) => {
                        return (
                            <Switch isSelected={field.value}
                                onValueChange={(value) => field.onChange(value)} />
                        );
                    }}
                />
            );
        default:
            return <div>Unknown field type</div>;
    }

};

export default GenericFieldByType;
