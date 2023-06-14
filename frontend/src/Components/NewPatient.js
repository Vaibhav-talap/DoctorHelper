import React, { useState } from "react";
import newPatientClasses from './NewPatient.module.css';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const NewPatient = () => {
    const navigate = useNavigate();

    const [registerPatientFirstName, setRegisterPatientFirstName] = useState('');
    const [registerPatientLirstName, setRegisterPatientLirstName] = useState('');
    const [registerPatientEmail, setRegisterPatientEmail] = useState('');
    const [registerPatientPhone, setRegisterPatientPhone] = useState('');
    const [registerPatientage, setregisterPatientage] = useState(0);

    const addPatientFirstNameHandler = (event) => {
        setRegisterPatientFirstName(event.target.value);
    }
    const addPatientLastNameHandler = (event) => {
        setRegisterPatientLirstName(event.target.value);
    }
    const addPatientEmailHandler = (event) => {
        setRegisterPatientEmail(event.target.value);
    }
    const addPatientPhoneHandler = (event) => {
        setRegisterPatientPhone(event.target.value);
    }
    const addPatientAgeHandler = (event) => {
        setregisterPatientage(event.target.value);
    }
    const addPatientSubmitHandler = (event) => {
        event.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ first_name: registerPatientFirstName, last_name: registerPatientLirstName, email: registerPatientEmail, phone: registerPatientPhone, age: registerPatientage })
        };
        fetch('http://127.0.0.1:8000/clinic/patients/', requestOptions)
            .then(response => response.json())
            .then(data => navigate('/DoctorHome'));
    }



    return (
        <div className={newPatientClasses['outer-box']}>
            <div className={newPatientClasses['inner-box']}>
                <header className={newPatientClasses['signin-header']}>
                    <h1>Patient Registration</h1>
                </header>
                <main className={newPatientClasses['signin-body']}>
                    <form onSubmit={addPatientSubmitHandler}>
                        <div>
                            <label htmlFor="first_name">First Name</label>
                            <input type="text" name="first_name" onChange={addPatientFirstNameHandler} required />
                        </div>
                        <div>
                            <label htmlFor="last_name">Last Name</label>
                            <input type="text" name="last_name" onChange={addPatientLastNameHandler} required />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" onChange={addPatientEmailHandler} required />
                        </div>
                        <div>
                            <label htmlFor="phone">Phone</label>
                            <input type="text" name="phone" onChange={addPatientPhoneHandler} required />
                        </div>
                        <div>
                            <label htmlFor="age">Age</label>
                            <input type="number" name="age" onChange={addPatientAgeHandler} required />
                        </div>
                        <div>
                            <button type="submit">Register</button>
                        </div>

                    </form>
                </main>
            </div>
        </div>
    );

}
export default NewPatient;