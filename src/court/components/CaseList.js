import React from "react";
import Card from "../../shared/UIelements/Card";
import CaseItem from "./CaseItem";

import './styles/CaseList.css';

export default function CaseList(props) {
    if (props.cases.length === 0) {
        return (
            <div className="case-list center" >
                <Card>
                    <h4>No Cases found ! Login for this Citizen, and Register one on New Case Tab. </h4>
                </Card>
            </div>
        );
    }
    return (
        <ul className="case-list">
            {props.cases.map(items => (
                <CaseItem
                    key={items.id}
                    id={items.id}
                    court={items.court}
                    description={items.description}
                    image={items.image}
                    judge={items.judge}
                    status={items.status}
                    nextDate={items.next_hearing}
                    toDelete={props.removeItem}
                    creatorID={props.plaintiffID}

                />
            ))}
        </ul>
    );
};