import { useState, useCallback, useEffect, useRef } from "react";

export const useHttpProcess = () => {

    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const activeHttpRequests = useRef([]);

    const sendRequest = useCallback(async (url, method = 'get', body = null, headers = {}) => {
        const httpAbortCtrl = new AbortController();
        activeHttpRequests.current.push(httpAbortCtrl);
        setIsLoading(true);
        try {
            const response = await fetch(url, {
                method,
                body,
                headers,
                signal: httpAbortCtrl.signal
            });
            const responseData = await response.json();
            activeHttpRequests.current = activeHttpRequests.current.filter(
                reqCtrl => reqCtrl !== httpAbortCtrl
            );
            if (!response.ok) {
                throw new Error(responseData.message);
            }
            setIsLoading(false);
            return responseData;
        }
        catch (error) {
            setIsLoading(false);
            setError(error.message);
            throw error;
        }
    }, [])

    const clearError = () => {
        setError(null);
    };
    // useEffect second version for cleanup fxn when parent componenet unmounts..
    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach(ABC => ABC.abort());
        }
    }, [activeHttpRequests])

    return { isloading, sendRequest, error, clearError }
}
