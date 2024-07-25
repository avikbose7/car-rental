import React from "react";
import { useState } from "react";
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import "../../styles/login.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../services/AuthContext";
import Swal from "sweetalert2";


const User_API = 'http://localhost:8081/api/users';

export default function Login(){
    // const [phone, setValue] = useState();
    const [showForm, setShowForm] = useState(false);
    const [showLogForm, setShowLogForm] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passError, setPassError] = useState('');
    const navigate = useNavigate();
    const { setAuthToken } = useAuth();
    const [loginData,setLoginData]= useState({
      email: '',
      password: ''
    });

    const [formData, setFormData] = useState({
      firstname: '',
      lastname: '',
      dateOfBirth: '',
      gender: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    });
    const handlePhoneChange = (value) => {
      setFormData(prevFormData => ({
          ...prevFormData,
          phone: value
      }));
  };
    const toggleRegForm = () => {
        setShowForm(!showForm);
        setShowLogForm(true);
      };
    const toggleLogForm = () => {
      setShowLogForm(!showLogForm);
      setShowForm(false);
      };

      // Handle input changes
    const handleChange = (event) => {
      let emailErrorMessage = '';
      let passErrorMessage = '';
      const { name, value } = event.target;
      // Update form data
      setFormData(prevState => ({
          ...prevState,
          [name]: value
      }));
      if (name === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          emailErrorMessage = 'Invalid email address';
        }
      } else if (name === 'confirmPassword') {
        if (formData.password !== value) {
          passErrorMessage = 'Passwords do not match';
        }
      }
      setEmailError(emailErrorMessage);
      setPassError(passErrorMessage);
      
      setLoginData(prevState => ({
        ...prevState,
        [name]: value
      }));
  };
  const pop_msg = (msg,type) => {
    Swal.fire({
      position: "center",
      icon: type,
      title: msg,
      showConfirmButton: false,
      timer: 2500
    });
}

    const handleSubmit = async (event) => {
      event.preventDefault();
        // Proceed with form submission or other actions
        try {
          // Send POST request to backend
          const response = await axios.post(User_API+'/register', formData);
    
          // Handle success response
          // alert('User registered successfully:', response.data);
          pop_msg('User registered successfully Please Log In to continue',"success");
          toggleLogForm();
        } catch (error) {
          // Handle error
          // alert('User already exist!! Please login', error);
          pop_msg('User already exist!! Please login','warning');
          }
};
      
      const handleLogin = async (event) => {
        event.preventDefault();
        try {
          // Send POST request to backend
          const response = await axios.post(User_API+'/login',loginData );
          const token = response.data.token;
          setAuthToken(token);
          localStorage.setItem('authToken', token);
          // console.log(firstName)
          // Handle success response
          // alert('User logged in successfully');
          pop_msg("You have been successfully LoggedIn","success");
          navigate("/home");
        } catch (error) {
          // Handle error
          // alert('Error Logging user:', error);
          pop_msg(error.response.data.message,"error");
          console.error('Error details:', error.response ? error.response.data : error.message);
          }
};
    return(
        <div className="login-home">
        <div className={`reg-form ${showForm ? 'active' : ''}`}>
        <form className="form-reg-login" onSubmit={handleSubmit}>
            <div className="flex-column"><h2>Rent. Ride. Explore.</h2></div>
            <div className="flex-column">
                <label htmlFor="firstname">Name</label></div>
                <div className="col-2-input">
                <div className="inputForm">
                <input type="text" id="firstname" className="input" name="firstname"
                        value={formData.firstname} onChange={handleChange} placeholder="First Name" required/>
            </div>
            <div className="inputForm">
                <input id="lastname" type="text" className="input" name="lastname"
                        value={formData.lastname} onChange={handleChange} placeholder="Last Name" required/>
            </div>
            </div>
      {/* <div className="inputForm">
        <input type="date" className="input" placeholder=""/>
      </div> */}
      <div className="col-2-input">
      <div className="col-1-input">
      <input className="in-col-1" type="date" name="dateOfBirth"
                        value={formData.dateOfBirth} onChange={handleChange} required/>
      </div>
      <div className="col-1-input"><select className="in-col-1" name="gender"
                        value={formData.gender} onChange={handleChange} required>
        <option>Gender</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
        </select></div>
    </div>
    <div className="flex-column">
      <label>Email </label></div>
      {/* <p id="emailErrorMessage" className="error">{emailError}</p> */}
      {emailError && <div style={{ color: 'red', fontSize: '10px'}}>{emailError}</div>}
      <div className="inputForm">
        <input type="email" className="input" name="email"
                        value={formData.email} onChange={handleChange} placeholder="Enter your Email" required/>
      </div>
      <div className="flex-column">
      <label>Phone </label></div>
      <div className="inputForm">
      <PhoneInput
      name="phone"
      defaultCountry="IN"
      placeholder="Enter phone number"
      value={formData.phone}
      onChange={handlePhoneChange} required/>
      </div>
      <div className="flex-column">
      <label>Password </label></div>
      <div className="inputForm">
        <input type="password" className="input" name="password"
                        value={formData.password} onChange={handleChange} placeholder="Enter your Password" required/>
      </div>
      {/* <p id="passErrorMessage" className="error">{passError}</p> */}
      {passError && <div style={{ color: 'red', fontSize: '10px'}}>{passError}</div>}
      <div className="inputForm">
        <input type="password" className="input" name="confirmPassword"
                        value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm your Password" required/>
      </div>
      <button type="submit" className="button-submit" >Sign Up</button>
      <p className="p-1">By clicking through, I agree with the
      <a href="/">Terms & Conditions </a>and <a href="/">Privacy Policy</a></p>
      <p className="p">Already have an account? <span className="span" onClick={toggleLogForm}>Sign In</span>
    </p>
    </form>
    </div>
   {/* Login section */}

    <div className={`login-form ${showLogForm ? 'active' : ''}`}>
    <form className="form-login">
    <div className="flex-column"><h2>Rent. Ride. Explore.</h2></div>
<div className="flex-column">
  <label htmlFor="email">Email </label></div>
  <div className="inputForm">
    <svg height="20" viewBox="0 0 32 32" width="20" xmlns="http://www.w3.org/2000/svg"><g id="Layer_3" data-name="Layer 3"><path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path></g></svg>
    <input type="text" id="email" className="input" name="email"
                    value={loginData.email} onChange={handleChange} placeholder="Enter your Email"/>
  </div>

<div className="flex-column">
  <label htmlFor="password">Password </label></div>
  <div className="inputForm">
    <svg height="20" viewBox="-64 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path><path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path></svg>        
    <input type="password" id="password" className="input" name="password" 
                    value={loginData.password} onChange={handleChange} placeholder="Enter your Password"/>
    <svg viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path></svg>
  </div>

<div className="flex-row">
  <div>
  <input type="checkbox"/>
  <label>Remember me </label>
  </div>
  <span className="span"><a href="\reset\new">Forgot password?</a></span>
</div>
<button className="button-submit" onClick={handleLogin}>Sign In</button>
<p className="p">Don't have an account? <span className="span" onClick={toggleRegForm}>Sign Up</span>

</p></form>
</div>
</div>
    );
}