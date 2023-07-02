import { render } from "@testing-library/react";
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import phomeclasses from './PatientHome.module.css';
import React, { useState } from "react";
import { useEffect } from "react";
import ShowMedicinesModal from "./ShowMedicinesModal";

const PatientHome = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [patientMedicalRecord, setPatientMedicalRecord] = useState([]);
    const [showRecordToggleModal, setShowRecordToggleModal] = useState(false);
    const [showingRecord, setShowingRecord] = useState({});

    let showRecord = {}

    const showMedicineFormHandler = (medicalRecordId) => {
        showRecord = patientMedicalRecord.find(record => record.id == medicalRecordId)
        setShowingRecord(showRecord)
        // console.log(beforeUpdateRecord)
        // name = beforeUpdateRecord.diseasetype
        setShowRecordToggleModal(!showRecordToggleModal)

    }



    const showModalDataHandler = () => {
        setShowRecordToggleModal(!showRecordToggleModal)
    }



    const sortbyDateandSetOrder = (patientMedicalRecoed) => {

        const sortedDesc = patientMedicalRecoed.sort(
            (objA, objB) => new Date(objB.date) - new Date(objA.date),
        );

        setPatientMedicalRecord(sortedDesc);
    }


    useEffect(() => {

        console.log(1);
        fetch(`http://127.0.0.1:8000/clinic/patientMedicalRecords/${id}`).then(response => {
            return response.json();
        }).then(patientMedicalRecoed => sortbyDateandSetOrder(patientMedicalRecoed));
    }, []);

    // I have to first fetch and load that medicalrecord data into one state and assign this state to another variable
    // and in dependency add that another variable.

    const [currentpage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const lastIndex = currentpage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    let i = firstIndex + 1;

    const patientMedicalRecoedSlice = patientMedicalRecord.slice(firstIndex, lastIndex);
    const noPages = Math.ceil(patientMedicalRecord.length / recordsPerPage)

    const numbers = [...Array(noPages + 1).keys()].slice(1);

    const nextPage = () => {
        if (currentpage !== noPages) {
            setCurrentPage(currentpage + 1)
        }

    }
    const changeCurrentPage = (id) => {
        setCurrentPage(id)

    }
    const prevPage = () => {

        if (currentpage !== 1) {
            setCurrentPage(currentpage - 1)
        }

    }







    // const [searchedEmail, setSearchedEmail] = useState('');
    // const searchedEmailHandler = (event) => {
    //     setSearchedEmail(event.target.value);
    // }
    // const doctorHomeSubmitHandler = (event) => {
    //     event.preventDefault();
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ email: searchedEmail })
    //     };
    //     fetch('http://127.0.0.1:8000/clinic/patientId/', requestOptions)
    //         .then(response => response.json())
    //         .then(id => navigate(`/PatientMedicalRecordList/${id}`));

    // }


    const logoutHandler = () => {
        localStorage.removeItem('token');
        navigate('/');
    }

    return (
        <div>
            <div className={`${phomeclasses['header']} ${phomeclasses['flex']}`}>

                <div className={phomeclasses['logo']} >
                    {/* <img src={doctorlogo} /> */}
                    <i class="fa-solid fa-stethoscope fa-2x"></i>
                    <h3>Doctor Helper</h3>
                </div>
                <div className={`${phomeclasses['nav-links']}`}>
                    <ul className={phomeclasses['flex']}>
                        {/* <li><Link to="/NewPatient" className={dhomeclasses['link']}>New Patient</Link></li> */}
                        <li><Link to={`/Appoinment/${id}`} className={phomeclasses['link']}>Book Appoinment</Link></li>
                        <li><button onClick={logoutHandler} className={phomeclasses['link']}>Logout</button></li>
                    </ul>
                </div>
            </div>

            <div className={phomeclasses['doctorHome-body']}>

                {/* <div className={phomeclasses['inner-box']}>
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
                    </div> */}

                <div>
                    {showRecordToggleModal && <ShowMedicinesModal onConfirm={showModalDataHandler} patientId={id} record={showingRecord} />}
                    {/* {toggleModal && <MedicalRecordFormModal onConfirm={modalFormhandler} patientId={id} updateRenderBool={changeListHandler} />} */}
                    {/* <div className={phomeclasses['container']}> */}
                    <div className={phomeclasses['header']}>
                        <h2>PatientMedicalRecord List</h2>
                        {/* <Link to={`/NewPatientMedicalRecord/${id}`} className={patientMedicalClasses['link']}>New Record</Link> */}
                    </div>
                    {
                        patientMedicalRecord.length === 0 ? <h3>No Previous data found</h3 > :
                            <><table className={phomeclasses['patienttable']}>
                                <thead>
                                    <th>ID</th>
                                    <th>Date</th>
                                    <th>Disease Type</th>
                                    <th>recommeded Medicine</th>
                                    {/* <th>patient ID</th> */}
                                    {/* <th>Actions</th> */}
                                </thead>{patientMedicalRecoedSlice.map((medicalRecoed, index) => (
                                    <tr key={index}>
                                        <td>{i++}</td>
                                        <td>{medicalRecoed.date}</td>
                                        <td>{medicalRecoed.diseasetype}</td>
                                        <td>
                                            <button className="btn btn-info" onClick={() => showMedicineFormHandler(medicalRecoed.id)}><i class="fa-solid fa-eye"></i>  Show Deatils</button>
                                        </td>
                                        {/* <td>{medicalRecoed.recommededMedicine}</td> */}
                                        {/* <td>{medicalRecoed.patient}</td> */}
                                        {/* <td>
    <Link to={`/edit/${student.roll_no}`} className='btn btn-primary' style={{ color: "black" }}>Edit</Link>
    <button className="btn btn-danger ms-2" style={{ color: "black" }} onClick={() => HandleDelete(student.roll_no)}>Delete</button>
</td> */}
                                    </tr>
                                ))}

                                <tbody>

                                </tbody>

                            </table>

                                {/* <div className={`${dhomeclasses['header']} ${dhomeclasses['flex']}`}> */}

                                <nav>
                                    <ul className={`pagination ${phomeclasses['navigationMenu']}`}>
                                        <li className="page-item">
                                            <a href="#" className="page-link" onClick={prevPage}>Prev</a>
                                        </li>
                                        {
                                            numbers.map((n, i) => (
                                                <li className={`page-item ${currentpage === n ? 'active' : ''}`} key={i}>
                                                    <a href="#" className="page-link" onClick={() => changeCurrentPage(n)} >{n}</a>
                                                </li>
                                            ))
                                        }
                                        <li className="page-item">
                                            <a href="#" className="page-link" onClick={nextPage}>Next</a>
                                        </li>
                                    </ul>
                                </nav>

                            </>
                    }

                </div>
            </div >


        </div>
        // </div >

    );
}
export default PatientHome;