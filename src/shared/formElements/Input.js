import React, { useEffect, useReducer } from "react";
import { validate } from "../util/validators";
import './Input.css';

function caseReducer(state, action) {
    switch (action.type) {
        case 'ALTER':
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            };
        case 'TOUCH':
            return {
                ...state,
                isTouched: true
            };
        default:
            return state;
    }
};

export default function Input(props) {

    const [inputState, dispatch] = useReducer(caseReducer, {
        isValid: props.initialValid || false,
        value: props.initialValue || '',
        isTouched: false
    })

    function changeHandler(event) {
        dispatch({
            type: 'ALTER',
            val: event.target.value,
            validators: props.validators
        });
    };

    function touchHandler(event) {
        dispatch({
            type: 'TOUCH',
        })
    }
    const { id, onInput } = props;
    const { isValid, value } = inputState;

    //useEffect(() = > {trigger this action - function  },[when these things change - dependencies])
    useEffect(() => {
        onInput(id, value, isValid)
    }, [id, isValid, value, onInput])

    const element =
        props.element === "input" ? (
            <input
                type={props.type}
                placeholder={props.placeHolder}
                id={props.id}
                onChange={changeHandler}
                onBlur={touchHandler}
                value={inputState.value}
            />
        ) :
            (
                <textarea
                    type={props.type}
                    placeholder={props.placeHolder}
                    id={props.id}
                    rows={props.rows || 3}
                    onChange={changeHandler}
                    onBlur={touchHandler}
                    value={inputState.value}
                />
            );

    return (
        <div
            className={`form-control ${!inputState.isValid && inputState.isTouched &&
                'form-control--invalid'}`}
        >
            <label htmlFor={props.id}>{props.label}</label>
            {element}
            {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
        </div>
    )
}