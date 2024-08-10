export const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const printTypes = (obj: any) => {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            console.log(`Key: ${key}, Value: ${obj[key]}, Type: ${typeof obj[key]}`);
        }
    }
};

export const extractPathUpTo = (fullPath: string, slug: string) => {
    const parts = fullPath.split("/");
    const editIndex = parts.indexOf(slug);
    if (editIndex !== -1) {
        return parts.slice(0, editIndex + 1).join("/");
    } else {
        return "";
    }
};

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getProperty = <T, K extends keyof T>(item: T, key: K): T[K] | undefined => {
    return item[key];
};
