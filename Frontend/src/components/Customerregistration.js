import React, { useState } from "react";
import { Nav } from 'react-bootstrap'
import {
    Link
} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'
import CustomerregistrationAPI from "../services/CustomerregistrationAPI";
import BackButton from "./BackButton";


const Customerregistration = () => {

    const [userdetails, setUserdetails] = useState({
        email: '',
        confirmPassword: '',
        password: '',
        fname: '',
        lname: '',
        address: '',
        contactno: ''
    });
    const [message, setMessage] = useState('');

    const onChange = event => {
        setUserdetails({
            ...userdetails,
            [event.target.name]: event.target.value
        });
    };

    const validatePassword = () => {
        let password = document.getElementById("pwd").value;
        var regexPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z]).{5,}$/;;

        if (regexPassword.test(password) === true) {
            document.getElementById("passwordVr").innerHTML = "";
        } else {
            document.getElementById("passwordVr").innerHTML = "password must be alphanumeric and should contains at least a special character with length 5"
        }

    }

    const validateEmail = () => {
        let email = document.getElementById("email").value;
        var regexEmail = /\S+@\S+\.\S+/;
        if (regexEmail.test(email) === true) {
            document.getElementById("emailVr").innerHTML = "";
        } else {
            document.getElementById("emailVr").innerHTML = "email format should be 'abc@gmail.com'"

        }

    }
    const removeWarnings = () => {
        document.getElementById("passwordVr").innerHTML = "";
        document.getElementById("emailVr").innerHTML = "";
        document.getElementById("mobileNumberVr").innerHTML = "";

    }

    const validateMobileNumber = () => {
        let number = document.getElementById('mobileNumber').value;
        if (/^\d{10}$/.test(number)) {
            document.getElementById("mobileNumberVr").innerHTML = "";

        } else {
            document.getElementById("mobileNumberVr").innerHTML = "Phone number must be 10 digits.";

            return false
        }
    }

    const customerreg = e => {

        e.preventDefault();
        let user = {
            email: userdetails.email,
            password: userdetails.password,
            fname: userdetails.fname,
            lname: userdetails.lname,
            address: userdetails.address,
            contactno: userdetails.contactno
        };

        var regexEmail = /\S+@\S+\.\S+/;
        if (userdetails.email === '' || regexEmail.test(userdetails.email) !== true) {
            toast.error("Please enter valid email", { autoClose: 2000, position: toast.POSITION.TOP_RIGHT })
            document.getElementById("emailVr").innerHTML = "email format should be 'abc@gmail.com'"
            return false;
        }
        var regexPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z]).{5,}$/;;
        if (userdetails.password === '' || regexPassword.test(userdetails.password) !== true) {
            toast.error("Please enter valid password", { autoClose: 2000, position: toast.POSITION.TOP_RIGHT })
            document.getElementById("passwordVr").innerHTML = "password must be alphanumeric and should contains at least a special character with length 5";
            return false;
        }
        if (userdetails.password !== userdetails.confirmPassword) {
            toast.error("Password mismatch", { autoClose: 2000, position: toast.POSITION.TOP_RIGHT })
            return false;
        }
        if (userdetails.fname === '') {
            toast.error("Please enter first name", { autoClose: 2000, position: toast.POSITION.TOP_RIGHT })
            return false;
        }
        if (userdetails.lname === '') {
            toast.error("Please enter last name", { autoClose: 2000, position: toast.POSITION.TOP_RIGHT })
            return false;
        }
        if (userdetails.address === '') {
            toast.error("Please enter address", { autoClose: 2000, position: toast.POSITION.TOP_RIGHT })
            return false;
        }
        if (userdetails.contactno === '' || userdetails.contactno.length !== 10) {
            toast.error("Please enter valid contact number", { autoClose: 2000, position: toast.POSITION.TOP_RIGHT })
            document.getElementById("mobileNumberVr").innerHTML = "Phone number must be 10 digits.";
            return false;
        }
        // if (this.state.contactno.length !== 10) {
        //     toast.error("Please enter valid contact number", { autoClose: 2000, position: toast.POSITION.TOP_RIGHT })
        //     return false;
        // }

        CustomerregistrationAPI.custreg(user).then(() => {
            setUserdetails({
                ...userdetails,
                //message: 'registration successful.',

                email: '',
                password: '',
                confirmPassword: '',
                fname: '',
                lname: '',
                address: '',
                contactno: ''
            });
            setMessage('Registration successful.');
            console.log(user);
            toast.success('Registration successful.');

        }).catch(error => {
            setMessage('Registration failed.');
            toast.error('Registration failed.', { autoClose: 2000, position: toast.POSITION.TOP_RIGHT });
            //err.response.data => DTO on the server side : ErrorResponse
            console.log(error);
        });
    }

    return (
        <div>
            <div className="container overflow-hidden mb-2" style={{ minHeight: "100vh" }}>
                <div className="row mt-3">
                    <div className="col-sm-8">
                    </div>
                    <div className="col-sm-4">
                        <BackButton />
                    </div>
                </div>
                <form className="container rounded bg-light px-3 py-2 mb-5" style={{ width: "80vh" }}>
                    <h3 className="mt-2 ">Sign Up</h3><hr></hr>
                    <div className="form-group">
                        <div>
                            <input type="email" id="email" className="form-control" placeholder="Enter Email Address" name="email" value={userdetails.email} onChange={onChange} onFocus={removeWarnings} onBlur={validateEmail} /><span style={{ color: 'red' }} id='emailVr'></span>
                        </div>
                    </div>
                    <div className="form-group  pt-2 row">
                        <div className="col">
                            <input type="text" id="firstName" className="form-control" placeholder="Enter your first name" name="fname" value={userdetails.fname} onChange={onChange} required />
                        </div>

                        <div className="col">
                            <input type="text" id="lastName" className="form-control" placeholder="Enter your last name" name="lname" value={userdetails.lname} onChange={onChange} required />
                        </div>
                    </div>



                    <div className="form-group pt-2">
                        <div>
                            <input type="number" id="mobileNumber" className="form-control" placeholder="Enter your contact number" name="contactno" value={userdetails.contactno} onChange={onChange} pattern="[0-9]{10}" onBlur={validateMobileNumber} onFocus={removeWarnings} required /><span id='mobileNumberVr' style={{ color: 'red' }}></span>
                        </div>
                    </div>
                    <div className="form-group pt-2">
                        <div>
                            <input type="text" className="form-control" placeholder="Enter your address " name="address" value={userdetails.address} onChange={onChange} required />
                        </div>
                    </div>
                    <div className="form-group pt-2">
                        <div>
                            <input type="password" id="pwd" className="form-control" placeholder="Enter Password" name="password" value={userdetails.password} onChange={onChange} onBlur={validatePassword} onFocus={removeWarnings} /><span style={{ color: 'red' }} id='passwordVr'></span>

                        </div>
                    </div>
                    <div className="form-group pt-2">
                        <div>
                            <input type="password" className="form-control" placeholder="Confirm Password" name="confirmPassword" value={userdetails.confirmPassword} onChange={onChange} required />

                        </div>
                    </div>
                    <div className="form-group py-2">
                        <h4 className="display-flex">{message}</h4>
                        <div >
                            <button style={{ width: "35%" }} className="btn  btn-success fw-bold my-2" onClick={customerreg}>Sign Up</button>
                        </div>

                    </div>
                    <ToastContainer />
                </form>
            </div>
        </div>
    )
}

export default Customerregistration



