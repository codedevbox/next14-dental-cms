import { TableColumn } from "../../tableTypes";

export const columnsTranslate: TableColumn[] = [
    { name: "ID", uid: "id" },
    { name: "GID", uid: "groupId" },
    { name: "SORT", uid: "sortOrder", sortable: true },
    { name: "NAME", uid: "name", sortable: true },
    { name: "TYPE", uid: "type" },
    { name: "CATEGORY", uid: "category" },
    { name: "SHORT TAG", uid: "shorttag" },
    { name: "PUBLISHED", uid: "published" },
    { name: "ACTIONS", uid: "actions" },
];

export const INITIAL_COLUMNS_TRANSLATE = ["sortOrder", "name", "type", "category", "shorttag", "published", "actions"];

export const SEARCH_COLUMNS_TRANSLATE = ["name", "shorttag"];
