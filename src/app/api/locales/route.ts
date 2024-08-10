import { getAvailableLocales, getDefaultLocale } from "@/db/queries/languages";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const locales = await getAvailableLocales();
        const defaultLocale = await getDefaultLocale();

        const responseData = {
            locales,
            defaultLocale
        };

        return new NextResponse(JSON.stringify(responseData), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            }
        });
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Error fetching data" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            }
        });
    }
};
