"use client"

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Languages } from "@prisma/client";
import { Spinner } from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import AdminBreadcrumbs from "@/components/admin/adminBreadcrumbs";
import GenericForm from "@/components/admin/form/generics/genericForm";
import { prepareFormDataFromDb } from "@/components/admin/form/utils";
import { FormInputType, SchemaObjectType } from "@/components/admin/form/formTypes";
import { galleryFields } from "@/components/admin/form/configs/gallery/galleryFields";
import useToastFromStorage from "@/components/admin/hook/useToastFromStorage";
import { toastConfig } from "@/components/admin/toastConfig";

import { fetchGalleryByUid } from "@/db/queries/gallery";
import { updateGalleryByUid } from "@/actions/galleryActions";
import { extractPathUpTo } from "@/utils/utils";

interface SectionsEditPageProps {
    params: {
        uid: string;
    };
};

const SectionsEditPage: React.FC<SectionsEditPageProps> = ({ params }) => {

    const pathname = usePathname();
    const t = useTranslations("SERVER.MESSAGES");

    const [languages, setLanguages] = useState<Languages[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [formSchema, setFormSchema] = useState<z.ZodObject<SchemaObjectType>>(z.object({}));
    const [noData, setNoData] = useState(false);

    const formMethods = useForm<FormInputType>({
        resolver: zodResolver(formSchema)
    });
    const { formState: { isSubmitting } } = formMethods;

    useToastFromStorage(toastConfig);

    useEffect(() => {
        const loadData = async () => {
            const dataItems = await fetchGalleryByUid(params.uid) || [];
            if (dataItems.length > 0) {
                const { languages, schema, initialValues } = await prepareFormDataFromDb(params.uid, galleryFields, dataItems);
                setLanguages(languages || []);
                if (schema) {
                    setFormSchema(schema);
                }
                formMethods.reset(initialValues);
                setNoData(false);
            } else {
                setNoData(true);
            }
            setIsLoading(false);
        };

        loadData();
    }, [formMethods, params.uid]);

    const onSubmit: SubmitHandler<FormInputType> = async (data) => {
        try {
            const result = await updateGalleryByUid(params.uid, data);
            if (result.status === "success") {
                toast.success(t(result.message), toastConfig);
            } else {
                toast.error(t(result.message), toastConfig);
            }
        } catch (error) {
            toast.error(t("UNKNOWN_ERROR_OCCURRED"), toastConfig);
            console.error("Critical Error:", error);
        }
    };

    const breadcrumbs = [
        { title: "Home", url: extractPathUpTo(pathname, "admin") },
        { title: "Gallery", url: extractPathUpTo(pathname, "gallery") },
        { title: `Edit image`, url: "" },
    ]

    return (
        <>
            <AdminBreadcrumbs items={breadcrumbs} />
            <div className={`flex-1 bg-white rounded-lg mx-3 mb-3   ${isLoading || noData  ? "flex justify-center items-center" : "items-start"} p-5`}>
                {isLoading ? (
                    <Spinner />
                ) : noData ? (
                    <div>No data available to edit. Please check the UID or add data first.</div>
                ) : (
                    <GenericForm
                        formMethods={formMethods}
                        languages={languages}
                        fields={galleryFields}
                        isSubmitting={isSubmitting}
                        onSubmit={onSubmit}
                        imagePath="pages/gallery"
                    />

                )}
            </div>
            <ToastContainer />
        </>
    );
}

export default SectionsEditPage;