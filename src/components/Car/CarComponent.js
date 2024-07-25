import React, { useState, useEffect } from 'react';
import { getAllCars, createCar, deleteCar } from '../services/carService';

const CarComponent = () => {
    const [cars, setCars] = useState([]);
    const [newCar, setNewCar] = useState({});

    useEffect(() => {
        loadCars();
    }, []);

    const loadCars = async () => {
        const result = await getAllCars();
        setCars(result.data);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCar({ ...newCar, [name]: value });
    };

    const handleAddCar = async () => {
        await createCar(newCar);
        loadCars();
    };

    const handleDeleteCar = async (id) => {
        await deleteCar(id);
        loadCars();
    };
    return (
        <div className='car-table'>
            <h1 className="text-center">Car List</h1>
            <table className="table table-striped">
                <thead>
                    <tr className="text-center">
                        <td>Car Id</td>
                        <td>Image</td>
                        <td>Brand</td>
                        <td>Car Name</td>
                        <td>Model</td>
                        <td>Price</td>
                        <td>Type</td>
                        
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {cars.map((car) => (
                        <tr key={car.id}>
                            <td>{car.id}</td>
                            <td><img src={require(`../../assets/all-imges/cars-img/${car.imgUrl}`)} alt={car.carName} style={{ height: '50px', width: '100px' }} /></td>
                            <td>{car.carName}</td>
                            <td>{car.brand}</td>                          
                            <td>{car.model}</td>
                            <td>{car.price}</td>
                            <td>{car.automatic}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => handleDeleteCar(car.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h1 className="text-center">Add Car</h1>
            <table className="table">
            
                <thead>
                    
                </thead>
                <tbody>
                <tr>
                        <td><input type="text" name="brand" placeholder="Brand" value={newCar.brand} onChange={handleInputChange} /></td>
                        <td><input type="number" name="rating" placeholder="Rating" value={newCar.rating} onChange={handleInputChange} /></td>
                        <td><input type="text" name="carName" placeholder="Car Name" value={newCar.carName} onChange={handleInputChange} /></td>
                        <td><input type="text" name="model" placeholder="Model" value={newCar.model} onChange={handleInputChange} /></td>
                        <td><input type="number" name="price" placeholder="Price" value={newCar.price} onChange={handleInputChange} /></td>
                        <td><input type="text" name="speed" placeholder="Speed" value={newCar.speed} onChange={handleInputChange} /></td>
                        </tr>
                        <tr>
                        <td><input type="text" name="gps" placeholder="GPS" value={newCar.gps} onChange={handleInputChange} /></td>
                        <td><input type="text" name="seatType" placeholder="Seat Type" value={newCar.seatType} onChange={handleInputChange} /></td>
                        <td><input type="text" name="automatic" placeholder="Automatic" value={newCar.automatic} onChange={handleInputChange} /></td>
                        <td><input type="text" name="imgUrl" placeholder="Image URL" value={newCar.imgUrl} onChange={handleInputChange} /></td>
                        <td><textarea style={{resize:"none"}} name="description" placeholder="Description" value={newCar.description} onChange={handleInputChange}></textarea></td>
                        <td><button className="btn btn-primary" onClick={handleAddCar}>Add Car</button></td>
                    </tr>
                    <tr>
                        <td colSpan="13">
                            <button style={{ padding: "5px", borderRadius: "5px", background: "blue" }}>
                                <a style={{ color: "white", textDecoration: "none" }} href="/admin">Go Back</a>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default CarComponent;
