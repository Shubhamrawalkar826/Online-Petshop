
import React, { useEffect } from 'react';
<<<<<<< HEAD
=======
import { Button } from 'react-bootstrap';
>>>>>>> branch1
import { NavLink } from 'react-router-dom';

// const toLogin = () => {
//     return <Link to="/userLogin">Login</Link>
// }

const Home = () => {

    /*useEffect(() => {
        const reloadCount = sessionStorage.getItem('reloadCount');
        if (reloadCount < 2) {
            sessionStorage.setItem('reloadCount', String(reloadCount + 1));
            window.location.reload();
        } else {
            sessionStorage.removeItem('reloadCount');
        }
    }, []);*/

    let role = (sessionStorage.getItem("role"));
    console.log(role);

    return (
        <>
            <div className="d-flex flex-column justify-content-center align-items-center w-100 h-100 position-fixed" style={{ backgroundColor: 'transparent' }}>
                <h4 className="font-weight-bolder text-light text-uppercase">Online Pet Shop</h4>
                <div className="container w-50">
                    <p className="display-6 text-light text-center">Buy or sell pets from this online pet shop</p>
                </div>
                {role ?
                    (<span>
                        <h4 className='text-success text-uppercase'>You are already logged in</h4>
<<<<<<< HEAD
=======
                        <Button className='btn-secondary' onClick={() => window.history.back()}>Go back</Button>
>>>>>>> branch1
                    </span>) :
                    (<div>
                        <NavLink className="btn btn-lg btn-light text-uppercase text-decoration-none mx-3" to="/login">Login</NavLink>
                        <NavLink className="btn btn-lg btn-outline-light text-uppercase text-decoration-none mx-3" to="/customerregistration">Sign Up</NavLink>
                    </div>)
                }
            </div>
        </>
    )
}

export default Home
