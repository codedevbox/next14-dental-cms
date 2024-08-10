"use client"

import { Spinner } from "@nextui-org/react";

export default function Loading() {
    return (
        <div className="flex-1 flex rounded-lg mx-3 mb-3 justify-center items-center p-5">
            <Spinner color="warning" />
        </div>
    )
};
