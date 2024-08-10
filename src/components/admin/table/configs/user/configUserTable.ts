import { TableColumn } from "../../tableTypes";

export const configUserTable: TableColumn[] = [
    { name: "ID", uid: "id" },
    { name: "ADMIN", uid: "isadmin"  },
    { name: "IMAGE", uid: "image" },
    { name: "NAME", uid: "name" },
    { name: "LOGIN", uid: "login" },
    { name: "EMAIL", uid: "email" },
    { name: "ACTIONS", uid: "actions" },
];

export const INITIAL_COLUMNS_USER = ["isadmin", "image",  "name",  "login", "email", "actions"];

export const SEARCH_COLUMNS_USER = ["name", "login", "email"];
