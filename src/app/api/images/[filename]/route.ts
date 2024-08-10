import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const GET = async (req: NextRequest) => {
    const rawPath = req.nextUrl.pathname.replace(/^\/api\/images\//, "");
    const decodedPath = decodeURIComponent(rawPath);
    const filePath = path.join("./storage/images/", decodedPath);

    try {
        await fs.promises.access(filePath, fs.constants.F_OK);
        const mimeType = filePath.endsWith(".png") ? "image/png" :
                         filePath.endsWith(".jpg") || filePath.endsWith(".jpeg") ? "image/jpeg" :
                         filePath.endsWith(".gif") ? "image/gif" :
                         "application/octet-stream";
        const fileBuffer = await fs.promises.readFile(filePath);
        return new NextResponse(fileBuffer, {
            status: 200,
            headers: {
                "Content-Type": mimeType,
            }
        });
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "File not found" }), {
            status: 404,
            headers: {
                "Content-Type": "application/json",
            }
        });
    }
};
