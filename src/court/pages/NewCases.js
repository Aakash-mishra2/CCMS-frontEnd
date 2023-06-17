import React, { useContext } from "react";
import Input from "../../shared/formElements/Input";
import { useForm } from "../../shared/hooks/form-hook";
import Button from "../../shared/formElements/Button";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../shared/util/validators";
import './CasesForm.css';
import { useHttpProcess } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/authContext";
import ErrorModal from "../../shared/UIelements/ErrorModal";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../shared/UIelements/LoadingSpinner";
export default function NewCases() {
    const auth = useContext(AuthContext);
    const [formState, inputHandler] = useForm({
        court: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        },
        location_city: {
            value: '',
            isValid: false
        },
        location_pincode: {
            value: '',
            isValid: false
        },
        judge: {
            value: '',
            isValid: false
        },
    }, false
    )
    const { isLoading, sendRequest, error, clearError } = useHttpProcess();

    const history = useNavigate();

    const caseSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            await sendRequest(
                process.env.REACT_APP_BACKEND_URL + '/admin/newcase',
                'POST',
                JSON.stringify({
                    court: formState.inputs.court.value,
                    description: formState.inputs.description.value,
                    location_city: formState.inputs.location_city.value,
                    location_pincode: formState.inputs.location_pincode.value,
                    judge: formState.inputs.judge.value,
                    plaintiff: auth.loginID
                }),
                { 'Content-Type': 'application/json' }
            );
            history('/');
        }
        catch (err) { }
    };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {(isLoading) && (<LoadingSpinner asOverlay />)}
            <form className="case-form" onSubmit={caseSubmitHandler}>
                <Input
                    element="input"
                    type="text"
                    id="court"
                    label="Court name:"
                    errorText="Please Enter a valid court name, required* "
                    validators={[VALIDATOR_REQUIRE()]}
                    onInput={inputHandler}
                />
                <Input
                    element="textarea"
                    type="text"
                    id="description"
                    label="Case Description:"
                    errorText="Please Enter a short case description, atleast 10 words."
                    validators={[VALIDATOR_MINLENGTH(9)]}
                    onInput={inputHandler}
                />
                <Input
                    element="textarea"
                    type="text"
                    id="location_city"
                    label="Your Permanent Address:"
                    placeHolder="Enter Permanent Address Here."
                    errorText="This is a required field."
                    validators={[VALIDATOR_REQUIRE()]}
                    onInput={inputHandler}
                />
                <Input
                    element="input"
                    type="number"
                    id="location_pincode"
                    placeHolder="Enter Pincode here"
                    errorText="Required, Enter Atleast 6 numbers."
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
                    onInput={inputHandler}
                />
                <Input
                    element="input"
                    type="text"
                    id="judge"
                    label="Name of the Judge:"
                    errorText="Please Enter Valid Name. "
                    validators={[VALIDATOR_REQUIRE()]}
                    onInput={inputHandler}
                />
                <Button type="submit" disabled={!formState.isValid}>ADD CASE</Button>
            </form>
        </React.Fragment>
    );
}