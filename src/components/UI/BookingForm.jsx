import {React, useState, useEffect} from "react";
import "../../styles/booking-form.css";
import "../../styles/payment-method.css"
import { Form, FormGroup } from "reactstrap";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useAuth } from "../services/AuthContext";
// import moment from 'oment';

const BookingForm = () => {

    // const [value, setValue] = useState('');
    const navigate = useNavigate();
    // const {userDetail} = useAuth();
    const {userDetail} = useAuth();
    // console.log(userDetail.firstname);
   
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        fromAddress: '',
        toAddress: '',
        personCount: '1 person',
        luggageCount: '1 Luggage',
        journeyDate: '',
        journeyTime: null,
      });

      useEffect(() => {
        if (userDetail) {
          setFormData((prevData) => ({
            ...prevData,
            firstName: userDetail.firstname || '',
            lastName: userDetail.lastname || '',
            email: userDetail.email || '',
            phoneNumber: userDetail.phone || '',
          }));
        }
      }, [userDetail]);
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    //   const handleDateChange = (date) => {
    //     setFormData((prevData) => ({
    //       ...prevData,
    //       journeyDate: date,
    //     }));
    //   };
      const handleTimeChange = (time) => {
        const formattedTime = dayjs(time).format('HH:mm:ss');
        setFormData((prevData) => ({
          ...prevData,
          journeyTime: formattedTime,
        }));
      };
    const submitHandler = (event) => {
        event.preventDefault();
        navigate('/payment',{ state: { formData } });
    };
    return (
        <div className="booking-form-home">
            <div className="header-book"><h1> Booking Details</h1></div>
        <Form onSubmit={submitHandler}>
            <FormGroup className="booking-form d-inline-block me-4 mb-4">
                <input name="firstName" type="text" placeholder={`${userDetail.firstname}`} onChange={handleChange} />
            </FormGroup>
            <FormGroup className="booking-form d-inline-block ms-1 mb-4">
                <input name="lastName" type="text" placeholder={`${userDetail.lastname}`} onChange={handleChange} />
            </FormGroup>

            <FormGroup className="booking-form d-inline-block me-4 mb-4">
                <input name="email" type="email" placeholder={`${userDetail.email}`} onChange={handleChange} />
            </FormGroup>
            <FormGroup className="booking-form d-inline-block ms-1 mb-4">
                <input name="phoneNumber" type="number" placeholder={`${userDetail.phone}`} onChange={handleChange} />
            </FormGroup>

            <FormGroup className="booking-form d-inline-block me-4 mb-4">
                <input name="fromAddress" type="text" placeholder="From Address" required onChange={handleChange} />
            </FormGroup>
            <FormGroup className="booking-form d-inline-block ms-1 mb-4">
                <input name="toAddress" type="text" placeholder="To Address" required onChange={handleChange} />
            </FormGroup>

            <FormGroup className="booking-form d-inline-block me-4 mb-4">
                <select name="personCount" id="" required onChange={handleChange} >
                    <option value="1">1 Person</option>
                    <option value="2">2 Person</option>
                    <option value="3">3 Person</option>
                    <option value="4">4 Person</option>
                    <option value="5+">5+ Person</option>
                </select>
            </FormGroup>
            <FormGroup className="booking-form d-inline-block ms-1 mb-4">
                <select name="luggageCount" id="" required onChange={handleChange} >
                    <option value="1">1 Luggage</option>
                    <option value="2">2 Luggage</option>
                    <option value="3">3 Luggage</option>
                </select>
            </FormGroup>

            <FormGroup className="booking-form d-inline-block me-4 mb-4">
                <input name="journeyDate" type="date" placeholder="Journey Date" onChange={handleChange}/>
            </FormGroup>
            <FormGroup className="booking-form d-inline-block ms-1 mb-4">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimePicker']}>
        <TimePicker className="journey-time" label=""
         name="journeyTime"
         value={formData.journeyTime}
         onChange={handleTimeChange}/>
          </DemoContainer>
         </LocalizationProvider>
            </FormGroup>
            
                <div className="payment text-end mt-5">
                    <button>Proceed to pay</button>
                </div>
            {/* <FormGroup>
                <textarea
                    rows={5}
                    type="textarea"
                    className="textarea"
                    placeholder="Write"
                ></textarea>
            </FormGroup> */}
        </Form>
        </div>
    );
};

export default BookingForm;
