import React, { useEffect, useState } from 'react'
import Nav from 'react-bootstrap/Nav';
import { Link, useNavigate } from 'react-router-dom';
import BackButton from './BackButton';

const PaymentDashboard = () => {

    const navigate = useNavigate();
    const [address, setAddress] = useState('');

    useEffect(() => {
        let cust = JSON.parse(sessionStorage.getItem("customer"));
        console.log(cust);
<<<<<<< HEAD
        this.setState({
            address: cust.address,
        });
        if (sessionStorage.getItem("role") == null) {
            window.location.href = "/";
        }
    }
    render() {
        return (
=======
        if (sessionStorage.getItem("role") == null) {
            navigate("/");
        }
        setAddress(cust.address);

        return () => {
            console.log("payment done")
        }
    }, [])

    return (
        <>
>>>>>>> branch1
            <div><br></br>
                <BackButton />
                <h2 className='text-light'>Your order has been placed</h2>
                <h4 className='text-light'>Payment method : Cash On Delivery</h4>
                <h4 className='text-light'>Address for delivery is : {address} </h4>
                <br></br>
                <Nav.Link as={Link} to='/searchpet'><h6 className='btn btn-primary'>Continue Shopping</h6></Nav.Link>
            </div>
        </>
    )
}

export default PaymentDashboard