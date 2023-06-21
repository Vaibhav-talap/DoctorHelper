import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import showMedicinesModalClasses from './ShowMedicinesModal.module.css';
// import JoditEditor from 'jodit-react';
// import { useRef } from "react";


const ShowMedicinesModal = (props) => {
    const id = props.patientId;
    // const name = props.disease
    const navigate = useNavigate();
    const recordId = props.record.id

    const [diseaseType, setDiseaseType] = useState(props.record.diseasetype);
    const [content, setContent] = useState(props.record.recommededMedicine);
    const [Medicalrecorddate, setMedicalRecordDate] = useState(props.record.date);
    // const parser = new DOMParser();
    // const html = parser.parseFromString(content, 'text/html');
    // const body = html.body.children;



    const MedicalRecoedSubmitHandler = (event) => {
        event.preventDefault();

        props.onConfirm();
        // .then(data => navigate('/DoctorHome'));


    }

    return (
        <div>
            <div className={showMedicinesModalClasses['backdrop']} onClick={props.onConfirm} />
            <div className={showMedicinesModalClasses['inner-box']}>
                <header className={showMedicinesModalClasses['signin-header']}>
                    <h1> Medical Precscription</h1>
                </header>
                <main className={showMedicinesModalClasses['signin-body']}>
                    <h4>Type of disease</h4>
                    <h5>{diseaseType}</h5>
                    <h4>Recommeded Medicines</h4>
                    <h5 dangerouslySetInnerHTML={{ __html: content }}></h5>
                    <h4>Date </h4>
                    <h5>{Medicalrecorddate}</h5>

                    <div>
                        <button type="submit" onClick={MedicalRecoedSubmitHandler} className={showMedicinesModalClasses['submitbutton']}>OK</button>
                    </div>

                </main>
            </div>

        </div>
    );

}
export default ShowMedicinesModal;