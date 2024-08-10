import { ChipProps } from "@nextui-org/react";

export interface StatusOption {
    name: string;
    uid: string;
};

export const statusOptions: StatusOption[] = [
    { name: "PUBLISHED", uid: "yes" },
    { name: "NOT PUBLISHED", uid: "no" }
];

export const statusColorMap: Record<string, ChipProps["color"]> = {
    yes: "success",
    no: "danger",
};
