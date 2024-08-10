import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import { Button, Chip, Image, Pagination, Selection, SortDescriptor, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from "@nextui-org/react";
import { ToastContainer } from "react-toastify";

import { statusColorMap, statusOptions } from "../configs/configTables";
import { ConfigTable, DataModel } from "../tableTypes";
import { toastConfig } from "../../toastConfig";
import { EyeIcon } from "../../icons/EyeIcon";
import { EditIcon } from "../../icons/EditIcon";
import { TrashIcon } from "../../icons/TrashIcon";
import DeleteModal from "../../deleteModal";
import useFetchDataTable from "../hooks/useFetchDataTable";
import { useTogglePublishStatus } from "../hooks/useTogglePublishStatus";
import { useDeleteItem } from "../hooks/useDeleteItem";
import { TopContent } from "./genericTopContent";
import { getProperty } from "@/utils/utils";

import "react-toastify/dist/ReactToastify.css";

interface GenericTableProps<T extends DataModel> {
    configTable: ConfigTable<T>;
};

const GenericTable: React.FC<GenericTableProps<DataModel>> = ({ configTable }) => {
    const { columns, INITIAL_VISIBLE_COLUMNS, SEARCH_COLUMNS, fetchData, changeStatus, deleteItems, addItem, noStatusFilter, sortDescriptorCustom } = configTable;

    const locale = useLocale();
    const t = useTranslations("ADMIN.TABLE");

    const { localData, setLocalData, loading, error } = useFetchDataTable<DataModel>(fetchData, locale);
    const togglePublishStatus = useTogglePublishStatus({ changeStatus, setLocalData, toastConfig });
    const pathname = usePathname();
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const handleDelete = useDeleteItem({ deleteItems, setLocalData, onClose, toastConfig });

    const [filterValue, setFilterValue] = useState("");
    const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
    const [statusFilter, setStatusFilter] = useState<Selection>("all");
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>(sortDescriptorCustom || {
        column: "sortOrder",
        direction: "ascending",
    });
    const [toDeleteItem, setToDeleteItem] = useState<DataModel | null>(null);
    const [page, setPage] = useState(1);

    const session = useSession();
    const userId = session.data?.user.id;

    const headerColumns = useMemo(() => {
        if (visibleColumns === "all") return columns;
        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns, columns]);

    const hasSearchFilter = Boolean(filterValue);

    const filteredItems = useMemo(() => {
        let filteredData = [...localData];

        if (hasSearchFilter && SEARCH_COLUMNS) {
            filteredData = filteredData.filter(item =>
                SEARCH_COLUMNS.some(column =>
                    getProperty(item, column as keyof typeof item)?.toString().toLowerCase().includes(filterValue.toLowerCase())
                )
            );
        };

        if (!noStatusFilter && statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
            filteredData = filteredData.filter((item) => {
                const hasPublished = "published" in item;
                if (hasPublished) {
                    return Array.from(statusFilter).includes(item.published ? "yes" : "no");
                }
                else {
                    return item;
                }
            }
            );
        };

        return filteredData;
    }, [localData, filterValue, hasSearchFilter, statusFilter, SEARCH_COLUMNS, noStatusFilter]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = useMemo(() => {
        return [...items].sort((a: DataModel, b: DataModel) => {
          const first = a[sortDescriptor.column as keyof DataModel] as unknown as number;
          const second = b[sortDescriptor.column as keyof DataModel] as unknown as number;
          const cmp = first < second ? -1 : first > second ? 1 : 0;
    
          return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
      }, [sortDescriptor, items]);

    const dellItem = useCallback(async (item: DataModel) => {
        setToDeleteItem(item);
        onOpen();
    }, [onOpen]);

    const renderCell = useCallback((item: DataModel, columnKey: React.Key) => {
        const cellValue = item[columnKey as keyof DataModel];

        const hasGroupId = "groupId" in item;
        const hasPublished = "published" in item;
        const hasUsers = "isadmin" in item;

        switch (columnKey) {
            case "image":
                if ("image" in item && item.image && typeof item.image === "string" && item.image.trim().length > 0) {
                    return (
                        <Image
                            radius="lg"
                            alt=""
                            className="w-full object-contain h-[80px]"
                            src={item.image} />
                    );
                }
                else {
                    return "";
                }
            case "main":
                if (!hasGroupId && hasPublished && item.main) {
                    return (
                        <Chip className="capitalize" color={statusColorMap[item.main ? "yes" : "no"]} size="sm" variant="flat">
                            {t("YES")}
                        </Chip>
                    );
                }
                else {
                    return "";
                }
            case "isadmin":
                if (hasUsers && item.isadmin) {
                    return (
                        <Chip className="capitalize" color={statusColorMap[item.isadmin ? "yes" : "no"]} size="sm" variant="flat">
                            {t("YES")}
                        </Chip>
                    );
                }
                else {
                    return "";
                }
            case "published":
                if (hasPublished) {
                    return (
                        <Chip className="capitalize" color={statusColorMap[item.published ? "yes" : "no"]} size="sm" variant="flat">
                            {cellValue ? t("YES") : t("NO")}
                        </Chip>
                    );
                }
            case "actions":
                if (hasUsers) {
                    return (
                        <div className="relative flex items-center gap-5">
                            <span className="text-2xl text-default-400 hover:text-blue-500 cursor-pointer hover:scale-120">
                                <Link href={`${pathname}/edit/${hasGroupId ? item.groupId : item.id}`}>
                                    <EditIcon />
                                </Link>
                            </span>
                            {deleteItems && item.id !== userId && (
                                <span onClick={() => dellItem(item)} className="text-2xl text-default-400 hover:text-colorto cursor-pointer hover:scale-120">
                                    <TrashIcon />
                                </span>
                            )}
                        </div>
                    );
                }
                else {
                    return (
                        <div className="relative flex items-center gap-5">
                            {hasPublished && (
                                <span onClick={() => togglePublishStatus(item)} className={`text-2xl  cursor-pointer hover:text-orange-700 ${item.published ? "text-orange-500" : "text-default-400"}`}>
                                    <EyeIcon />
                                </span>
                            )}
                            <span className="text-2xl text-default-400 hover:text-blue-500 cursor-pointer hover:scale-120">
                                <Link href={`${pathname}/edit/${hasGroupId ? item.groupId : item.id}`}>
                                    <EditIcon />
                                </Link>
                            </span>
                            {deleteItems && (
                                <span onClick={() => dellItem(item)} className="text-2xl text-default-400 hover:text-colorto cursor-pointer hover:scale-120">
                                    <TrashIcon />
                                </span>
                            )}
                        </div>
                    );
                }
            default:
                return cellValue;
        }
    }, [togglePublishStatus, pathname, dellItem, deleteItems, userId, t]);

    const onSearchChange = useCallback((value?: string) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = useCallback(() => {
        setFilterValue("")
        setPage(1)
    }, []);

    const onNextPage = useCallback(() => {
        if (page < pages) {
            setPage(page + 1);
        }
    }, [page, pages]);

    const onPreviousPage = useCallback(() => {
        if (page > 1) {
            setPage(page - 1);
        }
    }, [page]);

    const onRowsPerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const bottomContent = useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={setPage}
                />
                <div className="hidden sm:flex w-[30%] justify-end gap-2">
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
                        {t("Previous")}
                    </Button>
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
                        {t("Next")}
                    </Button>
                </div>
            </div>
        );
    }, [ page, pages, onPreviousPage, onNextPage, t]);

    return (
        <>
            <div className="flex-1 flex bg-white rounded-lg mx-3 mb-3 justify-center items-start p-5">
                <Table
                    aria-label="table"

                    classNames={{
                        wrapper: "",
                    }}

                    bottomContent={bottomContent}
                    bottomContentPlacement="outside"

                    sortDescriptor={sortDescriptor}
                    topContent={<TopContent
                        filterValue={filterValue}
                        onSearchChange={onSearchChange}
                        onClear={onClear}
                        columns={columns}
                        visibleColumns={visibleColumns}
                        setVisibleColumns={setVisibleColumns}
                        statusFilter={statusFilter}
                        setStatusFilter={setStatusFilter}
                        pathname={pathname}
                        statusOptions={statusOptions}
                        addItem={addItem}
                        noStatusFilter={noStatusFilter}
                        localData={localData}
                        onRowsPerPageChange={onRowsPerPageChange}
                    />}
                    topContentPlacement="outside"
                    onSortChange={setSortDescriptor}
                >
                    <TableHeader columns={headerColumns}>
                        {(column) => (
                            <TableColumn
                                key={column.uid}
                                align={column.uid === "actions2" ? "center" : "start"}
                                allowsSorting={column.sortable}
                            >
                                {t(column.name)}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody loadingContent={`t("Loading")...`} emptyContent={""} items={sortedItems}>
                        {(item) => {
                            //console.log(item);
                            return (
                                <TableRow className=" hover:bg-default-100 rounded-lg" key={item.id}>
                                    {(columnKey) => <TableCell align={columnKey === "name" ? "left" : "center"}>{renderCell(item, columnKey)}</TableCell>}
                                </TableRow>
                            )
                        }}
                    </TableBody>
                </Table>
            </div>
            <ToastContainer />
            {deleteItems && toDeleteItem && (
                <DeleteModal
                    item={toDeleteItem}
                    onDelete={handleDelete}
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                />
            )}
        </>
    );
};

export default GenericTable;
