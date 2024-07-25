import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const [username, setUsername] = useState('');
  const [userDetail, setUserdetail] = useState({});

  const handleLogout = () => {
    setAuthToken(null);
    localStorage.removeItem('authToken');
    setUsername('');
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (authToken) {
        try {
          const response = await axios.get('http://localhost:8081/api/user/detail', {
            headers: { Authorization: `Bearer ${authToken}` },
          });
          setUsername(response.data.firstname);
          setUserdetail(response.data);
          // console.log(response.data.email);
        } catch (error) {
          console.error('Error fetching user details:', error);
          handleLogout();
        }
      }
    };

    fetchUserDetails();
  }, [authToken]);
  // console.log("AuthContext Value: ", { authToken, setAuthToken, username, handleLogout });
  return (
    <AuthContext.Provider value={{ authToken, setAuthToken, username, handleLogout, userDetail, setUserdetail}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
