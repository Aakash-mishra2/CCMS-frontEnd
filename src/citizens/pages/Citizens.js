import React, { useEffect, useState } from "react";
import CitizenList from "../components/CitizenList";
import { useHttpProcess } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/UIelements/ErrorModal";
export default function Citizens() {

    const { isLoading, error, sendRequest, clearError } = useHttpProcess();
    const [allCitizens, setAllCitizens] = useState();

    useEffect(() => {
        const getAllPlaintiffs = async () => {
            try {
                const responseData = await sendRequest('http://localhost:5000/ccms/public');
                setAllCitizens(responseData.plaintiffs);
            }
            catch (error) { }
        }
        getAllPlaintiffs();
    }, [sendRequest]);

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading &&
                (<div className="center">
                    <h2>Loading...</h2>
                </div>)
            }
            {!isLoading && allCitizens && <CitizenList items={allCitizens} />}
        </React.Fragment>
    )
};