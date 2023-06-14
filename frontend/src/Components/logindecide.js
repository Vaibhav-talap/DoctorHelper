import React from "react";
import classes from './logindecide.module.css';
import { Link } from 'react-router-dom';

const LoginDecide = () => {
    return (
        <div>
            <div className={classes["top-banner"]}>
                <div className={classes["container"]}>
                    <div className={`${classes['small-bold-text']} ${classes['banner-text']}`}>📣 Welcome to Persistent Doctor Helper POC →</div>
                </div>
            </div>
            <div className={classes["login-decide"]}>
                <div className={`${classes['container']} ${classes['login-decidebody']} ${classes['flex']}`}>
                    <Link to="/doctorlogin" className={classes["loginselect-button"]}>Doctor Login</Link>
                    <Link to="/patient" className={classes["loginselect-button"]}>Patient Login</Link>
                </div>

            </div>
        </div>
    );
}

export default LoginDecide;