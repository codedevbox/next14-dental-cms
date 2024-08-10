"use client"

import { usePathname } from "next/navigation";

import AdminBreadcrumbs from "@/components/admin/adminBreadcrumbs";
import useToastFromStorage from "@/components/admin/hook/useToastFromStorage";
import GenericTable from "@/components/admin/table/generics/genericTable";
import { ConfigTable } from "@/components/admin/table/tableTypes";
import { columnsTestimonials, INITIAL_COLUMNS_TESTIMONIALS, SEARCH_COLUMNS_TESTIMONIALS } from "@/components/admin/table/configs/testimonials/configTestimonialsTable";
import { toastConfig } from "@/components/admin/toastConfig";

import { extractPathUpTo } from "@/utils/utils";
import { fetchTestimonialListTableByLocale, TestimonialsListTable } from "@/db/queries/testimonials";
import { changeTestimonialStatusByUid, deleteTestimonialByUid } from "@/actions/testimonialsActions";

const ServicesAdminPage: React.FC = () => {
    const pathname = usePathname();
    useToastFromStorage(toastConfig);

    const breadcrumbs = [
        { title: "Home", url: extractPathUpTo(pathname, "admin") },
        { title: "Testimonials", url: "" },
    ];

    const configTable: ConfigTable<TestimonialsListTable> = {
        columns: columnsTestimonials, 
        INITIAL_VISIBLE_COLUMNS: INITIAL_COLUMNS_TESTIMONIALS,
        SEARCH_COLUMNS: SEARCH_COLUMNS_TESTIMONIALS,
        fetchData: fetchTestimonialListTableByLocale,
        changeStatus: changeTestimonialStatusByUid,
        deleteItems: deleteTestimonialByUid,
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
