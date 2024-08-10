"use client"

import { usePathname } from "next/navigation";

import AdminBreadcrumbs from "@/components/admin/adminBreadcrumbs";
import GenericTable from "@/components/admin/table/generics/genericTable";
import { ConfigTable } from "@/components/admin/table/tableTypes";
import { columnsSections, INITIAL_COLUMNS_SECTIONS, SEARCH_COLUMNS_SECTIONS } from "@/components/admin/table/configs/sections/configSectionsTable";

import { changePageStatusByUid } from "@/actions/pagesActions";
import { fetchPageListTableByLocale, PageListTable } from "@/db/queries/pages";
import { extractPathUpTo } from "@/utils/utils";

const SectionsAdminPage: React.FC = () => {
    const pathname = usePathname();

    const breadcrumbs = [
        { title: "Home", url: extractPathUpTo(pathname, "admin") },
        { title: "Sections", url: "" },
    ];

    const configTable: ConfigTable<PageListTable> = {
        columns: columnsSections,
        INITIAL_VISIBLE_COLUMNS: INITIAL_COLUMNS_SECTIONS,
        SEARCH_COLUMNS: SEARCH_COLUMNS_SECTIONS,
        fetchData: fetchPageListTableByLocale,
        changeStatus: changePageStatusByUid,
    };

    return (
        <>
            <AdminBreadcrumbs items={breadcrumbs} />
            <GenericTable configTable={configTable} />
        </>
    );
}

export default SectionsAdminPage;
