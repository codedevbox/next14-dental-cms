import fs from "fs/promises";

export const deleteFile = async (filePath: string): Promise<void> =>{
    try {
        await fs.unlink(filePath);
    } catch (error: unknown) {
        if (error instanceof Error && "code" in error) {
            if (error["code"] !== "ENOENT") {
                throw new Error(`Failed to delete image at ${filePath}: ${error.message}`);
            }
        } else {
            throw new Error(`An unexpected error occurred while trying to delete the file at ${filePath}`);
        }
    }
};

export const checkFileExists = async (filePath: string): Promise<boolean> => {
    try {
        await fs.access(filePath);
        return true;
    } catch {
        return false;
    }
};