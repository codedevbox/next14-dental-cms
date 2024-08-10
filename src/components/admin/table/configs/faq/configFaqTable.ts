import { TableColumn } from "../../tableTypes";

export const columnsFaq: TableColumn[] = [
    { name: "ID", uid: "id" },
    { name: "GID", uid: "groupId" },
    { name: "SORT", uid: "sortOrder", sortable: true },
    { name: "QUESTION", uid: "question", sortable: true },
    { name: "PUBLISHED", uid: "published" },
    { name: "ACTIONS", uid: "actions" },
];

export const INITIAL_COLUMNS_FAQ = ["sortOrder", "question", "published", "actions"];

export const SEARCH_COLUMNS_FAQ = ["question", "answer"];
