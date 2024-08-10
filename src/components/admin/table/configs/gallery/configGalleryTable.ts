import { TableColumn } from "../../tableTypes";

export const columnsGallery: TableColumn[] = [
    { name: "ID", uid: "id" },
    { name: "GID", uid: "groupId" },
    { name: "SORT", uid: "sortOrder", sortable: true },
    { name: "IMAGE", uid: "image" },
    { name: "NAME", uid: "name", sortable: true },
    { name: "PUBLISHED", uid: "published" },
    { name: "ACTIONS", uid: "actions" },
];

export const INITIAL_COLUMNS_GALLERY = ["sortOrder", "image", "name", "published", "actions"];

export const SEARCH_COLUMNS_GALLERY = ["name"];
