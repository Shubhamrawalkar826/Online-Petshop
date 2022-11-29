import React, { Component } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import LoginAPI from '../services/LoginAPI'

export default class CustNavBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            custfname: null,
            message: null
        }

        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        let cust = JSON.parse(sessionStorage.getItem("customer"));
        this.setState({ custfname: cust.fname });
        if (sessionStorage.getItem("role") == null) {
            window.location.href = "/";
        }
    }

    logout() {
        LoginAPI.logoutAdmin()
    }

    render() {
        return (
            <>
                <Navbar className='text-light' expand="lg">
                    <Container>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav>
                                <Nav.Link className="btn btn-link text-light mx-1 btn-primary text-uppercase text-decoration-none " as={Link} to="/searchpet">Search pet</Nav.Link>
                            </Nav>
                            <Nav>
                                <Nav.Link className="btn btn-link text-light mx-1 btn-primary text-uppercase text-decoration-none " as={Link} to='/viewopets'>My Pets</Nav.Link>
                            </Nav>
                            <Nav className='me-auto'>
                                <Nav.Link className="btn btn-link text-light mx-1 btn-primary text-uppercase text-decoration-none " as={Link} to="/petregistration">Sell pet</Nav.Link>
                            </Nav>
                            <Nav>
                                <Nav.Link className="btn btn-link text-light btn-primary text-uppercase text-decoration-none " as={Link} to='/cart'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                </svg></Nav.Link>
                            </Nav>
                            <Nav >
                                <Nav.Link className=" btn btn-link text-light mx-2 btn-primary text-uppercase text-decoration-none " as={Link} to="/profile">Profile</Nav.Link>
                            </Nav>
                            <Nav>
                                <Nav.Link as={Link} onClick={this.logout} className="btn text-light btn-danger mx-1 text-uppercase text-decoration-none " to="/home">Logout</Nav.Link>
                            </Nav>


                        </Navbar.Collapse></Container>
                </Navbar>
                <div className="row">
                    <div className="col-sm-4 text-secondary"><h4>Hello! {this.state.custfname}</h4></div>
                </div>
            </>
        )
    }
}
