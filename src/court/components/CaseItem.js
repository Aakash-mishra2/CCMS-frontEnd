import React, { useContext, useState } from "react";
import Card from "../../shared/UIelements/Card";
import Button from "../../shared/formElements/Button";
import Modal from "../../shared/UIelements/Modal";
import { useHttpProcess } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/UIelements/ErrorModal";
import LoadingSpinner from "../../shared/UIelements/LoadingSpinner";
import { AuthContext } from "../../shared/context/authContext";

const ADMIN_ID = "648dc29c1a7197fd8ac31370";
export default function CaseItem(props) {
    const auth = useContext(AuthContext);
    const { isLoading, sendRequest, error, clearError } = useHttpProcess();
    const [isDescBox, setIsBox] = useState(false);
    const [confirmModal, setConfirmModal] = useState();
    const openDescBox = () => { setIsBox(true); }
    const closeDescBox = () => { setIsBox(false); }
    const openConfirmModal = () => { setConfirmModal(true); }
    const closeConfirmModal = () => { setConfirmModal(false); }

    const confirmDeleteCase = async () => {
        setConfirmModal(false);
        try {
            await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/admin/remove/${props.id}`,
                'DELETE',
            );
            props.toDelete(props.id);
        } catch (err) { }
    }

    return (
        <div>
            <React.Fragment>
                <ErrorModal error={error} clearError={clearError} />
                {isLoading && (<LoadingSpinner asOverlay />)}
                <Modal
                    show={isDescBox}
                    closeBox={closeDescBox}
                    header={`REGISTRATION - ID: ${props.id} --- Status: ${props.status}`}
                    footer={<Button onClick={closeDescBox} >CLOSE</Button>}
                    contentClass="case-item__modal-content"
                    footerClass="case-item__modal-actions"
                >
                    <h4> Description : {props.description}</h4>
                    <p> Next Hearing  : {props.nextDate} </p>
                    <p> Judge : {props.judge} </p>
                </Modal>
                <Modal
                    show={confirmModal}
                    closeBox={closeConfirmModal}
                    header={'WARNING'}
                    footer={<Button onClick={confirmDeleteCase}> DELETE </Button>}
                    contentClass="case-item__modal-content"
                    footerClass="case-item__modal-actions"
                >
                    <p>This action is not reversible. Are you sure want to delete this case forever? </p>
                </Modal>
                <li className="case-item">
                    <Card className="case-item__content">
                        <div className="case-item__image">
                            <img src={props.image} alt={props.court} />
                        </div>
                        <div className="case-item__info">
                            <h2>{props.court} </h2>
                            <h4>Next hearing {props.nextDate}</h4>
                        </div>
                        <div className="case-item__actions">

                            <Button onClick={openDescBox} >VIEW DESCRIPTION</Button>
                            {auth.loginId === ADMIN_ID && (<Button to={`/update/${props.id}`}>EDIT</Button>)}
                            {auth.loginId === ADMIN_ID && (<Button danger onClick={openConfirmModal}>DELETE</Button>)}
                        </div>
                    </Card>
                </li>
            </React.Fragment>
        </div>
    );
}