import React, { useContext, useState } from "react";
import Button from "../../shared/formElements/Button";
import Input from "../../shared/formElements/Input";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import Card from "../../shared/UIelements/Card";
import { AuthContext } from "../../shared/context/authContext";
import './Authenticate.css';

export default function Authenticate() {

    const auth = useContext(AuthContext);

    const [isLogin, setIsLogin] = useState(true);
    const [formState, inputHandler, setFormData] = useForm({
        email: { value: '', isValid: false },
        password: { value: '', isValid: false }
    }, false);

    function switchModeHandler() {
        if (!isLogin) {
            setFormData(
                {
                    ...formState.inputs,
                    name: undefined
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
                    }
                },
                false
            );
        }
        setIsLogin(prevMode => !prevMode);
    };

    function userSubmitHandler(event) {
        console.log(formState.inputs);
        auth.login();
        event.preventDefault();
    };
    return (
        <React.Fragment>
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
                    <Input
                        type="text"
                        element="input"
                        id="password"
                        label=" Your Password: "
                        errorText="Enter a valid Password of 10 digits or more."
                        validators={[VALIDATOR_MINLENGTH(10)]}
                        onInput={inputHandler} l
                    />
                    <Button type="submit" disabled={!formState.isValid}>{isLogin ? 'LOGIN' : 'SIGNUP'}</Button>
                </form>
                <hr />
                <Button inverse onClick={switchModeHandler}>Switch to {isLogin ? 'SIGNUP' : 'LOGIN'}</Button>
            </Card>
        </React.Fragment>
    );
}
