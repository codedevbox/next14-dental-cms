import { SortDescriptor } from "@nextui-org/react";

import { FaqListTable } from "@/db/queries/faq";
import { GalleryListTable } from "@/db/queries/gallery";
import { LanguagesListTable } from "@/db/queries/languages";
import { PageListTable } from "@/db/queries/pages";
import { ServiceList } from "@/db/queries/services";
import { SettingsListTable } from "@/db/queries/settings";
import { TestimonialsListTable } from "@/db/queries/testimonials";
import { UserListTable } from "@/db/queries/users";

export type DataModel = ServiceList | PageListTable | FaqListTable | TestimonialsListTable | LanguagesListTable | GalleryListTable | SettingsListTable | UserListTable;

export type FetchDataFunction<T> = (locale: string) => Promise<T[] | null>;
export type ChangeStatusFunction = (uid: string, newStatus: boolean) => Promise<{ status: string, message: string }>;
export type DeleteItemsFunction = (uid: string) => Promise<{ status: string, message: string }>;

export interface TableColumn {
    name: string;
    uid: string;
    sortable?: boolean;
};

export interface ConfigTable<T> {
    columns: TableColumn[];
    INITIAL_VISIBLE_COLUMNS: string[];
    SEARCH_COLUMNS?: string[];
    fetchData: FetchDataFunction<T>;
    changeStatus?: ChangeStatusFunction;
    deleteItems?: DeleteItemsFunction;
    addItem?: boolean;
    noStatusFilter?: boolean;
    sortDescriptorCustom?: SortDescriptor;
};
