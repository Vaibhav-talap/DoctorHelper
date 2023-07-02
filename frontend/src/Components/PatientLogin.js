import React, { useState } from "react";
import ploginclasses from './PatientLogin.module.css';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import ErrorModal from "./ErrorModal";

const PatientLogin = () => {

    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPasseord, setenteredPasseord] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState();
    var validatedData;
    const setvalidateedData = (data) => {
        { data.responseMessage === 'ok' && localStorage.setItem('token', data.access) }
        { data.responseMessage === 'ok' && navigate(`/PatientHome/${data.id}`) }
        { data.responseMessage != 'ok' && setError(data.responseMessage) }

    }

    const emailHandler = (event) => {
        setEnteredEmail(event.target.value);
    }
    const passwordHandler = (event) => {
        setenteredPasseord(event.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();

        console.log(enteredEmail, enteredPasseord);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: enteredEmail, password: enteredPasseord })
        };
        fetch('http://127.0.0.1:8000/clinic/patientValidate/', requestOptions)
            .then(response => response.json())
            .then(data => setvalidateedData(data));

        // console.log(validatedData);
        // { data == 'ok' ? navigate('/patient') : navigate('/doctorlogin') }
        // navigate('/')
    }

    const errorHandler = () => {
        setError(null);
    }




    return (
        <div>
            {error && <ErrorModal data={error} onClick={errorHandler} />}
            <div className={ploginclasses['outer-box']}>
                <div className={ploginclasses['inner-box']}>
                    <header className={ploginclasses['signin-header']}>
                        <h1>Sign-in</h1>
                    </header>
                    <main className={ploginclasses['signin-body']}>
                        <form onSubmit={submitHandler}>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" onChange={emailHandler} required />
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" onChange={passwordHandler} required />
                            </div>
                            <div>
                                <button type="submit">Sign In</button>
                            </div>

                        </form>
                    </main>
                    <footer className={ploginclasses['signup-footer']}>
                        <div>Dont't have an Account? <Link to="/patientSignup" className={ploginclasses['link']}>Sign-up</Link></div>
                    </footer>

                </div>
            </div>
        </div >
    );
}
export default PatientLogin;