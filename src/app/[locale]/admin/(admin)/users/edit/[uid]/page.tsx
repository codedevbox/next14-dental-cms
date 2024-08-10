"use client"

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
import { prepareFormDataFromDb } from "@/components/admin/form/utils";
import { FormInputType, SchemaObjectType } from "@/components/admin/form/formTypes";
import { userFields } from "@/components/admin/form/configs/user/userFields";
import { toastConfig } from "@/components/admin/toastConfig";

import { extractPathUpTo } from "@/utils/utils";
import { fetchUserById } from "@/db/queries/users";
import { updateUserById } from "@/actions/userActions";

interface UserEditPageProps {
    params: {
        uid: string;
    };
};

const UserEditPage: React.FC<UserEditPageProps> = ({ params }) => {

    const pathname = usePathname();
    const router = useRouter();
    const t = useTranslations("SERVER.MESSAGES");

    const [languages, setLanguages] = useState<Languages[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [formSchema, setFormSchema] = useState<z.ZodObject<SchemaObjectType>>(z.object({}));
    const [noData, setNoData] = useState(false);

    const formMethods = useForm<FormInputType>({
        resolver: zodResolver(formSchema)
    });
    const { formState: { isSubmitting } } = formMethods;

    useEffect(() => {
        const loadData = async () => {
            const dataItems = await fetchUserById(params.uid) || [];
            if (dataItems.length > 0) {
                const { languages, schema, initialValues } = await prepareFormDataFromDb(params.uid, userFields, dataItems);
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
            const result = await updateUserById(params.uid, data);
            if (result.status === "success") {
                localStorage.setItem("toastMessage", t(result.message));
                router.push(extractPathUpTo(pathname, "users"));
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
        { title: "Users", url: extractPathUpTo(pathname, "users") },
        { title: `Edit user`, url: "" },
    ];

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
                        fields={userFields}
                        isSubmitting={isSubmitting}
                        onSubmit={onSubmit}
                    />

                )}
            </div>
            <ToastContainer />
        </>
    );
};

export default UserEditPage;
