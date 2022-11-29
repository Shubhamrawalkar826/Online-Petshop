import React, { useEffect, useState } from 'react'
import { Badge, Button, Container, Nav, Navbar } from 'react-bootstrap';
import CustomerregistrationAPI from '../services/CustomerregistrationAPI';
import LoginAPI from '../services/LoginAPI';
import { Link } from 'react-router-dom';

const Cart = () => {

    const [custfname, setCustfname] = useState('');
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');

    const logout = () => {
        LoginAPI.logoutAdmin()
    }

    useEffect(() => {
        custcartdetails();
        console.log(sessionStorage.getItem("customer"));
        let cust = JSON.parse(sessionStorage.getItem("customer"));
        setCustfname(cust.fname);
        if (sessionStorage.getItem("role") == null) {
            window.location.href = "/";
        }

        return () => {
            console.log("cart visited");
        }
    }, [])

    const custcartdetails = () => {
        let cust = JSON.parse(sessionStorage.getItem("customer"));
        let custid = cust.cid;
        console.log(custid)
        CustomerregistrationAPI.cartdetails(custid).then((resp) => {

            setUsers(resp.data);
            setMessage("Users list rendered successfully");

            console.log(resp.data);
        })
    }

    const onRemoveOrder = orderid => {

        CustomerregistrationAPI.deletecartitems(orderid)
            .then(res => {
                setMessage("Order deleted successfully.")
                console.log(message, 'Order ID: ', orderid);
                setUsers(users.filter(users => users.order_id !== orderid))
            })

    }

    const confirmOrder = () => {
        CustomerregistrationAPI.deletecartdetails().then((resp) => {
            setMessage("Order deleted successfully.")
            window.location.href = "/paymentDashboard";
        })
    }
    return (
        <>
            <div className='overflow-hidden'>
                <Navbar expand="lg">
                    <Container>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav>
                                <Nav.Link className="btn btn-link btn-primary text-light text-uppercase text-decoration-none " as={Link} to="/searchpet">Search pet</Nav.Link>
                            </Nav>
                            <Nav>
                                <Nav.Link className="btn btn-link btn-primary text-light text-uppercase text-decoration-none " as={Link} to='/viewopets'>My Pets</Nav.Link>
                            </Nav>
                            <Nav className='me-auto'>
                                <Nav.Link className="btn btn-link btn-primary text-light text-uppercase text-decoration-none " as={Link} to="/petregistration">Add pet</Nav.Link>
                            </Nav>
                            <Nav>
                                <Nav.Link className="btn btn-link btn-primary text-light text-uppercase text-decoration-none " as={Link} to='/cart'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                </svg><Badge bg="secondary">{users.length}</Badge></Nav.Link>
                            </Nav>
                            <Nav >
                                <Nav.Link className=" btn btn-link btn-primary text-light text-uppercase text-decoration-none " as={Link} to="/profile">Profile</Nav.Link>
                            </Nav>
                            <Nav className='justify-content-end'>
                                <Nav.Link as={Link} onClick={logout} className="btn btn-danger text-light offset-10 text-uppercase text-decoration-none " to="/home">Logout</Nav.Link>
                            </Nav>
                        </Navbar.Collapse></Container>
                </Navbar>
                <div className="row">
                    <div className="col-sm-4 text-secondary"><h4>Hello! {custfname}</h4></div>
                </div>
            </div>

            <div className="container my-4">
                {users.length === 0 ? "" :
                    <div> <h4 className='text-light'>All Cart Items List</h4>
                        <table className="table text-light table-bordered">
                            <thead className="bg-dark text-light">
                                <tr>
                                    <th className="visually-hidden">Id</th>
                                    <th>OrderId</th>
                                    <th>PetId</th>
                                    <th>Price</th>
                                    <th>Breed</th>
                                    <th>Quantity</th>
                                    <th>Remove from cart</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map(
                                        users =>
                                            <tr key={users.order_id}>
                                                <td className="visually-hidden">{users.order_id}</td>
                                                <td>{users.order_id}</td>
                                                <td>{users.pid}</td>
                                                <td>{users.totalprice}</td>
                                                <td>{users.breed}</td>
                                                <td>{users.quantity}</td>
                                                <td><Button onClick={() => { onRemoveOrder(users.order_id) }}>Remove</Button></td>
                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>
                        <Button className="justify-content-center mt-2 mb-4" onClick={confirmOrder}>Confirm Order</Button>
                    </div>
                }
            </div>
        </>
    )
}

export default Cart
