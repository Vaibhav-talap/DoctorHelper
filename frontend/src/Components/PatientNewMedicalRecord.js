import React, { useState } from "react";
import PatientNewMedicalRecordClasses from './PatientNewMedicalRecord.module.css';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PatientNewMedicalRecord = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [diseaseType, setDiseaseType] = useState('');
    const [medicinerecommeded, setMedicinerecommeded] = useState('');
    const [Medicalrecorddate, setMedicalRecordDate] = useState(null);


    const medicalRecordDateHandler = (event) => {
        setMedicalRecordDate(event.target.value);
    }
    const medicalRecordDiseaseTypeHandler = (event) => {
        setDiseaseType(event.target.value);
    }
    const medicalRecordMedicineHandler = (event) => {
        setMedicinerecommeded(event.target.value);
    }

    const MedicalRecoedSubmitHandler = (event) => {
        event.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ date: Medicalrecorddate, diseasetype: diseaseType, recommededMedicine: medicinerecommeded, patient: id })
        };
        fetch('http://127.0.0.1:8000/clinic/medicalRecords/', requestOptions)
            .then(response => response.json())
            .then(data => navigate('/DoctorHome'));
    }



    return (
        <div className={PatientNewMedicalRecordClasses['outer-box']}>
            <div className={PatientNewMedicalRecordClasses['inner-box']}>
                <header className={PatientNewMedicalRecordClasses['signin-header']}>
                    <h1>Patient Registration</h1>
                </header>
                <main className={PatientNewMedicalRecordClasses['signin-body']}>
                    <form onSubmit={MedicalRecoedSubmitHandler}>
                        <div>
                            <label htmlFor="date">Date</label>
                            <input type="date" name="date" onChange={medicalRecordDateHandler} required />
                        </div>
                        <div>
                            <label htmlFor="diseaseType">Disease Type</label>
                            <input type="text" name="diseaseType" onChange={medicalRecordDiseaseTypeHandler} required />
                        </div>
                        <div>
                            <label htmlFor="medicines">Recommeded Medicine</label>
                            <input type="text" name="medicines" onChange={medicalRecordMedicineHandler} required />
                        </div>
                        <div>
                            <button type="submit">Submit</button>
                        </div>

                    </form>
                </main>
            </div>
        </div>
    )

}
export default PatientNewMedicalRecord;

