import { TableColumn } from "../../tableTypes";

export const columnsSections: TableColumn[] = [
    { name: "ID", uid: "id" },
    { name: "GID", uid: "groupId" },
    { name: "SORT", uid: "sortOrder", sortable: true },
    { name: "NAME", uid: "name", sortable: true },
    { name: "PUBLISHED", uid: "published" },
    { name: "ACTIONS", uid: "actions" },
];

export const INITIAL_COLUMNS_SECTIONS = ["sortOrder", "name", "published", "actions"];

export const SEARCH_COLUMNS_SECTIONS = ["name"];
