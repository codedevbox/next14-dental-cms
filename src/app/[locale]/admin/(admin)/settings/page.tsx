"use client"

import { usePathname } from "next/navigation";

import AdminBreadcrumbs from "@/components/admin/adminBreadcrumbs";
import useToastFromStorage from "@/components/admin/hook/useToastFromStorage";
import GenericTable from "@/components/admin/table/generics/genericTable";
import { ConfigTable } from "@/components/admin/table/tableTypes";
import { columnsSettings, INITIAL_COLUMNS_SETTINGS, SEARCH_COLUMNS_SETTINGS } from "@/components/admin/table/configs/settings/configSettingsTable";
import { toastConfig } from "@/components/admin/toastConfig";

import { extractPathUpTo } from "@/utils/utils";
import { fetchSettingListTableByLocale, SettingsListTable } from "@/db/queries/settings";
import { changeSettingsStatusByUid, deleteSettingsByUid } from "@/actions/settingsActions";

const SettingsAdminPage: React.FC = () => {
    const pathname = usePathname();
    useToastFromStorage(toastConfig);

    const breadcrumbs = [
        { title: "Home", url: extractPathUpTo(pathname, "admin") },
        { title: "Settings", url: "" },
    ];

    const configTable: ConfigTable<SettingsListTable> = {
        columns: columnsSettings, 
        INITIAL_VISIBLE_COLUMNS: INITIAL_COLUMNS_SETTINGS,
        SEARCH_COLUMNS: SEARCH_COLUMNS_SETTINGS,
        fetchData: fetchSettingListTableByLocale,
        changeStatus: changeSettingsStatusByUid,
        deleteItems: deleteSettingsByUid,
        addItem: true,
    };

    return(
        <>
            <AdminBreadcrumbs items={breadcrumbs} />
            <GenericTable configTable={configTable}/>
        </>
    );
};

export default SettingsAdminPage;
