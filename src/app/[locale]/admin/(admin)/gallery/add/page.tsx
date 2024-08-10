"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
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
import { prepareFormData, setLastSortOrder } from "@/components/admin/form/utils";
import { FormInputType, SchemaObjectType } from "@/components/admin/form/formTypes";
import { galleryFields } from "@/components/admin/form/configs/gallery/galleryFields";
import { toastConfig } from "@/components/admin/toastConfig";

import { addGallery } from "@/actions/galleryActions";
import { extractPathUpTo } from "@/utils/utils";

const GalleryAddPage: React.FC = () => {
    const pathname = usePathname();
    const servicesPath = extractPathUpTo(pathname, "gallery");
    const router = useRouter();
    const t = useTranslations("SERVER.MESSAGES");

    const [languages, setLanguages] = useState<Languages[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [formSchema, setFormSchema] = useState<z.ZodObject<SchemaObjectType>>(z.object({}));

    const formMethods = useForm<FormInputType>({
        resolver: zodResolver(formSchema),
    });
    const { formState: { isSubmitting } } = formMethods;

    useEffect(() => {
        const loadData = async () => {
            const { languages, schema, initialValues } = await prepareFormData(galleryFields);
            setLanguages(languages || []);
            if (schema) {
                setFormSchema(schema);
            }
            await setLastSortOrder(initialValues, "gallery");
            formMethods.reset(initialValues);
            setIsLoading(false);
        };

        loadData();
    }, [formMethods]);

    const onSubmit: SubmitHandler<FormInputType> = async (data) => {
        try {
            const result = await addGallery(data);
            if (result.status === "success") {
                localStorage.setItem("toastMessage", t(result.message));
                router.push(servicesPath);
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
        { title: "Add new image", url: "" },
    ];

    return (
        <>
            <AdminBreadcrumbs items={breadcrumbs} />
            <div className={`flex-1 bg-white rounded-lg mx-3 mb-3 ${isLoading ? "flex justify-center items-center" : "items-start"} p-5`}>
                {isLoading ? (
                    <Spinner />
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
};

export default GalleryAddPage;