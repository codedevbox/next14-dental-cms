"use server";

import path from "path";
import bcrypt from "bcryptjs";
import { User } from "@prisma/client";

import { userFields } from "@/components/admin/form/configs/user/userFields";
import { FormInputType } from "@/components/admin/form/formTypes";
import { parseFormData } from "@/components/admin/form/utils";
import {
  createUser,
  CreateUser,
  deleteUserByUid,
  fetchUserById,
  fetchUserList,
  updateUserByDbId,
} from "@/db/queries/users";
import { checkFileExists, deleteFile } from "./utils";

export const addUser = async (data: FormInputType): Promise<{ status: string, message: string, id?: string }> => {

    try {
        const addFields = userFields.filter(field => field.name !== "id");
        
        const newData = parseFormData<CreateUser>(addFields, data);
        if (newData === null) {
            throw new Error("DATA_ERROR");
        }

        const addedUser = await createUser({ ...newData, password: await bcrypt.hash(newData.password, 10) });
        if (addedUser === null) {
            throw new Error("ADD_ERROR");
        }

        return {
            status: "success",
            message: "SUCCESSFULLY_ADDED",
            id: addedUser.id
        };
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(error);
            return { status: "error", message: error.message };
        }
        console.log(error);
        return { status: "error", message: "UNKNOWN_ERROR_OCCURRED" };
    }
};

export const updateUserById = async (id: string, dataForm: FormInputType): Promise<{ status: string, message: string }> => {
    let updatedCount = 0;
    try {
        const items = await fetchUserById(id);
        if (items === null) {
            throw new Error("DATA_ERROR");
        }

        const newData = parseFormData<User>(userFields, dataForm);
        if (newData === null) {
            throw new Error("DATA_ERROR");
        }

        let updatedData = newData;
        if (items) {
            if (items[0].password !== newData.password) {
                updatedData = {
                    ...newData,
                    password: await bcrypt.hash(newData.password, 10)
                };
            }
        }

        const updatedItem = await updateUserByDbId(id, updatedData);

        if (updatedItem?.id && updatedItem.id.length > 0) {
            updatedCount++;
        }

        return {
            status: "success",
            message: "SUCCESSFULLY_UPDATED",
        };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { status: "error", message: error.message };
        }
        return { status: "error", message: "UNKNOWN_ERROR_OCCURRED" };
    }
};


export const deleteUserById = async (id: string): Promise<{ status: string, message: string }> => {
    try {

        const items = await fetchUserById(id);

        if (items === null) {
            throw new Error("DATA_ERROR");
        }

        const users = await fetchUserList();
        if (users && users?.length < 2) {
            throw new Error("Can't delete last user");
        }

        for (const item of items) {
            if (item.image) {
                const rawPath = item.image.replace(/^\/api\/images\//, "");
                const decodedPath = decodeURIComponent(rawPath);
                const filePath = path.join("./storage/images/", decodedPath);
                console.log(filePath);
                const fileExists = await checkFileExists(filePath);
                if (fileExists) {
                    try {
                        await deleteFile(filePath);
                    } catch (error) {
                        if (error instanceof Error) {
                            throw new Error("FILE_DELETION_FAILED");
                        }
                    }
                }
            }
        }

        const result = await deleteUserByUid(id);

        if (result.count === 0) {
            throw new Error("DELETION_ERROR");
        }

        return {
            status: "success",
            message: "SUCCESSFULLY_DELETED",
        };

    } catch (error: unknown) {
        if (error instanceof Error) {
            return { status: "error", message: error.message };
        }
        return { status: "error", message: "UNKNOWN_ERROR_OCCURRED" };
    }
};
