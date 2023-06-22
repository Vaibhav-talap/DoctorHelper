import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import dhomeclasses from './DoctorHome.module.css';
import doctorlogo from '../imgs/logo.png';

const DoctorHome = () => {

    const navigate = useNavigate();
    const [searchedEmail, setSearchedEmail] = useState('');
    const searchedEmailHandler = (event) => {
        setSearchedEmail(event.target.value);
    }
    const logoutHandler = () => {
        localStorage.removeItem('token');
        navigate('/');
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
            .then(id => navigate(`/PatientMedicalRecords/${id}`));

    }

    return (
        <div>

            <div className={`${dhomeclasses['header']} ${dhomeclasses['flex']}`}>
                <div className={dhomeclasses['logo']} >
                    {/* <img src={doctorlogo} /> */}
                    <i class="fa-solid fa-stethoscope fa-2x"></i>
                    <h3>Doctor Helper</h3>
                </div>
                <div className={`${dhomeclasses['nav-links']}`}>
                    <ul className={dhomeclasses['flex']}>
                        <li><Link to="/NewPatient" className={dhomeclasses['link']}>New Patient</Link></li>
                        <li><Link to="/DisplayPatient" className={dhomeclasses['link']}>Patient List</Link></li>
                        <li><button onClick={logoutHandler} className={dhomeclasses['link']}>Logout</button></li>
                    </ul>
                </div>
            </div>

            <div className={dhomeclasses['doctorHome-body']}>

                <div className={dhomeclasses['inner-box']}>
                    <main className={dhomeclasses['search-body']}>
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
        </div >

    );

}
export default DoctorHome;