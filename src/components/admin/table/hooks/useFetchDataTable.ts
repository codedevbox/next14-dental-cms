import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";

import { toastConfig } from "../../toastConfig";
import { DataModel, FetchDataFunction } from "../tableTypes";

interface UseFetchDataTableResult<T> {
    localData: T[];
    loading: boolean;
    error: Error | null;
    setLocalData: React.Dispatch<React.SetStateAction<T[]>>;
};

const useFetchDataTable = <T extends DataModel>(fetchData: FetchDataFunction<T>, locale: string): UseFetchDataTableResult<T> => {
    const [localData, setLocalData] = useState<T[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchDataTable = useCallback(async () => {
        setLoading(true);
        try {
            const data = await fetchData(locale);
            if (data !== null) {
                setLocalData(data);
            } else {
                setLocalData([]);
            }
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch data", error);
            setError(error as Error);
            setLoading(false);
            toast.error("Failed to load data", toastConfig);
        }
    }, [fetchData, locale]);

    useEffect(() => {
        fetchDataTable();
    }, [fetchDataTable]);

    return { localData, loading, error, setLocalData };
};

export default useFetchDataTable;
