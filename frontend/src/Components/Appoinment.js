import React, { useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import appoinmentClasses from './Appoinment.module.css';
import SearchBar from "./SearchBar";
import SearchResultList from "./SearchResultList";
import { useEffect } from "react";

const Appoinment = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [searchResults, setSearchResults] = useState([]);
    const [doctorEmail, setDoctorEmail] = useState('');
    const [doctorId, setDoctorId] = useState(0);
    console.log(doctorEmail);

    const handler = () => {
        console.log(doctorId)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ patient_id: id, doctor_id: doctorId })
        };
        fetch('http://127.0.0.1:8000/clinic/patientWaitingList/', requestOptions)
            .then(response => response.json())
            .then(data => {

                { data['ResponseMessage'] && alert('You have already book appoinment with this doctor'); }
                { data['id'] && alert('Your appoinment have booked successfully') }
                navigate(`/PatientHome/${id}`)
            });
    }

    return (
        <div>
            <div className={appoinmentClasses['outer-box']}>
                <div className={appoinmentClasses['search-bar-container']}>
                    <SearchBar setSearchResults={setSearchResults} doctorEmail={doctorEmail} setDoctorId={setDoctorId} />
                    {/* <SearchResultList results={searchResults} setDoctorId={setDoctorId} setDoctorEmail={setDoctorEmail} /> */}
                    <button onClick={handler} className={appoinmentClasses['book-button']}>Book</button>
                </div>
            </div>
        </div>

    );

}
export default Appoinment;