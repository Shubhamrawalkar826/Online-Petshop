import React, { useEffect, useState } from 'react'
import { Button, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CustomerregistrationAPI from '../services/CustomerregistrationAPI';
import LoginAPI from '../services/LoginAPI';

function Allregisteredusers() {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");


    useEffect(() => {
        reloadUsersList();
        if (sessionStorage.getItem("role") == null) {
            window.location = "/"
        }
    }, [])

    const reloadUsersList = () => {
        CustomerregistrationAPI.fetchAllCustomers()
            .then((resp) => {
                setUsers(resp.data);
                setUsers(users.filter(users => users.usertype !== "admin"));
                setMessage("Users list rendered successfully");
                console.log(message);
            });
    }

    const UpdateUserStatus = (lid, stat1) => {
        LoginAPI.UpdateStatus(lid, stat1).then((resp) => {

            setMessage("Users list rendered successfully");

            console.log(message);
            reloadUsersList();
        });
    }

    const toggler = (lid, st) => {
        console.log(lid, st);
        if (st === 'inactive') {
            let stat1 = 'active';
            UpdateUserStatus(lid, stat1);
        }
        else {
            let stat1 = 'inactive';
            UpdateUserStatus(lid, stat1);
        }

    }

    const logout = () => {
        LoginAPI.logoutAdmin()
    }

    return (
        <>
            <div className="container my-4">
                <Nav className='justify-content-end'>
                    <Nav.Link as={Link} onClick={logout} className="btn btn-danger text-light offset-10 text-uppercase text-decoration-none " to="/home">Logout</Nav.Link>
                </Nav>
                {users.length === 0 ? <h3>No users in database</h3> :
                    <div className='mt-4'>

                        <table className="table text-light table-bordered">
                            <thead className="bg-dark text-light">
                                <tr>
                                    <th className="visually-hidden">Id</th>
                                    <th>LoginId</th>
                                    <th>Email</th>
                                    <th>UserType</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody className='bg-light text-dark'>
                                {
                                    users.map(
                                        users =>
                                            <tr key={users.loginid}>
                                                <td className="visually-hidden">{users.loginid}</td>
                                                <td>{users.loginid}</td>
                                                <td>{users.email}</td>
                                                <td>{users.usertype}</td>
                                                <td><Button onClick={() => { toggler(users.loginid, users.status) }}>{users.status}</Button></td>
                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        </>
    )
}

export default Allregisteredusers

