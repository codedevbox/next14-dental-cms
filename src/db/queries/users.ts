"use server"

import { User } from "@prisma/client";

import { BatchPayload, db } from "@/db";

export type CreateUser = Omit<User, "id">;
export type UserListTable = Omit<User, "emailVerified">;

export const fetchUserByLogin = (login: string): Promise<User | null> => {
    return db.user.findUnique({
        where: { login, isadmin: true }
    });
};

export const fetchUserList = async (): Promise<User[] | null> => {
    return db.user.findMany({
        orderBy: {
            login: "asc"
        }
    });
};

export const fetchUserListTable = async (): Promise<UserListTable[] | null> => {
    return db.user.findMany({
        orderBy: {
            login: "asc"
        }
    });
};

export const fetchUserById = async (id: string): Promise<UserListTable[] | null> => {
    return db.user.findMany({
        where: { id }
    });
};

export const updateUserByDbId = async (id: string, data: Partial<User>): Promise<User | null> => {
    return db.user.update({
        where: { id },
        data
    });
};

export const createUser = async (data: CreateUser): Promise<User | null> => {
    return db.user.create({ data });
};

export const deleteUserByUid = async (id: string): Promise<BatchPayload> => {
    return db.user.deleteMany({
        where: { id }
    });
};
