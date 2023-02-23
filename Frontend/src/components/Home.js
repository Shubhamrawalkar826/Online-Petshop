
import React from 'react';
import Button from 'react-bootstrap/Button';
import { NavLink, useNavigate } from 'react-router-dom';

// const toLogin = () => {
//     return <Link to="/userLogin">Login</Link>
// }

const Home = () => {
    const navigate = useNavigate();
    /*useEffect(() => {
        const reloadCount = sessionStorage.getItem('reloadCount');
        if (reloadCount < 2) {
            sessionStorage.setItem('reloadCount', String(reloadCount + 1));
            window.location.reload();
        } else {
            sessionStorage.removeItem('reloadCount');
        }
    }, []);*/
    /*const myStyle = {
        backgroundImage: "url('Homepage.jpg')", backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed',
        backgroundSize: 'cover'
    }*/

    let role = (sessionStorage.getItem("role"));

    return (
        <>
            <div style={{ height: "34rem", margin: "auto auto auto 7rem" }} className="d-flex flex-column pt-5 justify-content-center w-60 position-absolute">
                <h1 className="text-dark text-uppercase">Online PetShop</h1>
                <div style={{ width: "35rem" }} className="container">
                    <p className="display-6  text-muted text-center">Buying and selling pets made easier</p>
                </div>
                {role ?
                    (<span>
                        <h4 className='text-success text-uppercase'>You are already logged in</h4>
                        <Button className='btn-secondary btn-lg' onClick={() => navigate(-1)}>BACK</Button>
                    </span>) :
                    (<div>
                        <NavLink className="btn btn-lg text-dark btn-outline-light text-uppercase text-decoration-none mx-3" to="/login">Login</NavLink>
                        <NavLink className="btn btn-lg btn-dark text-uppercase text-decoration-none mx-3" to="/customerregistration">Sign Up</NavLink>
                    </div>)
                }
            </div>
        </>
    )
}

export default Home
