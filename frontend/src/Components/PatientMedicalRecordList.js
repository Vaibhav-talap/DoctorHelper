import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import patientMedicalClasses from './PatientMedicalRecord.module.css';

const PatientMedicalRecordList = () => {
    const { id } = useParams();
    const [patientMedicalRecord, setPatientMedicalRecord] = useState([]);



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





    return (
        <div>
            {/* {toggleModal && <MedicalRecordFormModal onConfirm={modalFormhandler} patientId={id} updateRenderBool={changeListHandler} />} */}
            <div className={patientMedicalClasses['container']}>
                <div className={patientMedicalClasses['header']}>
                    <h2>PatientMedicalRecord List</h2>
                    {/* <Link to={`/NewPatientMedicalRecord/${id}`} className={patientMedicalClasses['link']}>New Record</Link> */}
                </div>
                {
                    patientMedicalRecord.length === 0 ? <h3>No Previous data found</h3 > :
                        <><table className={patientMedicalClasses['patienttable']}>
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
                                    <td>{medicalRecoed.recommededMedicine}</td>
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
                                <ul className={`pagination ${patientMedicalClasses['navigationMenu']}`}>
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
    )


    // useEffect(() => {
    //     console.log(1);
    //     fetch(`http://127.0.0.1:8000/clinic/medicalRecords/${id}`).then(response => {
    //         return response.json();
    //     }).then(patientMedicalRecoed => setPatientMedicalRecord(patientMedicalRecoed));
    // }, []);



    // return (
    //     <div>

    //         <div className={patientMedicalClasses['container']}>
    //             <div className={patientMedicalClasses['header']}>
    //                 <h2>PatientMedicalRecord List</h2>
    //                 {/* <Link to={`/NewPatientMedicalRecord/${id}`} className={patientMedicalClasses['link']}>New Record</Link> */}
    //             </div>
    //             {
    //                 patientMedicalRecord.length === 0 ? <h3>No Previous data found</h3 > :
    //                     < table className={patientMedicalClasses['patienttable']}>
    //                         <thead>
    //                             <th>ID</th>
    //                             <th>Date</th>
    //                             <th>Disease Type</th>
    //                             <th>recommeded Medicine</th>
    //                             {/* <th>patient ID</th> */}
    //                             {/* <th>Actions</th> */}
    //                         </thead>{

    //                             patientMedicalRecord.map((medicalRecoed, index) => (
    //                                 <tr key={index}>
    //                                     <td>{medicalRecoed.id}</td>
    //                                     <td>{medicalRecoed.date}</td>
    //                                     <td>{medicalRecoed.diseasetype}</td>
    //                                     <td>{medicalRecoed.recommededMedicine}</td>
    //                                     {/* <td>{medicalRecoed.patient}</td> */}
    //                                     {/* <td>
    //                             <Link to={`/edit/${student.roll_no}`} className='btn btn-primary' style={{ color: "black" }}>Edit</Link>
    //                             <button className="btn btn-danger ms-2" style={{ color: "black" }} onClick={() => HandleDelete(student.roll_no)}>Delete</button>
    //                         </td> */}
    //                                 </tr>
    //                             ))
    //                         }

    //                         <tbody>

    //                         </tbody>

    //                     </table>}

    //         </div>
    //     </div >
    // )

    // const [patientData, setPatientData] = useState([]);
    // // const setPatientListdata = (list) => {
    // //     { list.length != patientData.length && setPatientData(list) }
    // //     console.log(patientData)
    // // }

    // useEffect(() => {
    //     console.log(1);
    //     fetch('http://127.0.0.1:8000/clinic/patients/').then(response => {
    //         return response.json();
    //     }).then(patientList => setPatientData(patientList));
    // }, [patientData]);

    // return (
    //     <div className={displayPatientClasses['container']}>
    //         <div className={displayPatientClasses['header']}>
    //             <h2>Patient List</h2>
    //         </div>
    //         <table className={displayPatientClasses['patienttable']}>
    //             <thead>
    //                 <th>ID</th>
    //                 <th>First Name</th>
    //                 <th>Last Name</th>
    //                 <th>Email</th>
    //                 <th>Phone</th>
    //                 <th>Age</th>
    //                 {/* <th>Actions</th> */}
    //             </thead>

    //             {

    //                 patientData.map((patient, index) => (
    //                     <tr key={index}>
    //                         <td>{patient.id}</td>
    //                         <td>{patient.first_name}</td>
    //                         <td>{patient.last_name}</td>
    //                         <td>{patient.email}</td>
    //                         <td>{patient.phone}</td>
    //                         <td>{patient.age}</td>
    //                         {/* <td>
    //                             <Link to={`/edit/${student.roll_no}`} className='btn btn-primary' style={{ color: "black" }}>Edit</Link>
    //                             <button className="btn btn-danger ms-2" style={{ color: "black" }} onClick={() => HandleDelete(student.roll_no)}>Delete</button>
    //                         </td> */}
    //                     </tr>
    //                 ))
    //             }

    //             <tbody>

    //             </tbody>

    //         </table>

    //     </div>

    // );






}
export default PatientMedicalRecordList;