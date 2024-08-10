import { useEffect } from "react";
import { toast, ToastOptions } from "react-toastify";

function useToastFromStorage(toastConfig: ToastOptions) {
    useEffect(() => {
        const message = localStorage.getItem("toastMessage");
        if (message) {
            const temporaryToastConfig = {
                ...toastConfig,
                onClose: () => {
                    localStorage.removeItem("toastMessage");
                }
            };
            toast.success(message, temporaryToastConfig);
        }
    }, [toastConfig]); 
}

export default useToastFromStorage;
