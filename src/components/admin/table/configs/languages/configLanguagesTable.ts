import { TableColumn } from "../../tableTypes";

export const configLanguagesTable: TableColumn[] = [
    { name: "ID", uid: "id" },
    { name: "SORT", uid: "sortOrder", sortable: true },
    { name: "MAIN", uid: "main" },
    { name: "FULL NAME", uid: "fullName" },
    { name: "SHORT NAME", uid: "shortName" },
    { name: "LOCALE", uid: "locale" },
    { name: "PUBLISHED", uid: "published" },
    { name: "ACTIONS", uid: "actions" },
];

export const INITIAL_COLUMNS_LANGUAGES = ["sortOrder", "main",  "fullName",  "locale", "published", "actions"];

export const SEARCH_COLUMNS_SERVICES = ["fullName", "shortName", "locale"];
