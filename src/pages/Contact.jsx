import {React, useState} from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Input } from 'reactstrap';
import Helmet from "../components/Helmet/Helmet";
import CommonSection from '../components/UI/CommonSection';
import { sendEmail } from '../components/services/EmailService';

import "../styles/contact.css";

const socialLinks = [
    {
        url: "#",
        icon: "ri-facebook-line",
    },
    {
        url: "#",
        icon: "ri-instagram-line",
    },
    {
        url: "#",
        icon: "ri-linkedin-line",
    },
    {
        url: "#",
        icon: "ri-twitter-line",
    },
];



const Contact = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, message } = formData;
        const subject = `Message from ${name}`;
        const emailRequest = { email, subject, message };

        try {
            const response = await sendEmail(emailRequest);
            alert(response.data);
        } catch (error) {
            alert('Failed to send email: ' + error.message);
        }
    };

    return (
        <Helmet title="Contact">
            <CommonSection title="Contact" />
            <section>
                <Container>
                    <Row>
                        <Col lg="7" md="7">
                            <h6 className="fw-bold mb-4">Get In Touch</h6>

                            <Form onSubmit={handleSubmit}>
                                <FormGroup className="contact__form">
                                    <Input 
                                    placeholder="Your Name" 
                                    name="name" 
                                    value={formData.name} 
                                    onChange={handleChange} 
                                    type="text"/>
                                </FormGroup>
                                <FormGroup className="contact__form">
                                    <Input 
                                     placeholder="Email" 
                                     name="email" 
                                     value={formData.email} 
                                     onChange={handleChange} 
                                     type="email" />
                                </FormGroup>
                                <FormGroup className="contact__form">
                                    <textarea 
                                    rows="5" 
                                    placeholder="Message" 
                                    name="message" 
                                    value={formData.message} 
                                    onChange={handleChange} 
                                    className="textarea"/>
                                </FormGroup>
                                <button className="contact__btn" type="submit">Send Message</button>
                            </Form>
                        </Col>

                        <Col lg="5" md="5">
                            <div className="contact__info">
                                <h6 className="fw-bold">Contact Information</h6>
                                <p className="section__description mb-0">832 Sonali Park, Bansdroni Kolkata, West Bengal</p>
                                <div className="d-flex align-items-center gap-2">
                                    <h6 className="fs-6 mb-0">Phone:</h6>
                                    <p className="section__description mb-0">+91 7980 350 133</p>
                                </div>

                                <div className="d-flex align-items-center gap-2">
                                    <h6 className="mb-0 fs-6">Email:</h6>
                                    <p className="section__description mb-0">abc987@gmail.com</p>
                                </div>

                                <h6 className="fw-bold mt-4">Follow Us</h6>

                                <div className="d-flex align-items-center gap-4 mt-3">
                                    {
                                        socialLinks.map((item, index) => (
                                            <Link
                                                to={item.url}
                                                key={index}
                                                className="social__link-icon">
                                                <i class={item.icon}></i>
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
};

export default Contact;