import { useState, useCallback, useEffect, useRef } from "react";

export const useHttpProcess = () => {

    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const activeHttpRequests = useRef([]);

    const sendRequests = useCallback(async (url, method = 'GET', body = null, header = {}) => {
        const abC = new AbortController();
        activeHttpRequests.current.push(abC);
        setIsLoading(true);
        try {
            const response = await fetch(url, {
                method,
                body,
                header,
                signal: abC.signal
            });
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message);
            }
            return responseData;
        }
        catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    }, [])

    const clearError = () => {
        setError(null);
    };
    // useEffect second version for cleanup fxn when parent componenet unmounts..
    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach(ABC => ABC.abort());
        }
    }, [])

    return { isloading, error, sendRequests, clearError }
}
