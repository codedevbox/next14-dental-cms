import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Selection, Input } from "@nextui-org/react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { capitalize } from "@/utils/utils";
import { SearchIcon } from "../../icons/SearchIcon";
import { ChevronDownIcon } from "../../icons/ChevronDownIcon";
import { PlusIcon } from "../../icons/PlusIcon";
import { DataModel, TableColumn } from "../tableTypes";
import { StatusOption } from "../configs/configTables";

interface TopContentProps {
    filterValue: string;
    onSearchChange: (value: string) => void;
    onClear: () => void;
    columns: TableColumn[];
    visibleColumns: Selection;
    setVisibleColumns: React.Dispatch<React.SetStateAction<Selection>>;
    statusFilter: Selection;
    setStatusFilter: React.Dispatch<React.SetStateAction<Selection>>;
    pathname: string;
    statusOptions: StatusOption[];
    addItem: boolean | undefined;
    noStatusFilter: boolean | undefined;
    localData: DataModel [];
    onRowsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const TopContent: React.FC<TopContentProps> = ({
    filterValue,
    onSearchChange,
    onClear,
    columns,
    visibleColumns,
    setVisibleColumns,
    statusFilter,
    setStatusFilter,
    pathname,
    statusOptions,
    addItem,
    noStatusFilter,
    localData,
    onRowsPerPageChange
}) => {
    const t = useTranslations("ADMIN.TABLE");

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between gap-3 items-end">
                <Input
                    isClearable
                    className="w-full sm:max-w-[44%]"
                    placeholder={t("Search placeholder")}
                    startContent={<SearchIcon />}
                    value={filterValue}
                    onClear={onClear}
                    onValueChange={onSearchChange}
                />
                <div className="flex gap-3">
                    {!noStatusFilter && (
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                                    {t("Status")}
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Filter Status"
                                closeOnSelect={false}
                                selectedKeys={statusFilter}
                                selectionMode="multiple"
                                onSelectionChange={setStatusFilter}
                            >
                                {statusOptions.map((status) => (
                                    <DropdownItem key={status.uid} className="capitalize">
                                        {capitalize(t(status.name))}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    )}
                    <Dropdown>
                        <DropdownTrigger className="hidden sm:flex">
                            <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                                {t("Columns")}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            disallowEmptySelection
                            aria-label="Select Columns"
                            closeOnSelect={false}
                            selectedKeys={visibleColumns}
                            selectionMode="multiple"
                            onSelectionChange={setVisibleColumns}
                        >
                            {columns.map((column) => (
                                <DropdownItem key={column.uid} className="capitalize">
                                    {capitalize(t(`${column.name}`))}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                    {addItem && (
                        <Button color="primary" as={Link} href={`${pathname}/add`} endContent={<PlusIcon />}>
                            {t("Add new")}
                        </Button>
                    )}
                </div>
            </div>
            <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">{t("Total")} {localData.length} {t("items")}</span>
          <label className="flex items-center text-default-400 text-small">
          {t("Rows per page")}:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
              defaultValue={15}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          </label>
        </div>
        </div>
    );
};
