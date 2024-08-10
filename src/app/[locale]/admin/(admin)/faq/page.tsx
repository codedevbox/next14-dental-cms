"use client";

import { usePathname } from "next/navigation";

import "react-toastify/dist/ReactToastify.css";

import AdminBreadcrumbs from "@/components/admin/adminBreadcrumbs";
import GenericTable from "@/components/admin/table/generics/genericTable";
import { ConfigTable } from "@/components/admin/table/tableTypes";
import { columnsFaq, INITIAL_COLUMNS_FAQ, SEARCH_COLUMNS_FAQ } from "@/components/admin/table/configs/faq/configFaqTable";
import useToastFromStorage from "@/components/admin/hook/useToastFromStorage";
import { toastConfig } from "@/components/admin/toastConfig";

import { FaqListTable, fetchFaqListTableByLocale } from "@/db/queries/faq";
import { changeFaqStatusByUid, deleteFaqsByUid } from "@/actions/faqActions";
import { extractPathUpTo } from "@/utils/utils";

const FaqAdminPage: React.FC = () => {
    const pathname = usePathname();
    useToastFromStorage(toastConfig);

    const breadcrumbs = [
        { title: "Home", url: extractPathUpTo(pathname, "admin") },
        { title: "FAQ", url: "" }
    ];

    const configTable: ConfigTable<FaqListTable> = {
        columns: columnsFaq,
        INITIAL_VISIBLE_COLUMNS: INITIAL_COLUMNS_FAQ,
        SEARCH_COLUMNS: SEARCH_COLUMNS_FAQ,
        fetchData: fetchFaqListTableByLocale,
        changeStatus: changeFaqStatusByUid,
        deleteItems: deleteFaqsByUid,
        addItem: true
    };

    return (
        <>
            <AdminBreadcrumbs items={breadcrumbs} />
            <GenericTable configTable={configTable} />
        </>
    );
};

export default FaqAdminPage;
