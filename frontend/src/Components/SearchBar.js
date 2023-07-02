import React, { useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import searchBarClasses from './SearchBar.module.css';
import SearchResultList from "./SearchResultList";
import { useEffect } from "react";

const SearchBar = (props) => {
    const { id } = useParams();
    const [doctorEmail, setDoctorEmail] = useState(props.doctorEmail);
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    const fetchDoctorData = (value) => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            // body: JSON.stringify({ email: doctorEmail })
        };
        fetch('http://127.0.0.1:8000/clinic/doctors/', requestOptions)
            .then(response => response.json())
            .then((data) => {
                const result = data.filter((doctor) => {
                    return value && doctor && doctor.email && doctor.email.toLowerCase().includes(value);
                });
                // props.setSearchResults(result)
                setResults(result);
            });

    }

    const handleEmailInputChange = (value) => {
        setDoctorEmail(value);
        fetchDoctorData(value)
    }

    return (
        <div>
            <div className={searchBarClasses['input-wrapper']}>
                <i class="fa-solid fa-magnifying-glass" id="search-icon"></i>
                <input placeholder="Search doctor here.." value={doctorEmail} onChange={(e) => handleEmailInputChange(e.target.value)}></input>
            </div>
            <SearchResultList results={results} setDoctorEmail={setDoctorEmail} setDoctorId={props.setDoctorId} />

        </div>
    );

}
export default SearchBar;