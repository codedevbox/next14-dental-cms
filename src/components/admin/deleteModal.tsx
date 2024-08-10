"use client"

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Modal, ModalHeader, ModalBody, Button, Spinner, ModalContent, ModalFooter } from "@nextui-org/react";

import { DataModel } from "./table/tableTypes";

interface DeleteModalProps {
    item: DataModel;
    onDelete: (item: DataModel) => void;
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
};

const DeleteModal: React.FC<DeleteModalProps> = ({ item, onDelete, isOpen, onOpenChange }) => {
    const [loading, setLoading] = useState(false);
    const t = useTranslations("ADMIN.CONFIRMATION");

    const handleDeleteClick = async () => {
        setLoading(true);
        await onDelete(item);
        setLoading(false);
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled hideCloseButton>
            <ModalContent>
                {(onClose) => (
                    loading ? (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{t("DELETING")}</ModalHeader>
                            <ModalBody>
                                <p>
                                    {t("PLEASE_WAIT_DELETING")}
                                </p>
                            </ModalBody>
                            <ModalFooter className=" flex justify-center">
                                <Spinner />
                            </ModalFooter>
                        </>
                    ) : (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{t("DELETE_CONFIRMATION")}</ModalHeader>
                            <ModalBody>
                                <p>
                                    {t("CONFIRM_DELETE_ITEM")}
                                </p>
                                <p className="text-danger">
                                    {t("IRREVERSIBLE_CONFIRM_DELETION")}
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    {t("CLOSE_BUTTON")}
                                </Button>
                                <Button color="primary" onPress={handleDeleteClick}>
                                    {t("DELETE_BUTTON")}
                                </Button>
                            </ModalFooter>
                        </>
                    )
                )}
            </ModalContent>
        </Modal>
    );
};

export default DeleteModal;
