import React, { useState } from "react";
import displayPatientClasses from './DisplayPatient.module.css';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Displaypatient = () => {
    const [patientData, setPatientData] = useState([]);
    // const setPatientListdata = (list) => {
    //     { list.length != patientData.length && setPatientData(list) }
    //     console.log(patientData)
    // }


    useEffect(() => {
        console.log(1);
        fetch('http://127.0.0.1:8000/clinic/patients/').then(response => {
            return response.json();
        }).then(patientList => setPatientData(patientList));
    }, []);

    return (
        <div className={displayPatientClasses['container']}>
            <div className={displayPatientClasses['header']}>
                <h2>Patient List</h2>
            </div>
            <table className={displayPatientClasses['patienttable']}>
                <thead>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Age</th>
                    {/* <th>Actions</th> */}
                </thead>

                {

                    patientData.map((patient, index) => (
                        <tr key={index}>
                            <td>{patient.id}</td>
                            <td>{patient.first_name}</td>
                            <td>{patient.last_name}</td>
                            <td>{patient.email}</td>
                            <td>{patient.phone}</td>
                            <td>{patient.age}</td>
                            {/* <td>
                                <Link to={`/edit/${student.roll_no}`} className='btn btn-primary' style={{ color: "black" }}>Edit</Link>
                                <button className="btn btn-danger ms-2" style={{ color: "black" }} onClick={() => HandleDelete(student.roll_no)}>Delete</button>
                            </td> */}
                        </tr>
                    ))
                }

                <tbody>

                </tbody>

            </table>

        </div>

    );





}
export default Displaypatient;


