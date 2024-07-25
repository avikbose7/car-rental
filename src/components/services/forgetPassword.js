import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const OTP_API = 'http://localhost:8081/api';

const ForgetPassword = () => {

    const navigate = useNavigate();
    const [passError, setPassError] = useState('');
    const [pass, setPass]= useState('');

    const [email, setEmail] = useState({
        email : ''
    });
    const [otp, setOTP] = useState({
        email : '',
        otp : ''
    });
    const [hideBtn, setHideBtn] = useState(true);
    const [hideMsg, setHideMsg] = useState(true);
    const [message, setMessage] = React.useState({
        text: "",
        color: "green",
    });
      const [newPassword, setNewPassword] = useState({
        email: '',
        password: ''
    });
    const [showNewPasswordForm, setShowNewPasswordForm] = useState(false);
    
    const setError = (error) =>{
        setMessage({
            text: error,
            color: "red",
            });
    }

    const sendOTP = async (event) => {
        event.preventDefault();
        try { 
            const response = await axios.post(OTP_API+'/send-otp', email);
            setMessage({text : response.data.message, color: "green"});
            setHideBtn(false);
            setHideMsg(false);
        } catch (error) {
            setHideMsg(false);
            setError(error.response.data.message);
            console.log(error.response.data.message);
        }
    };
    

    const verifyOTP = async (event) => {
        event.preventDefault();
        try { 
            const response = await axios.post(OTP_API+'/verify-otp', otp);
            setMessage({text : response.data.message, color: "green"});
            // navigate('/login');
            // alert("OTP verified Successfully");
            setShowNewPasswordForm(true);
        } catch (error) {
            // console.log(error.response.data.message);
            // alert("Connection timeout!")
            setError(error.response.data.message);
        }
    };
    const resetPassword = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(OTP_API + '/reset-password', newPassword);
            setMessage({ text: response.data.message, color: "green" });
            navigate('/login');
            pop_msg("Password reset successfully! Login to continue","success");
            // alert("Password reset successfully!");
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    const handleChange=(e)=>{
        let passErrorMessage = '';
        const {id, name , value } = e.target;
        // const {id, value} = e.target;
        setEmail (prevState => ({
            ...prevState,
            [name] : value
        }))
        setOTP(prevState => ({
            ...prevState,
            [name] : value
        }))
        setNewPassword(prevState => ({ ...prevState, [name]: value }));
        setPass(prevState => ({
            ...prevState,
            [id] : value
        }))
        if (id === 'conPass') {
            if (newPassword.password!== value) {
              passErrorMessage = 'Passwords do not match';
            } else {
              passErrorMessage = '';
            }
          }
          setPassError(passErrorMessage);
    }
    const pop_msg = (msg,type) => {
        Swal.fire({
          position: "center",
          icon: type,
          title: msg,
          showConfirmButton: false,
          timer: 3500
        });
    }       
        
    return (
        <div className="forgotPass">
        <div className="forgotPass-container">
        <form className="forgotPass-form">
                    <div className="flex-column"><h2>Forgot Password</h2></div>

                    {!showNewPasswordForm ? (
                        <>
                            <div className="flex-column">
                                <label>Enter your registered Email</label>
                            </div>
                            <div className="inputForm">
                                <input type="email" name="email" className="input" value={email.email} onChange={handleChange} placeholder="Enter Your Email" />
                            </div>
                            {!hideMsg && (<p className="msg" style={{ color: message.color }}>{message.text}</p>)}
                            <div className="hide-send-btn">
                                <button className={`send-btn ${hideBtn ? 'active' : ''}`} onClick={sendOTP}>Send</button>
                            </div>
                            <div className={`verify ${hideBtn ? 'active' : ''}`}>
                                <div className="inputForm">
                                    <input type="text" name="otp" className="input" value={otp.otp} onChange={handleChange} placeholder="Enter OTP" />
                                </div>
                                <button className="verify-btn" onClick={verifyOTP}>Verify OTP</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex-column">
                                <label>Enter New Password</label>
                            </div>
                            <div className="inputForm">
                                <input id="pass" type="password" name="password" className="input" value={newPassword.password} onChange={handleChange} placeholder="Enter New Password" />
                            </div>
                            {passError && <div style={{ color: 'red', fontSize: '10px'}}>{passError}</div>}
                            <div className="inputForm">
                                <input id="conPass" type="password" className="input" name="confirmPassword"
                                                                onChange={handleChange} placeholder="Confirm your Password" required/>
                            </div>
                            <button className="reset-btn" onClick={resetPassword}>Reset Password</button>
                        </>
                    )}
                    <p className="p-1">By clicking through, I agree with the
                        <a href="/"> Terms & Conditions </a> and <a href="/">Privacy Policy</a></p>
                </form>
        </div>
      </div>
    );  
};

export default ForgetPassword;
