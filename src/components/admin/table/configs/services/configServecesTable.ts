import { TableColumn } from "../../tableTypes";

export const columnsServices: TableColumn[] = [
    { name: "ID", uid: "id" },
    { name: "GID", uid: "groupId" },
    { name: "SORT", uid: "sortOrder", sortable: true },
    { name: "IMAGE", uid: "image" },
    { name: "TITLE", uid: "title", sortable: true },
    { name: "LABEL", uid: "label" },
    { name: "PRICE", uid: "price" },
    { name: "NEWP RICE", uid: "newPrice" },
    { name: "PUBLISHED", uid: "published"},
    { name: "ACTIONS", uid: "actions" },
];

export const INITIAL_VISIBLE_SERVICES = ["sortOrder", "image", "label", "title", "price", "newPrice", "published", "actions"];

export const SEARCH_COLUMNS_SERVICES = ["title", "description", "label", "price"];

