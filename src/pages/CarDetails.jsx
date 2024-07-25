import React, { useState, useEffect } from 'react';
// import carData from "../assets/data/carData";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { useParams } from "react-router-dom";
import axios from 'axios';
import CommonSection from "../components/UI/CommonSection";
import { useAuth } from '../components/services/AuthContext';
// import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CarDetails = () => {
    const { slug } = useParams();
    const [carData, setCarData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { authToken } = useAuth();
    // const navigate = useNavigate();

    const pop_msg = (msg, type) => {
        Swal.fire({
            position: "center",
            icon: type,
            title: msg,
            showConfirmButton: false,
            timer: 2500
        });
    }


    const handleChange = () => {
        if (authToken !== null) {
            window.location.href = "/bookingForm";
        }
        else {
            pop_msg("Please login to continue", "warning");
            setTimeout(function () {
                window.location.href = "/login";
            }, 1000);
        }
    }

    const fetchCarData = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/cars/allCars');
            setCarData(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching car data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCarData();
    }, []);

    const singleCarItem = carData.find(item => item.carName === slug);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [singleCarItem]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!singleCarItem) {
        return <div>Car not found</div>;
    }

    return (
        <Helmet title={singleCarItem.carName}>
            <CommonSection title={singleCarItem.carName} />
            <section>
                <Container>
                    <Row>
                        <Col lg="6">
                            <img src={require(`../assets/all-imges/cars-img/${singleCarItem.imgUrl}`)} alt={singleCarItem.carName} className="w-100" />
                        </Col>

                        <Col lg="6">
                            <div className="car__info">
                                <h2 className="section__title">{singleCarItem.carName}</h2>

                                <div className="d-flex align-items-center gap-5 mb-4 mt-3">
                                    <h6 className="rent__price fw-bold fs-4">
                                        ₹{singleCarItem.price}.00/Day
                                    </h6>

                                    <span className="d-flex align-items-center gap-2">
                                        <span style={{ color: "#f9a826" }}>
                                            <i className="ri-star-s-fill"></i>
                                            <i className="ri-star-s-fill"></i>
                                            <i className="ri-star-s-fill"></i>
                                            <i className="ri-star-s-fill"></i>
                                            <i className="ri-star-s-fill"></i>
                                        </span>
                                        ({singleCarItem.rating} Ratings)
                                    </span>
                                </div>

                                <p className="section__description">
                                    {singleCarItem.description}
                                </p>

                                <div className="d-flex align-items-center mt-3" style={{ columnGap: "4rem" }}>
                                    <span className="d-flex align-items-center gap-1 section__description">
                                        <i className="ri-roadster-line" style={{ color: "#f9a826" }}></i> {singleCarItem.model}
                                    </span>

                                    <span className="d-flex align-items-center gap-1 section__description">
                                        <i className="ri-settings-2-line" style={{ color: "#f9a826" }}></i> {singleCarItem.automatic}
                                    </span>

                                    <span className="d-flex align-items-center gap-1 section__description">
                                        <i className="ri-timer-flash-line" style={{ color: "#f9a826" }}></i> {singleCarItem.speed}
                                    </span>
                                </div>

                                <div className="d-flex align-items-center mt-3" style={{ columnGap: "2.8rem" }}>
                                    <span className="d-flex align-items-center gap-1 section__description">
                                        <i className="ri-map-pin-line" style={{ color: "#f9a826" }}></i> {singleCarItem.gps}
                                    </span>

                                    <span className="d-flex align-items-center gap-1 section__description">
                                        <i className="ri-wheelchair-line" style={{ color: "#f9a826" }}></i> {singleCarItem.seatType}
                                    </span>

                                    <span className="d-flex align-items-center gap-1 section__description">
                                        <i className="ri-building-2-line" style={{ color: "#f9a826" }}></i> {singleCarItem.brand}
                                    </span>
                                </div>
                            </div>
                            <div className="payment text-end mt-5">
                                <button onClick={handleChange}>Reserve Now</button>
                            </div>
                        </Col>

                    </Row>
                </Container>
            </section>
        </Helmet>
    );
};

export default CarDetails;

