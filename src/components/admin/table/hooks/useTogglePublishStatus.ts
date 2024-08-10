"use client"

import { useCallback } from "react";
import { toast, ToastOptions } from "react-toastify";
import { useTranslations } from "next-intl";

import { ChangeStatusFunction, DataModel } from "../tableTypes";

interface UseTogglePublishStatusProps<T extends DataModel> {
    changeStatus?: ChangeStatusFunction;
    setLocalData: React.Dispatch<React.SetStateAction<T[]>>;
    toastConfig: ToastOptions;
};

export const useTogglePublishStatus = <T extends DataModel>({ changeStatus, setLocalData, toastConfig }: UseTogglePublishStatusProps<T>) => {
    const t =  useTranslations("SERVER.MESSAGES");

    return useCallback(async (item: T) => {
        if (!changeStatus) {
            return;
        }
        const hasPublished = "published" in item;
        if (!hasPublished) {
            return;
        }

        try {
            const hasGroupId = "groupId" in item;

            const itemId = hasGroupId ? item.groupId : item.id;
            const result = await changeStatus(itemId, !item.published);
            if (result.status === "success") {
                setLocalData(currentData =>
                    currentData.map(page => {
                        if (hasGroupId && "groupId" in page && page.groupId === item.groupId) {
                            return { ...page, published: !page.published };
                        } else if (!hasGroupId && page.id === item.id && "published" in page) {
                            return { ...page, published: !page.published };
                        }
                        return page;
                    })
                );
                toast.success(t(result.message), toastConfig);
            } else {
                toast.error(t(result.message), toastConfig);
            }
        } catch (error) {
            toast.error(t("UNKNOWN_ERROR_OCCURRED"), toastConfig);
            console.error("Failed to update the status", error);
        }
    }, [changeStatus, setLocalData, toastConfig, t]);
};
