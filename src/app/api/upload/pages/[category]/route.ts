import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { writeFile } from "fs/promises";
import crypto from "crypto";

export const POST = async (req: NextRequest) => {
    const pathname = req.nextUrl.pathname;
    const parts = pathname.split("/");
    const category = parts[parts.length - 1];

    if (!["sections", "services", "testimonials", "gallery", "user"].includes(category)) {
        return NextResponse.json({ error: "Incorrect category" }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), `/storage/images/uploads/${category}`);
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const data = await req.formData();
    const items = data.getAll("files");
    let file = null;
    for (const item of items) {
        if (item && typeof item === "object" && "size" in item && "type" in item && "name" in item) {
            file = item;
            break;
        }
    }
    if (!file) {
        return NextResponse.json(
            { error: "No file uploaded or wrong input name" },
            { status: 400 }
        );
    }

    if (file.size > 2097152) {
        return NextResponse.json({ error: "File size no more than 2MB" }, { status: 400 });
    }

    const extension = path.extname(file.name).slice(1).toLowerCase();
    const allowedExtensions = new Set(["png", "gif", "jpg", "jpeg", "webp", "avif"]);
    if (!allowedExtensions.has(extension)) {
        return NextResponse.json({ error: "Only png, gif, jpg, jpeg, webp, avif" }, { status: 400 });
    }

    const baseName = path.basename(file.name, path.extname(file.name));

    let fileName = baseName.replace(/[^a-zA-Z0-9-]/g, "");

    if (fileName === "") {
        fileName = `${category}-${crypto.randomBytes(5).toString("hex")}`;
    }

    fileName += "." + extension;

    let uploadPath = path.join(uploadDir, fileName);
    if (fs.existsSync(uploadPath)) {
        fileName = `${category}-${crypto.randomBytes(5).toString("hex")}.${extension}`;
        uploadPath = path.join(uploadDir, fileName);
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    await writeFile(uploadPath, buffer);

    const webName = `uploads/${category}/${fileName}`;
    const safeWebName = webName.split("/").map(encodeURIComponent).join("%2F");

    return NextResponse.json({ success: true, filePath: `/api/images/${safeWebName}` });
};
