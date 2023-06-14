import { render } from "@testing-library/react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import phomeclasses from './PatientHome.module.css';
import React, { useState } from "react";

const PatientHome = () => {
    const navigate = useNavigate();
    const [searchedEmail, setSearchedEmail] = useState('');
    const searchedEmailHandler = (event) => {
        setSearchedEmail(event.target.value);
    }
    const doctorHomeSubmitHandler = (event) => {
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: searchedEmail })
        };
        fetch('http://127.0.0.1:8000/clinic/patientId/', requestOptions)
            .then(response => response.json())
            .then(id => navigate(`/PatientMedicalRecordList/${id}`));

    }

    return (
        <div>
            <div className={`${phomeclasses['header']} ${phomeclasses['flex']}`}>

                <div className={phomeclasses['doctorHome-body']}>

                    <div className={phomeclasses['inner-box']}>
                        <main className={phomeclasses['search-body']}>
                            <form onSubmit={doctorHomeSubmitHandler}>
                                <div>
                                    <label htmlFor="email">Patient Email</label>
                                    <input type="email" name="email" onChange={searchedEmailHandler} required />
                                </div>
                                <div>
                                    <button type="submit">Search</button>
                                </div>

                            </form>
                        </main>
                    </div>
                </div>
            </div>
        </div>

    );
}
export default PatientHome;