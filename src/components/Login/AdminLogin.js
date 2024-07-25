import {React, useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Admin_API = 'http://localhost:8081/api/admin';


export default function AdminLogin(){
    const [showForm, setShowForm] = useState(false);
    const [showLogForm, setShowLogForm] = useState(false);
    const navigate = useNavigate();

    const [loginData,setLoginData]= useState({
        username: '',
        password: ''
      });
      const [formData, setFormData] = useState({
        username: '',
        password: ''
      });
      const toggleRegForm = () => {
        setShowForm(!showForm);
        setShowLogForm(true);
      };
    const toggleLogForm = () => {
      setShowLogForm(!showLogForm);
      setShowForm(false);
      };
      const handleChange = (event) => {
        const { name, value } = event.target;
        // Update form data
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));    
        setLoginData(prevState => ({
          ...prevState,
          [name]: value
        }));
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
          try {
            const response = await axios.post(Admin_API+'/register', formData);
            alert('Admin registered successfully:', response.data);
            navigate('/admin/login');
          } catch (error) {
            // Handle error
            alert('Admin already exist!! Please login', error);
            }
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(Admin_API+'/login',loginData );
      alert('Admin logged in successfully');
      navigate("/admin");
    } catch (error) {
      alert('Invalid Login or Password!!', error);
      console.error('Error details:', error.response ? error.response.data : error.message);
      }
};

    return(
        <div className="admin-login-home">
  <div className={`reg-form ${showForm ? 'active' : ''}`}>
    <form className="admin-form-login" onSubmit={handleSubmit}>
      <div className="flex-column"><h2>Admin Register</h2></div>
      <div className="flex-column">
        <label htmlFor="username">Username</label></div>
        <div className="inputForm">
        <input type="text" className="input" name="username"
                value={formData.username} onChange={handleChange} placeholder="Enter your Username" required/>
      </div>
      <div className="flex-column">
        <label>Password </label></div>
        <div className="inputForm">
          <input type="password" className="input" name="password"
                  value={formData.password} onChange={handleChange} placeholder="Enter your Password" required/>
        </div>
        <button type="submit" className="button-submit" >Register</button>
        <p className="p"> <span className="span" onClick={toggleLogForm}>Back to login</span></p>
    </form>
  </div>
  <div className={`login-form ${showLogForm ? 'active' : ''}`}>
    <form className="admin-form-login">
      <div className="flex-column"><h2>Admin Login</h2></div>
    <div className="flex-column">
      <label htmlFor="username">Username </label></div>
      <div className="inputForm">
        <input type="text" id="username" className="input" name="username"
                value={loginData.username} onChange={handleChange} placeholder="Enter your Username" required/>
      </div>

    <div className="flex-column">
      <label htmlFor="password">Password </label></div>
      <div className="inputForm">
        <input type="password" id="password" className="input" name="password" 
                value={loginData.password} onChange={handleChange} placeholder="Enter your Password" required/>
      </div>
      <button className="button-submit" onClick={handleLogin}>Sign In</button>
      <p className="p">!ADMIN <span className="span" onClick={toggleRegForm}>Register</span></p>
    </form>
  </div>
</div>
    );
}