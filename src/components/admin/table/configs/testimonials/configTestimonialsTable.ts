import { TableColumn } from "../../tableTypes";

export const columnsTestimonials: TableColumn[] = [
    { name: "ID", uid: "id" },
    { name: "GID", uid: "groupId" },
    { name: "SORT", uid: "sortOrder", sortable: true },
    { name: "NAME", uid: "name", sortable: true },
    { name: "PUBLISHED", uid: "published" },
    { name: "ACTIONS", uid: "actions" },
];

export const INITIAL_COLUMNS_TESTIMONIALS = ["sortOrder", "name", "published", "actions"];

export const SEARCH_COLUMNS_TESTIMONIALS = ["name", "text"];
