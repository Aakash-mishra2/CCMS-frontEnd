import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import CaseList from "../components/CaseList";
import { useHttpProcess } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/UIelements/ErrorModal";

export default function RegisteredCases() {
  const userID = useParams().uid;
  const [loadedCases, setLoadedCases] = useState();
  const { isLoading, sendRequest, error, clearError } = useHttpProcess();


  useEffect(() => {
    const getAllCases = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:5000/ccms/admin/user/${userID}`);
        setLoadedCases(responseData.allCases);
      } catch (err) { }
    }
    getAllCases();
  }, [sendRequest, userID]);

  const removeCase = (delID) => {
    setLoadedCases(
      prevCases => prevCases.filter(item => item.id !== delID));
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading &&
        (<div className="center">
          <h2>Loading...</h2>
        </div>)
      }
      {!isLoading && loadedCases && <CaseList plaintiffID={userID} removeItem={removeCase} cases={loadedCases} />}
    </React.Fragment>
  )
};
