"use client"

import { usePathname } from "next/navigation";

import AdminBreadcrumbs from "@/components/admin/adminBreadcrumbs";
import GenericTable from "@/components/admin/table/generics/genericTable";
import { ConfigTable } from "@/components/admin/table/tableTypes";
import { columnsGallery, INITIAL_COLUMNS_GALLERY, SEARCH_COLUMNS_GALLERY } from "@/components/admin/table/configs/gallery/configGalleryTable";
import useToastFromStorage from "@/components/admin/hook/useToastFromStorage";

import { toastConfig } from "@/components/admin/toastConfig";
import { extractPathUpTo } from "@/utils/utils";
import { fetchGalleryListTableByLocale, GalleryListTable } from "@/db/queries/gallery";
import { changeGalleryStatusByUid, deleteGalleryByUid } from "@/actions/galleryActions";

const GalleryAdminPage: React.FC = () => {
    const pathname = usePathname();
    useToastFromStorage(toastConfig);

    const breadcrumbs = [
        { title: "Home", url: extractPathUpTo(pathname, "admin") },
        { title: "Gallery", url: "" },
    ];

    const configTable: ConfigTable<GalleryListTable> = {
        columns: columnsGallery, 
        INITIAL_VISIBLE_COLUMNS: INITIAL_COLUMNS_GALLERY,
        SEARCH_COLUMNS: SEARCH_COLUMNS_GALLERY,
        fetchData: fetchGalleryListTableByLocale,
        changeStatus: changeGalleryStatusByUid,
        deleteItems: deleteGalleryByUid,
        addItem: true,
    };

    return(
        <>
            <AdminBreadcrumbs items={breadcrumbs} />
            <GenericTable configTable={configTable}/>
        </>
    );
};

export default GalleryAdminPage;
