import React, { useEffect, useState } from 'react'
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PaymentDashboard = () => {

    const [address, setAddress] = useState('');

    useEffect(() => {
        let cust = JSON.parse(sessionStorage.getItem("customer"));
        console.log(cust);
        if (sessionStorage.getItem("role") == null) {
            window.location.href = "/";
        }
        setAddress(cust.address);

        return () => {
            console.log("payment done")
        }
    }, [])

    return (
        <>
            <div><br></br>
                <Nav.Link as={Link} to='/cart'><h6 className='btn btn-secondary offset-9'>Go back</h6></Nav.Link>
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