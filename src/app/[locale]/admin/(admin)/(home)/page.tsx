import Link from "next/link";
import { useLocale } from "next-intl";
import { Card, CardBody, CardFooter } from "@nextui-org/react";

import { AdminMenuData, AdminMenuDataItem, iconMap } from "@/components/admin/adminMenuData";

const AdminPage = () => {
    const locale = useLocale();

    return (
        <div className="p-3">
            <div className="gap-10 grid grid-cols-2 sm:grid-cols-5">
                {AdminMenuData.map((item: AdminMenuDataItem) => {
                    const IconComponent = iconMap[item.icon];

                    return (
                        <Card key={`menu${item.slug}`} className="hover:scale-110" shadow="sm" isPressable>
                            <Link href={`/${locale}/admin/${item.slug}`} className="w-full">
                                <CardBody className="p-5 w-full flex items-center justify-center">
                                    <IconComponent className={`size-20 ${item.color}`} />
                                </CardBody>
                                <CardFooter className="text-small justify-center">
                                    <b>{item.name[locale]}</b>
                                </CardFooter>
                            </Link>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};

export default AdminPage;
