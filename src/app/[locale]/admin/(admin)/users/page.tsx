"use client"

import { usePathname } from "next/navigation";

import AdminBreadcrumbs from "@/components/admin/adminBreadcrumbs";
import useToastFromStorage from "@/components/admin/hook/useToastFromStorage";
import GenericTable from "@/components/admin/table/generics/genericTable";
import { ConfigTable } from "@/components/admin/table/tableTypes";
import { configUserTable, INITIAL_COLUMNS_USER, SEARCH_COLUMNS_USER } from "@/components/admin/table/configs/user/configUserTable";
import { toastConfig } from "@/components/admin/toastConfig";

import { extractPathUpTo } from "@/utils/utils";
import { fetchUserListTable, UserListTable } from "@/db/queries/users";
import { deleteUserById } from "@/actions/userActions";

const ServicesAdminPage: React.FC = () => {
    const pathname = usePathname();

    useToastFromStorage(toastConfig);
    
    const breadcrumbs = [
        { title: "Home", url: extractPathUpTo(pathname, "admin") },
        { title: "Users", url: "" },
    ];

    const configTable: ConfigTable<UserListTable> = {
        columns: configUserTable, 
        INITIAL_VISIBLE_COLUMNS: INITIAL_COLUMNS_USER,
        SEARCH_COLUMNS: SEARCH_COLUMNS_USER,
        fetchData: fetchUserListTable,
        deleteItems: deleteUserById,
        addItem: true,
        noStatusFilter: true,
        sortDescriptorCustom: {
            column: "id",
            direction: "descending",
        }
    };

    return(
        <>
            <AdminBreadcrumbs items={breadcrumbs} />
            <GenericTable configTable={configTable}/>
        </>
    );
};

export default ServicesAdminPage;
