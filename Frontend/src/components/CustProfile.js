import React, { Component } from 'react'
import { Container } from 'react-bootstrap';
import CustNavBar from './CustNavBar'

export default class CustProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            fname: null,
            lname: null,
            address: null,
            contactno: null,
            email: null
        }
    }
    componentDidMount() {
        let cust = JSON.parse(sessionStorage.getItem("customer"));
        console.log(cust);
        this.setState({
            fname: cust.fname,
            lname: cust.lname,
            address: cust.address,
            contactno: cust.contactno,
            email: cust.loginid.email
        });
        if (sessionStorage.getItem("role") == null) {
            window.location.href = "/";
        }
    }
    render() {
        return (
            <div className='overflow-hidden'>
                <CustNavBar />

                <Container className='bg-light rounded' style={{ minHeight: 270, width: 400 }}>
                    <h4 className='pt-2 mt-2'>CustProfile</h4><hr></hr>
                    <h5 className='mb-3'>First Name: {this.state.fname}</h5>
                    <h5 className='mb-3'>Last Name: {this.state.lname}</h5>
                    <h5 className='mb-3'>Address: {this.state.address}</h5>
                    <h5 className='mb-3'>Contact Number: {this.state.contactno}</h5>
                    <h5 className='mb-3'>Email: {this.state.email}</h5>
                </Container>
            </div>

        )
    }
}
