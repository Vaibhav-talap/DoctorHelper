import React from "react";
import ErrorModalClasses from './ErrorModal.module.css';


const ErrorModal = (props) => {
    return (
        <div>
            <div className={ErrorModalClasses['backdrop']} onClick={props.onClick}></div>
            <div className={ErrorModalClasses['modal']}>
                <header className={ErrorModalClasses['header']}>
                    <h3>Something Went Wrong...</h3>
                </header>
                <div className={ErrorModalClasses['content']}>
                    <p>{props.data}</p>
                </div>
                <footer className={ErrorModalClasses['actions']}>
                    <button onClick={props.onClick}>Okay</button>
                </footer>
            </div>
        </div>
    );
}
export default ErrorModal;