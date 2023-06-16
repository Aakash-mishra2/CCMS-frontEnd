import React, { useContext, useEffect, useState } from "react";
import Input from "../../shared/formElements/Input";
import Button from "../../shared/formElements/Button";
import { useForm } from "../../shared/hooks/form-hook";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useParams, useHistory } from "react-router/cjs/react-router-dom.min";
import Card from "../../shared/UIelements/Card";
import { useHttpProcess } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/UIelements/ErrorModal";
import { AuthContext } from "../../shared/context/authContext";

export default function UpdateCases() {
    const history = useHistory();
    const auth = useContext(AuthContext);

    const { isLoading, error, sendRequest, clearError } = useHttpProcess();
    const caseid = useParams().caseID;
    const [req_case, setReq_case] = useState();
    const [formState, inputHandler, setFormData] = useForm({
        status: {
            value: ' ',
            isValid: false
        },
        next_hearing: {
            value: ' ',
            isValid: false
        }
    },
        false
    );
    useEffect(() => {
        const getCaseData = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/ccms/admin/${caseid}`);
                setReq_case(responseData.foundCase);
                setFormData(
                    {
                        status: {
                            value: responseData.status,
                            isValid: true
                        },
                        next_hearing: {
                            value: responseData.next_hearing,
                            isValid: true
                        }
                    },
                    true
                );
            } catch (error) { }
        }
        getCaseData();
    }, [sendRequest, caseid, setFormData]);

    if (!req_case) {
        return (
            <div className="center">
                <Card>
                    <h2>Could not find case!</h2>
                </Card>
            </div>
        );
    }
    const caseSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            await sendRequest(
                `http://localhost:5000/ccms/admin/update/${caseid}`,
                'PATCH',
                JSON.stringify({
                    status: formState.inputs.status.value,
                    next_hearing: formState.inputs.next_hearing.value
                }),
                { 'Content-type': 'application/json' }
            );
            history.push('/' + auth.loginID + '/cases');
        } catch (err) { }
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {(isLoading) && (
                < div className="center">
                    <h2>Loading...</h2>
                </div>
            )}
            <ErrorModal error={error} onClear={clearError} />
            <form className="case-form" onSubmit={caseSubmitHandler}>
                <Input
                    id="status"
                    type="text"
                    label="Case Status:  "
                    element="input"
                    errorText="This is a required Field."
                    validators={[VALIDATOR_REQUIRE()]}
                    onInput={inputHandler}
                    initialValue={formState.inputs.description.value}
                    initialValidity={formState.inputs.description.isValid}
                />
                <Input
                    id="next_hearing"
                    type="text"
                    label=" Next Hearing Date: "
                    element="input"
                    errorText="This is a required Field. Please Enter Date DD-MM-YYYY format. "
                    validators={[VALIDATOR_REQUIRE()]}
                    onInput={inputHandler}
                    initialValue={formState.inputs.next_hearing.value}
                    initialValidity={formState.inputs.next_hearing.isValid}
                />
                <Button type="submit" disabled={!formState.isValid} >
                    Update
                </Button>
            </form>
        </React.Fragment>

    );
};