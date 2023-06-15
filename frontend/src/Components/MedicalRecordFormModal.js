import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MedicalRecordModalClasses from './MedicalRecordFormModal.module.css';
import JoditEditor from 'jodit-react';
import { useRef } from "react";


const MedicalRecordFormModal = (props) => {
    const id = props.patientId;
    // const name = props.disease
    const navigate = useNavigate();
    const recordId = props.record.id

    const [diseaseType, setDiseaseType] = useState(props.record.diseasetype);
    const [content, setContent] = useState(props.record.recommededMedicine);
    const [Medicalrecorddate, setMedicalRecordDate] = useState(props.record.date);


    const medicalRecordDateHandler = (event) => {
        setMedicalRecordDate(event.target.value);
    }
    const medicalRecordDiseaseTypeHandler = (event) => {
        console.log(event.target.value)
        setDiseaseType(event.target.value);
    }
    // const medicalRecordMedicineHandler = (event) => {
    //     setMedicinerecommeded(event.target.value);
    // }
    const editor = useRef(null);


    const MedicalRecoedSubmitHandler = (event) => {
        event.preventDefault();

        if (props.record.updateBool == true) {
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: recordId, date: Medicalrecorddate, diseasetype: diseaseType, recommededMedicine: content, patient: id })
            };
            fetch(`http://127.0.0.1:8000/clinic/medicalRecords/${props.record.id}/`, requestOptions)
                .then(response => response.json())
                .then(data => navigate(`/PatientMedicalRecords/${id}`));
            // updateRenderBool={setRenderBool} renderBoolValue = {renderBool}
        }
        else {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ date: Medicalrecorddate, diseasetype: diseaseType, recommededMedicine: content, patient: id })
            };
            fetch('http://127.0.0.1:8000/clinic/medicalRecords/', requestOptions)
                .then(response => response.json())
                .then(data => navigate(`/PatientMedicalRecords/${id}`));

        }

        props.updateRenderBool();
        props.onConfirm();
        // .then(data => navigate('/DoctorHome'));


    }

    return (
        <div>
            <div className={MedicalRecordModalClasses['backdrop']} onClick={props.onConfirm} />
            <div className={MedicalRecordModalClasses['inner-box']}>
                <header className={MedicalRecordModalClasses['signin-header']}>
                    <h1>New Medical Precscription</h1>
                </header>
                <main className={MedicalRecordModalClasses['signin-body']}>
                    <form onSubmit={MedicalRecoedSubmitHandler}>
                        <div>
                            <label htmlFor="date">Date</label>
                            <input type="date" name="date" value={Medicalrecorddate} onChange={medicalRecordDateHandler} required />
                        </div>
                        <div>
                            <label htmlFor="diseaseType">Disease Type</label>
                            <input type="text" name="diseaseType" value={diseaseType} onChange={medicalRecordDiseaseTypeHandler} required />
                        </div>
                        {/* <div>
                            <label htmlFor="medicines">Recommeded Medicine</label>
                            <input type="text" name="medicines" value={medicinerecommeded} onChange={medicalRecordMedicineHandler} required />
                        </div> */}

                        <div>
                            <label htmlFor="medicines">Recommeded Medicine</label>
                            <JoditEditor
                                ref={editor}
                                value={content}
                                onChange={newContent => setContent(newContent)}
                            />                        </div>
                        <div>
                            <button type="submit" className={MedicalRecordModalClasses['submitbutton']}>Submit</button>
                        </div>

                    </form>
                </main>
            </div>

        </div>
    );

}
export default MedicalRecordFormModal;