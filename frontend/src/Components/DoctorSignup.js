import React, { useState } from "react";
import doctorSignupClasses from './DoctorSignup.module.css';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const DoctorSignup = () => {
    const navigate = useNavigate();

    const [registerDoctorFirstName, setRegisterDoctorFirstName] = useState('');
    const [registerDoctorLirstName, setRegisterDoctorLirstName] = useState('');
    const [registerDoctorEmail, setRegisterDoctorEmail] = useState('');
    const [registerDoctorPhone, setRegisterDoctorPhone] = useState('');
    const [registerDoctorage, setregisterDoctorage] = useState(0);

    const [passwordType, setPasswordType] = useState("password");
    const [confirmpasswordType, setConfirmPasswordType] = useState("password");
    const [registerDoctorPasswordInput, setRegisterDoctorPasswordInput] = useState("");
    const [registerDoctorConfirmpasswordInput, setRegisterDoctorConfirmpasswordInput] = useState("");

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
    const addDoctorFirstNameHandler = (event) => {
        setRegisterDoctorFirstName(event.target.value);
    }


    const addDoctorLastNameHandler = (event) => {
        setRegisterDoctorLirstName(event.target.value);
    }
    const addDoctorEmailHandler = (event) => {
        setRegisterDoctorEmail(event.target.value);
    }
    const addDoctorPhoneHandler = (event) => {
        setRegisterDoctorPhone(event.target.value);
    }
    const addDoctorAgeHandler = (event) => {
        setregisterDoctorage(event.target.value);
    }
    const handlePasswordChange = (evnt) => {
        setRegisterDoctorPasswordInput(evnt.target.value);
    }
    const handleConfirmPasswordChange = (evnt) => {
        setRegisterDoctorConfirmpasswordInput(evnt.target.value);
    }
    const doctorSignupHandler = (event) => {
        event.preventDefault();
        let object = { first_name: registerDoctorFirstName, last_name: registerDoctorLirstName, email: registerDoctorEmail, phone: registerDoctorPhone, age: registerDoctorage, password: registerDoctorPasswordInput, confirm_password: registerDoctorConfirmpasswordInput }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ first_name: registerDoctorFirstName, last_name: registerDoctorLirstName, email: registerDoctorEmail, phone: registerDoctorPhone, age: registerDoctorage, password: registerDoctorPasswordInput, confirm_password: registerDoctorConfirmpasswordInput })
        };

        {
            (registerDoctorConfirmpasswordInput === registerDoctorPasswordInput) ? (
                fetch('http://127.0.0.1:8000/clinic/doctorRegistration/', requestOptions)
                    .then(response => navigate('/doctorlogin'))) :
                // console.log(object) :
                console.log("password not match")
        }
    }



    return (
        <div className={doctorSignupClasses['outer-box']}>
            <div className={doctorSignupClasses['inner-box']}>
                <header className={doctorSignupClasses['signin-header']}>
                    <h1>Doctor Registration</h1>
                </header>
                <main className={doctorSignupClasses['signin-body']}>
                    <form onSubmit={doctorSignupHandler}>
                        <div>
                            <label htmlFor="first_name">First Name</label>
                            <input type="text" name="first_name" onChange={addDoctorFirstNameHandler} required />
                        </div>
                        <div>
                            <label htmlFor="last_name">Last Name</label>
                            <input type="text" name="last_name" onChange={addDoctorLastNameHandler} required />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" onChange={addDoctorEmailHandler} required />
                        </div>
                        <div>
                            <label htmlFor="phone">Phone</label>
                            <input type="text" name="phone" onChange={addDoctorPhoneHandler} required />
                        </div>
                        <div>
                            <label htmlFor="age">Age</label>
                            <input type="number" name="age" onChange={addDoctorAgeHandler} required />
                        </div>
                        <div>
                            <label for="password">Password</label>
                            <div className={doctorSignupClasses['passwordFlex']}>
                                <input type={passwordType} name="password" onChange={handlePasswordChange} className={doctorSignupClasses['passwordfield']}></input>
                                {passwordType === "password" ? <i class="fa-solid fa-eye-slash" onClick={togglePassword}></i> : <i class="fa-solid fa-eye" onClick={togglePassword} ></i>}
                            </div>
                        </div>
                        <div>
                            <label for="conpassword">Confirm Password</label>
                            <div className={doctorSignupClasses['passwordFlex']}>
                                <input type={confirmpasswordType} name="confirmPassword" onChange={handleConfirmPasswordChange} className={doctorSignupClasses['passwordfield']}></input>
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
export default DoctorSignup;