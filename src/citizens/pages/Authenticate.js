import React, { useContext, useState } from "react";
import Button from "../../shared/formElements/Button";
import Input from "../../shared/formElements/Input";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import Card from "../../shared/UIelements/Card";
import { AuthContext } from "../../shared/context/authContext";
import './Authenticate.css';
import ErrorModal from "../../shared/UIelements/ErrorModal";
import { useHttpProcess } from "../../shared/hooks/http-hook";

export default function Authenticate() {

    const auth = useContext(AuthContext);
    const [isLogin, setIsLogin] = useState(true);
    const { isLoading, error, sendRequest, clearError } = useHttpProcess();

    const [formState, inputHandler, setFormData] = useForm({
        email: { value: '', isValid: false },
        password: { value: '', isValid: false }
    }, false);

    const switchModeHandler = () => {
        if (!isLogin) {
            setFormData(
                {
                    ...formState.inputs,
                    name: undefined,
                    idCardNo: undefined
                },
                false
            )
        } else {
            setFormData(
                {
                    ...formState.inputs,
                    name: {
                        value: ' ',
                        isValid: false
                    },
                    idCardNo: {
                        value: ' ',
                        isValid: false
                    }
                },
                false
            );
        }
        setIsLogin(prevMode => !prevMode);
    };

    const userSubmitHandler = async (event) => {
        event.preventDefault();
        if (isLogin) {
            try {
                const responseData = await sendRequest(
                    'http://localhost:5000/ccms/public/login',
                    'POST',
                    JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    }),
                    { 'Content-type': 'application/json' }
                );
                console.log("login rq sent.")
                auth.login(responseData.citizen.id);
            } catch (err) { //no need 
            }
        }
        else {
            try {
                const responseData = await sendRequest(
                    'http://localhost:5000/ccms/public/signup',
                    "POST",
                    JSON.stringify({
                        name: formState.inputs.name.value,
                        email: formState.inpurts.email.value,
                        password: formState.inputs.password.value,
                        idCardNo: formState.inputs.idCardNo.value
                    }),
                    { 'Content-type': 'application/json' }
                );
                auth.login(responseData.added.id);
                console.log("signup, req sent.");
                console.log(responseData.added);
            } catch (error) { }
        }
    };


    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {(isLoading) && (
                < div className="center">
                    <h2>Loading...</h2>
                </div>
            )}
            <Card className="authentication">
                <form onSubmit={userSubmitHandler}>
                    {!isLogin && <Input
                        type="text"
                        element="input"
                        id="name"
                        label=" Name: "
                        errorText="Please enter valid Name. "
                        validators={[VALIDATOR_REQUIRE()]}
                        onInput={inputHandler}
                    />}
                    <Input
                        type="text"
                        element="input"
                        id="email"
                        label=" Your Email: "
                        errorText="Please enter a valid E-Mail input. "
                        validators={[VALIDATOR_EMAIL()]}
                        onInput={inputHandler}
                    />
                    {!isLogin && <Input
                        type="text"
                        element="idCardNo"
                        id="number"
                        label=" Your Aadhar Number/VoterID Number :"
                        errorText="Enter a valid number of 12 digits"
                        validators={[VALIDATOR_MINLENGTH(12)]}
                        onInput={inputHandler}
                    />}
                    <Input
                        type="text"
                        element="input"
                        id="password"
                        label=" Your Password: "
                        errorText="Enter a valid Password of 10 digits or more."
                        validators={[VALIDATOR_MINLENGTH(10)]}
                        onInput={inputHandler}
                    />

                    <Button type="submit" disabled={!formState.isValid}>{isLogin ? 'LOGIN' : 'SIGNUP'}</Button>
                </form>
                <hr />
                <Button inverse onClick={switchModeHandler}>Switch to {isLogin ? 'SIGNUP' : 'LOGIN'}</Button>
            </Card>
        </React.Fragment >
    );
}
