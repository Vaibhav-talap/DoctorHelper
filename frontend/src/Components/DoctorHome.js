import React, { useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import dhomeclasses from './DoctorHome.module.css';
import doctorlogo from '../imgs/logo.png';
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const DoctorHome = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    // const [searchedEmail, setSearchedEmail] = useState('');
    const [patientWaitingListData, setPatientWaitingListData] = useState([]);
    const [deleteBool, setDeleteBool] = useState(false);
    // const searchedEmailHandler = (event) => {
    //     setSearchedEmail(event.target.value);
    // }
    const logoutHandler = () => {
        localStorage.removeItem('token');
        navigate('/');
    }


    const [currentpage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const lastIndex = currentpage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    let i = firstIndex + 1;

    const patientWaitingListDataSlice = patientWaitingListData.slice(firstIndex, lastIndex);
    const noPages = Math.ceil(patientWaitingListData.length / recordsPerPage)

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


    // const doctorHomeSubmitHandler = (event) => {
    //     event.preventDefault();
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ email: searchedEmail })
    //     };
    //     fetch('http://127.0.0.1:8000/clinic/patientId/', requestOptions)
    //         .then(response => response.json())
    //         .then(id => navigate(`/PatientMedicalRecords/${id}`));

    // }
    const patientTreatHandler = (patientId) => {
        navigate(`/PatientMedicalRecords/${patientId}`)
    }
    const patientDeleteHandler = (patientWaitingListId) => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(`http://127.0.0.1:8000/clinic/patientWaitingList/${patientWaitingListId}`, requestOptions)
            .then(response => { setDeleteBool(!deleteBool) })
    }

    useEffect(() => {

        console.log(1);
        fetch(`http://127.0.0.1:8000/clinic/PatientWaitingListDoctorWise/${id}`).then(response => {
            return response.json();
        }).then(patientWaitingListData => setPatientWaitingListData(patientWaitingListData));
    }, [deleteBool]);

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
                        {/* <li><Link to="/NewPatient" className={dhomeclasses['link']}>New Patient</Link></li>
                        <li><Link to="/DisplayPatient" className={dhomeclasses['link']}>Patient List</Link></li> */}
                        <li><button onClick={logoutHandler} className={dhomeclasses['link']}>Logout</button></li>
                    </ul>
                </div>
            </div>

            <div className={dhomeclasses['doctorHome-body']}>
                <div className={dhomeclasses['list-header']}>
                    <h2>Patient Waiting List</h2>
                </div>

                {/* <div className={dhomeclasses['inner-box']}>
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
                </div> */}

                {
                    patientWaitingListData.length === 0 ? <h3>Currently No patients are in Waiting List</h3 > :
                        <><table className={dhomeclasses['patienttable']}>
                            <thead>
                                <th>Sr.No</th>
                                <th>Patient ID</th>
                                <th>Patient Email</th>
                                {/* <th>recommeded Medicine</th> */}
                                {/* <th>patient ID</th> */}
                                <th>Actions</th>
                            </thead>{patientWaitingListDataSlice.map((waitingListElement, index) => (
                                <tr key={index}>
                                    <td>{i++}</td>
                                    <td>{waitingListElement.patient}</td>
                                    <td>{waitingListElement.email}</td>
                                    {/* <td>{medicalRecoed.recommededMedicine}</td> */}
                                    <td><button className="btn btn-warning" onClick={() => patientTreatHandler(waitingListElement.patient)}><i class="fa-regular fa-pen-to-square"></i>Treat Patient</button>
                                        {/* <button className="btn btn-info" onClick={() => showMedicineFormHandler(medicalRecoed.id)}><i class="fa-solid fa-eye"></i>  Show Deatils</button> */}

                                        <button className="btn btn-danger" onClick={() => patientDeleteHandler(waitingListElement.id)}><i class="fa-solid fa-trash"></i>Remove Patient</button>
                                        {/* <button className="btn btn-info" onClick={() => showMedicineFormHandler(medicalRecoed.id)}><i class="fa-solid fa-eye"></i>  Show Deatils</button> */}
                                    </td>
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
                                <ul className={`pagination ${dhomeclasses['navigationMenu']}`}>
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

    );

}
export default DoctorHome;