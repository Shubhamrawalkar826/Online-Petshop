
import React from 'react';
import { Button } from 'react-bootstrap';
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
            <div className="d-flex flex-column justify-content-center w-100 h-100 position-fixed">
                <h4 className="font-weight-bolder text-light text-uppercase">Online PetShop</h4>
                <div className="container w-50">
                    <p className="display-6 text-muted text-center">Buy or sell pets from this online pet shop</p>
                </div>
                {role ?
                    (<span>
                        <h4 className='text-success text-uppercase'>You are already logged in</h4>
                        <Button className='btn-secondary btn-lg' onClick={() => navigate(-1)}>BACK</Button>
                    </span>) :
                    (<div>
                        <NavLink className="btn btn-lg btn-outline-light text-uppercase text-decoration-none mx-3" to="/login">Login</NavLink>
                        <NavLink className="btn btn-lg btn-dark text-uppercase text-decoration-none mx-3" to="/customerregistration">Sign Up</NavLink>
                    </div>)
                }
            </div>

        </>
    )
}

export default Home
