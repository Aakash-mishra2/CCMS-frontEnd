import React, { useEffect, useState } from "react";
import CitizenList from "../components/CitizenList";
import { useHttpProcess } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/UIelements/ErrorModal";
import LoadingSpinner from "../../shared/UIelements/LoadingSpinner";

export default function Citizens() {
    const { isLoading, error, sendRequest, clearError } = useHttpProcess();
    const [allCitizens, setAllCitizens] = useState();

    useEffect(() => {
        const getAllPlaintiffs = async () => {
            try {
                const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/public');
                setAllCitizens(responseData.plaintiffs);
            }
            catch (error) { }
        }
        getAllPlaintiffs();
    }, [sendRequest]);

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (<LoadingSpinner asOverlay />)}
            {!isLoading && allCitizens && <CitizenList items={allCitizens} />}
        </React.Fragment>
    )
};