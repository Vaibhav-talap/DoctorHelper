import React, { useState } from "react";
import newPatientClasses from './PatientSignup.module.css';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const PatientSignup = () => {
    const navigate = useNavigate();

    const [registerPatientFirstName, setRegisterPatientFirstName] = useState('');
    const [registerPatientLirstName, setRegisterPatientLirstName] = useState('');
    const [registerPatientEmail, setRegisterPatientEmail] = useState('');
    const [registerPatientPhone, setRegisterPatientPhone] = useState('');
    const [registerPatientage, setregisterPatientage] = useState(0);
    const [passwordType, setPasswordType] = useState("password");
    const [confirmpasswordType, setConfirmPasswordType] = useState("password");
    const [registerPatientPasswordInput, setRegisterPatientPasswordInput] = useState("");
    const [registerPatientConfirmpasswordInput, setRegisterPatientConfirmpasswordInput] = useState("");
    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }
    const toggleConfirmPassword = () => {
        if (confirmpasswordType === "password") {
            setConfirmPasswordType("text")
            return;
        }
        setConfirmPasswordType("password")
    }

    const handlePasswordChange = (evnt) => {
        setRegisterPatientPasswordInput(evnt.target.value);
    }
    const handleConfirmPasswordChange = (evnt) => {
        setRegisterPatientConfirmpasswordInput(evnt.target.value);
    }
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
    // const addPatientSubmitHandler = (event) => {
    //     event.preventDefault();

    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ first_name: registerPatientFirstName, last_name: registerPatientLirstName, email: registerPatientEmail, phone: registerPatientPhone, age: registerPatientage })
    //     };
    //     fetch('http://127.0.0.1:8000/clinic/patients/', requestOptions)
    //         .then(response => response.json())
    //         .then(data => navigate('/DoctorHome'));
    // }
    const patientSignupHandler = (event) => {
        event.preventDefault();
        let object = { first_name: registerPatientFirstName, last_name: registerPatientLirstName, email: registerPatientEmail, phone: registerPatientPhone, age: registerPatientage, password: registerPatientPasswordInput, confirm_password: registerPatientConfirmpasswordInput }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ first_name: registerPatientFirstName, last_name: registerPatientLirstName, email: registerPatientEmail, phone: registerPatientPhone, age: registerPatientage, password: registerPatientPasswordInput, confirm_password: registerPatientConfirmpasswordInput })
        };

        {
            (registerPatientConfirmpasswordInput === registerPatientPasswordInput) ? (
                fetch('http://127.0.0.1:8000/clinic/patients/', requestOptions)
                    .then(response => navigate('/doctorlogin'))) :
                // console.log(object) :
                console.log("password not match")
        }
    }



    return (
        <div className={newPatientClasses['outer-box']}>
            <div className={newPatientClasses['inner-box']}>
                <header className={newPatientClasses['signin-header']}>
                    <h1>Patient Registration</h1>
                </header>
                <main className={newPatientClasses['signin-body']}>
                    <form onSubmit={patientSignupHandler}>
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
                            <label for="password">Password</label>
                            <div className={newPatientClasses['passwordFlex']}>
                                <input type={passwordType} name="password" onChange={handlePasswordChange} className={newPatientClasses['passwordfield']}></input>
                                {passwordType === "password" ? <i class="fa-solid fa-eye-slash" onClick={togglePassword}></i> : <i class="fa-solid fa-eye" onClick={togglePassword} ></i>}
                            </div>
                        </div>
                        <div>
                            <label for="conpassword">Confirm Password</label>
                            <div className={newPatientClasses['passwordFlex']}>
                                <input type={confirmpasswordType} name="confirmPassword" onChange={handleConfirmPasswordChange} className={newPatientClasses['passwordfield']}></input>
                                {confirmpasswordType === "password" ? <i class="fa-solid fa-eye-slash" onClick={toggleConfirmPassword}></i> : <i class="fa-solid fa-eye" onClick={toggleConfirmPassword}></i>}
                            </div>
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
export default PatientSignup;