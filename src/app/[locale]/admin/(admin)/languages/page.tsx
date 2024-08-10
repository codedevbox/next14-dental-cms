"use client"

import { usePathname } from "next/navigation";

import AdminBreadcrumbs from "@/components/admin/adminBreadcrumbs";
import GenericTable from "@/components/admin/table/generics/genericTable";
import { ConfigTable } from "@/components/admin/table/tableTypes";
import { configLanguagesTable, INITIAL_COLUMNS_LANGUAGES } from "@/components/admin/table/configs/languages/configLanguagesTable";
import useToastFromStorage from "@/components/admin/hook/useToastFromStorage";

import { toastConfig } from "@/components/admin/toastConfig";
import { extractPathUpTo } from "@/utils/utils";
import { fetchLanguagesListTable, LanguagesListTable } from "@/db/queries/languages";
import { changeLanguageStatusById, deleteLanguageById } from "@/actions/languagesActions";

const ServicesAdminPage: React.FC = () => {
    const pathname = usePathname();

    useToastFromStorage(toastConfig);

    const breadcrumbs = [
        { title: "Home", url: extractPathUpTo(pathname, "admin") },
        { title: "Languages", url: "" },
    ];

    const configTable: ConfigTable<LanguagesListTable> = {
        columns: configLanguagesTable, 
        INITIAL_VISIBLE_COLUMNS: INITIAL_COLUMNS_LANGUAGES,
        fetchData: fetchLanguagesListTable,
        changeStatus: changeLanguageStatusById,
        deleteItems: deleteLanguageById,
        addItem: true,
    };

    return(
        <>
            <AdminBreadcrumbs items={breadcrumbs} />
            <GenericTable configTable={configTable}/>
        </>
    );
}

export default ServicesAdminPage;
