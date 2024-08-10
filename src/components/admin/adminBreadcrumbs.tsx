"use client";

import Link from "next/link";
import { BreadcrumbItem } from "@nextui-org/react";

interface BreadcrumbItem {
    title: string;
    url: string;
};

interface AdminBreadcrumbsProps {
    items: BreadcrumbItem[];
};

const AdminBreadcrumbs: React.FC<AdminBreadcrumbsProps> = ({ items }) => {
    return (
        <div className="p-3 pt-0">
            <div className="w-full flex py-4 px-1">

                {items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    return (
                        <span key={`breadcrumb${index}`} className="text-white text-sm font-light opacity-75 ">
                            {isLast ? (
                                <span>{item.title}</span>
                            ) : (
                                <>
                                    <Link className=" hover:underline" href={item.url}>
                                        {item.title}
                                    </Link>
                                    <span className="px-3">/</span>
                                </>
                            )}
                        </span>
                    );
                })}

            </div>
        </div>
    );
};

export default AdminBreadcrumbs;
