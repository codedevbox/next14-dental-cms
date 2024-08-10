"use client"

import { usePathname } from "next/navigation";

import AdminBreadcrumbs from "@/components/admin/adminBreadcrumbs";
import useToastFromStorage from "@/components/admin/hook/useToastFromStorage";
import GenericTable from "@/components/admin/table/generics/genericTable";
import { ConfigTable } from "@/components/admin/table/tableTypes";
import { columnsServices, INITIAL_VISIBLE_SERVICES, SEARCH_COLUMNS_SERVICES } from "@/components/admin/table/configs/services/configServecesTable";
import { toastConfig } from "@/components/admin/toastConfig";

import { extractPathUpTo } from "@/utils/utils";
import { fetchServiceListTableByLocale, ServiceListTable } from "@/db/queries/services";
import { changeServiceStatusByUid, deleteServiceByUid } from "@/actions/servicesActions";

const ServicesAdminPage: React.FC = () => {
    const pathname = usePathname();
    useToastFromStorage(toastConfig);

    const breadcrumbs = [
        { title: "Home", url: extractPathUpTo(pathname, "admin") },
        { title: "Services", url: "" },
    ];

    const configTable: ConfigTable<ServiceListTable> = {
        columns: columnsServices, 
        INITIAL_VISIBLE_COLUMNS: INITIAL_VISIBLE_SERVICES,
        SEARCH_COLUMNS: SEARCH_COLUMNS_SERVICES,
        fetchData: fetchServiceListTableByLocale,
        changeStatus: changeServiceStatusByUid,
        deleteItems: deleteServiceByUid,
        addItem: true,
    };

    return(
        <>
            <AdminBreadcrumbs items={breadcrumbs} />
            <GenericTable configTable={configTable}/>
        </>
    );
};

export default ServicesAdminPage;
