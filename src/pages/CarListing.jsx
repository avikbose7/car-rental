import {React, useState, useEffect} from 'react';
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
// import CarItem from "../components/UI/CarItem";
// import carData from '../assets/data/carData';

import axios from 'axios';
import CarItem from '../components/UI/CarItem';

const CarListing = () => {
    const [carData, setCarData] = useState([]);
    const [sortOption, setSortOption] = useState('');

    useEffect(() => {
        fetchCarData();
    }, []);

    const fetchCarData = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/cars/allCars');
            setCarData(response.data);
        } catch (error) {
            console.error('Error fetching car data:', error);
        }
    };

    const handleSortChange = (e) => {
        const value = e.target.value;
        setSortOption(value);
        sortCarData(value);
    };

    const sortCarData = (sortOption) => {
        let sortedData = [...carData];
        if (sortOption === 'low') {
            sortedData.sort((a, b) => a.price - b.price);
        } else if (sortOption === 'high') {
            sortedData.sort((a, b) => b.price - a.price);
        }
        setCarData(sortedData);
    };

    return (
        <Helmet title="Cars">
            <CommonSection title="Cars Listing" />
            <section>
                <Container>
                    {/* <img alt="" src={require('../assets/all-imges/cars-img/nissan-offer.png')}/> */}
                    <Row>
                        <Col lg="12">
                            <div className="d-flex align-items-center gap-3 mb-5">
                                <span className="d-flex align-items-center gap-2">
                                    <i className="ri-sort-asc"></i>
                                    Sort By
                                </span>
                                <select onChange={handleSortChange}>
                                    <option value="">Select</option>
                                    <option value="low">Low to High</option>
                                    <option value="high">High to Low</option>
                                </select>
                            </div>
                        </Col>
                        {carData.map((item) => (
                            <CarItem item={item} key={item.id} />
                        ))}
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
};

export default CarListing;

