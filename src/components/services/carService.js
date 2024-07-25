import axios from 'axios';

const API_URL = 'http://localhost:8081/api/cars';

export const getAllCars = async () => {
    return await axios.get(API_URL+"/allCars");
};

export const getCarById = async (id) => {
    return await axios.get(`${API_URL}/${id}`);
};

export const createCar = async (car) => {
    return await axios.post(API_URL, car);
};

export const deleteCar = async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
};
