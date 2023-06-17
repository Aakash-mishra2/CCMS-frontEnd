import React, { useContext, useEffect, useState } from "react";
import Input from "../../shared/formElements/Input";
import Button from "../../shared/formElements/Button";
import { useForm } from "../../shared/hooks/form-hook";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../../shared/UIelements/Card";
import { useHttpProcess } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/UIelements/ErrorModal";
import { AuthContext } from "../../shared/context/authContext";

export default function UpdateCases() {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    const { isLoading, sendRequest, error, clearError } = useHttpProcess();
    const caseid = useParams().caseID;
    const [req_case, setReq_case] = useState();
    const [formState, inputHandler, setFormData] = useForm({
        new_status: {
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
                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/admin/${caseid}`);
                setReq_case(responseData.foundCase);
                setFormData(
                    {
                        new_status: {
                            value: responseData.foundCase.new_status,
                            isValid: true
                        },
                        next_hearing: {
                            value: responseData.foundCase.next_hearing,
                            isValid: true
                        }
                    },
                    true
                );
            } catch (error) { }
        }
        getCaseData();
        console.log('getCase request done...');
    }, [sendRequest, caseid, setFormData]);
    console.log(formState.inputs);
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
                `${process.env.REACT_APP_BACKEND_URL}/admin/update/${caseid}`,
                'PATCH',
                JSON.stringify({
                    new_status: formState.inputs.new_status.value,
                    next_hearing: formState.inputs.next_hearing.value
                }),
                { 'Content-type': 'application/json' }
            );
            navigate('/' + auth.loginID + '/cases');
        } catch (err) { }
        console.log('case update req sent. ')
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
                    id="new_status"
                    type="text"
                    label="Case Status:  "
                    element="input"
                    errorText="This is a required Field."
                    validators={[VALIDATOR_REQUIRE()]}
                    onInput={inputHandler}
                    initialValue={formState.inputs.new_status.value}
                    initialValidity={formState.inputs.new_status.isValid}
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