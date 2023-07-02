import React, { useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import searchResultListClasses from './SearchResultList.module.css';
import { useEffect } from "react";

const SearchResultList = (props) => {
    const { id } = useParams();
    const [doctorEmail, setDoctorEmail] = useState('');
    const navigate = useNavigate();
    return (
        <div className={searchResultListClasses['result-List']}>
            {
                props.results.map((result, id) => {
                    return <div className={searchResultListClasses['list-item']} key={id} onClick={(e) => { props.setDoctorEmail(result.email); props.setDoctorId(result.id) }}>{result.email}</div>
                })
            }
        </div>
    );

}
export default SearchResultList;