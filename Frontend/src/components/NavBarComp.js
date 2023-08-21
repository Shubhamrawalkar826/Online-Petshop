import React, { useContext, useState } from "react";
import { Navbar, Nav, Offcanvas } from 'react-bootstrap'
import {
    Link
} from "react-router-dom";
import { UserContext } from "../App";
import { Logout } from "./Logout";

export default function NavBarComp() {

    const { state1, dispatch } = useContext(UserContext);
    console.log("inside navbar:" + state1);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Navbar className="px-5" bg="dark" expand="lg">
                <Navbar.Brand className="font-weight-bolder text-uppercase text-light" href="#home"><b>Online PetShop</b></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav >
                        <Nav.Link className="font-weight-bolder mx-1 text-light" as={Link} to="/home">Home</Nav.Link>
                    </Nav>
                    <Nav.Link className="font-weight-bolder mx-1 text-light text-decoration-none" onClick={handleShow}>
                        About
                    </Nav.Link>
                    {state1 ? <Nav>
                        <Logout />
                    </Nav> : <span><Nav>
                        <Nav.Link as={Link} className="font-weight-bolder mx-1 text-light text-decoration-none " to="/login">Login</Nav.Link>
                        <Nav.Link as={Link} className="font-weight-bolder text-light text-decoration-none " to="/customerregistration">Sign up</Nav.Link>
                    </Nav></span>}




                </Navbar.Collapse>
            </Navbar>
            <Offcanvas placement="top" show={show} onHide={handleClose}>
                <Offcanvas.Header className="text-center" closeButton>
                    <Offcanvas.Title>About us</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    Online pet shop system is a platform which provides customers a facility to buy pets in online and sellers to sell without any hassle. It is a web-based system and it will save valuable time and effort of customers and sellers.
                    Some additional features are- system allows the customers to search for product. The system displays all the pets details such as petid, name, price and age of pet etc. After searching in the system, it will display the list of available product and allows customer to choose a particular product. Then the system checks for the availability of pet in the shop. After the whole process the customers add to cart the product and buy. The important reason is to make-work easy.
                    Regards, from creators:
                    <li>Kiran Jagtap</li>
                    <li>Abhilash Patil</li>
                    <li>Abhishek Kendre</li>
                    <li>Sachin Kamble</li>
                    <li>Shubham Rawalkar</li>
                    <li>Gaurav Patil</li>
                </Offcanvas.Body>
            </Offcanvas>
        </div >

    )

}