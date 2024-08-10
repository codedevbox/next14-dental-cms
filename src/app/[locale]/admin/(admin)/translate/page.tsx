"use client"

import { usePathname } from "next/navigation";

import AdminBreadcrumbs from "@/components/admin/adminBreadcrumbs";
import useToastFromStorage from "@/components/admin/hook/useToastFromStorage";
import GenericTable from "@/components/admin/table/generics/genericTable";
import { ConfigTable } from "@/components/admin/table/tableTypes";
import { columnsTranslate, INITIAL_COLUMNS_TRANSLATE, SEARCH_COLUMNS_TRANSLATE } from "@/components/admin/table/configs/translate/configTranslateTable";
import { toastConfig } from "@/components/admin/toastConfig";

import { extractPathUpTo } from "@/utils/utils";
import { fetchTranslateListTableByLocale, TranslateListTable } from "@/db/queries/translate";
import { changeTranslateStatusByUid, deleteTranslateByUid } from "@/actions/translateActions";

const TranslateAdminPage: React.FC = () => {
    const pathname = usePathname();
    useToastFromStorage(toastConfig);

    const breadcrumbs = [
        { title: "Home", url: extractPathUpTo(pathname, "admin") },
        { title: "Translate", url: "" },
    ];

    const configTable: ConfigTable<TranslateListTable> = {
        columns: columnsTranslate,
        INITIAL_VISIBLE_COLUMNS: INITIAL_COLUMNS_TRANSLATE,
        SEARCH_COLUMNS: SEARCH_COLUMNS_TRANSLATE,
        fetchData: fetchTranslateListTableByLocale,
        changeStatus: changeTranslateStatusByUid,
        deleteItems: deleteTranslateByUid,
        addItem: true,
        sortDescriptorCustom: {
            column: "sortOrder",
            direction: "descending",
        }
    };

    return (
        <>
            <AdminBreadcrumbs items={breadcrumbs} />
            <GenericTable configTable={configTable} />
        </>
    );
};

export default TranslateAdminPage;
