import React from 'react';
import Slider from 'react-slick'
import { Container } from 'reactstrap'
import '../styles/AdminDashboard.css'
import "../styles/hero-slider.css";

const AdminDashboard = () => {

  const settings ={
    fade:true,
    speed: 2000,
    autoplaySpeed: 3000, 
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
};

  return (
    <Slider {...settings} className='hero__slider'>
      <div className="slider__item slider__item-01 mt0">
            <Container>
                <div className="slider__content">
                <div className='admin-home'>
      <div className='admin-header'>
      <h1>
        Welcome, Admin!
      </h1>
      </div>
      <div className='admin-nav'>
      <table>
  <thead>
    <tr>
      <th colspan="2">Admin Navigation</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td >
        <a href="/user/getall">
          All User Details
        </a>
      </td>
    </tr>
    <tr>
      <td>
        <a href="/manage/cars">
          Manage Cars
        </a>
      </td>
    </tr>
    <tr>
      <td>
        <a href="/nil">
          Booking Data
        </a>
      </td>
    </tr>
  </tbody>
</table>
      </div>
    </div>
                </div>
            </Container>
        </div>

        <div className="slider__item slider__item-02 mt0">
            <Container>
                <div className="slider__content">
                <div className='admin-home'>
      <div className='admin-header'>
      <h1>
        Welcome, Admin!
      </h1>
      </div>
      <div className='admin-nav'>
      <table>
  <thead>
    <tr>
      <th colspan="2">Admin Navigation</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <a href="/user/getall">
          All User Details
        </a>
      </td>
    </tr>
    <tr>
      <td>
        <a href="/manage/cars">
          Manage Cars
        </a>
      </td>
    </tr>
    <tr>
      <td>
        <a href="/nil">
          Booking Data
        </a>
      </td>
    </tr>
  </tbody>
</table>
      </div>
    </div> 
                </div>
            </Container>
        </div>

        <div className="slider__item slider__item-03 mt0">
            <Container>
                <div className="slider__content">
                <div className='admin-home'>
      <div className='admin-header'>
      <h1>
        Welcome, Admin!
      </h1>
      </div>
      <div className='admin-nav'>
      <table>
  <thead>
    <tr>
      <th colspan="2">Admin Navigation</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <a href="/user/getall">
          All User Details
        </a>
      </td>
    </tr>
    <tr>
      <td>
        <a href="/manage/cars">
          Manage Cars
        </a>
      </td>
    </tr>
    <tr>
      <td>
        <a href="/nil">
          Booking Data
        </a>
      </td>
    </tr>
  </tbody>
</table>
      </div>
    </div>
                </div> 
            </Container>
        </div>
    
    </Slider>
  );
};

export default AdminDashboard;