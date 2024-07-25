import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import CarListing from '../pages/CarListing';
import CarDetails from '../pages/CarDetails';
import Blog from '../pages/Blog';
import BlogDetails from '../pages/BlogDetails';
import NotFound from '../pages/NotFound';
import Contact from "../pages/Contact";
import Login from "../components/Login/login"
import Reset from "../components/services/forgetPassword"
import Admin from '../pages/Admin'
import AdminLogin from '../components/Login/AdminLogin';
import CarComponent from '../components/Car/CarComponent';
import BookingForm from '../components/UI/BookingForm';
import PaymentMethod from '../components/UI/PaymentMethod';
import UserComponent from '../components/Car/UserComponent';

const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/home' />} />
      <Route path='/admin/login' element={<AdminLogin />} />
      <Route path='/admin' element={<Admin/>}/>
      <Route path='/login' element={<Login />} />
      <Route path='/reset/new' element={<Reset />} />
      <Route path="/user/getall" element={<UserComponent />}/>
      <Route path='/manage/cars' element={<CarComponent />} />
      <Route path='/home' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/cars' element={<CarListing />} />
      <Route path='/cars/:slug' element={<CarDetails />} />
      <Route path='/blogs' element={<Blog />} />
      <Route path='/blogs/:slug' element={<BlogDetails />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/bookingform' element={<BookingForm/>}/>
      <Route path='/payment' element={<PaymentMethod/>}/>
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default Routers;