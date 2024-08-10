"use client"

import { useCallback } from "react";
import { toast, ToastOptions } from "react-toastify";
import { useTranslations } from "next-intl";

import { DataModel, DeleteItemsFunction } from "../tableTypes";

interface DeleteItemProps<T> {
    deleteItems?: DeleteItemsFunction;
    setLocalData: React.Dispatch<React.SetStateAction<T[]>>;
    onClose: () => void;
    toastConfig: ToastOptions;
};

export const useDeleteItem = <T extends DataModel>({ deleteItems, setLocalData, onClose, toastConfig }: DeleteItemProps<T>) => {
    const t =  useTranslations("SERVER.MESSAGES");

    const handleDelete = useCallback(async (item: DataModel) => {
        if (!deleteItems) {
            return;
        }
        try {
            const dellId = "groupId" in item ? item.groupId : item.id ;
            const result = await deleteItems(dellId);
            if (result.status === "success") {
                setLocalData(prev => prev.filter(service => service.id !== item.id));
                toast.success(t(result.message), toastConfig);
            } else {
                toast.error(t(result.message), toastConfig);
            }
            onClose();
        } catch (error) {
            toast.error(t("UNKNOWN_ERROR_OCCURRED"), toastConfig);
            console.error("Failed to delete item", error);
        }
    }, [deleteItems, setLocalData, onClose, toastConfig, t]);

    return handleDelete;
};
