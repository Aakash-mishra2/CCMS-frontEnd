import React from "react";
import Card from "../../shared/UIelements/Card";
import CaseItem from "./CaseItem";

import './styles/CaseList.css';

export default function CaseList(props) {
    if (props.cases.length === 0) {
        return (
            <div className="case-list center" >
                <Card>
                    <p>No projects found ! Maybe create one. </p>
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
                    image={items.imageUrl}
                    judge={items.judge}
                    status={items.status}
                    nextDate={items.nextHearing}
                    toDelete={items.removeItem}
                />
            ))}
        </ul>
    );
};