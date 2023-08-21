import React, { useContext, useState } from 'react'
import LoginAPI from '../services/LoginAPI';
import Nav from 'react-bootstrap/Nav'
import {
  Link, useNavigate
} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'
import { UserContext } from '../App';

export default function Login() {
  const navigate = useNavigate();
  const { state1, dispatch } = useContext(UserContext);

  const [logindetails, setLogindetails] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const userlogin = e => {
    e.preventDefault();
    var regexEmail = /\S+@\S+\.\S+/;
    if (logindetails.email === '' || regexEmail.test(logindetails.email) !== true) {
      toast.error("Please enter valid email", { autoClose: 2000, position: toast.POSITION.TOP_RIGHT })
      return false;
    }
    var regexPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z]).{5,}$/;;
    if (logindetails.password === '' || regexPassword.test(logindetails.password) !== true) {
      toast.error("Please enter valid password", { autoClose: 2000, position: toast.POSITION.TOP_RIGHT })
      return false;
    }

    LoginAPI.Login(logindetails.email, logindetails.password)
      .then(response => {
        dispatch({ type: "USER", payload: true });

        console.log(state1);
        setMessage('Login successful.');
        console.log(response.data.loginid.usertype);
        sessionStorage.setItem("role", response.data.loginid.usertype);

        let role = sessionStorage.getItem("role");
        console.log(role);


        if (response.data.loginid.usertype === "customer") {
          sessionStorage.setItem("customer", JSON.stringify(response.data));
          navigate("/customerDashboard");
        }
        else {
          sessionStorage.setItem("admin", JSON.stringify(response.data));
          navigate("/adminDashboard");
        }
      })
      .catch(error => {
        setMessage('Invalid email or password');
        toast.error('Invalid email or password', { autoClose: 2000, position: toast.POSITION.TOP_RIGHT });
        //err.response.data => DTO on the server side : ErrorResponse
        console.log(error);
      });

  }

  const onChange = e => setLogindetails({ ...logindetails, [e.target.name]: e.target.value });

  return (
    <div className="container overflow-hidden mb-5" >
      <div className="row my-3">
        <div className="text-light col-sm-8">

        </div>
        <div className="col-sm-4">
          <Nav.Link as={Link} to='/home'><h6 className='btn btn-secondary px-4 text-uppercase offset-8'>Back</h6></Nav.Link>
        </div>
      </div>
      <form className="container form-control rounded pt-2" style={{ width: "25rem" }}>
        <h4 className='pt-1'>Log in</h4><hr></hr>
        <div className="form-group">
          <input id="email" style={{ height: "3rem" }} type="email" className="form-control mt-3" placeholder="Email" name="email" value={logindetails.email} onChange={onChange} />
        </div>
        <div className="form-group my-3">
          <input style={{ height: "3rem" }} type="password" className="form-control" name="password" placeholder="Password" value={logindetails.password} onChange={onChange} />
        </div>
        <div>
          <div>
            <button style={{ width: "60%" }} className="btn btn-lg btn-primary fw-bold mb-1" onClick={userlogin} >Log in</button>
            <ToastContainer />
          </div>
          <h5 className='text-danger'>{message}</h5>
        </div>
        <div>
          <Nav.Link as={Link} to='/forgotPassword'><h4 className='btn text-decoration-none btn-link mb-2 '>Forgot Password?</h4></Nav.Link>
        </div><hr></hr>
        <div className='mb-3'>
          <Nav.Link as={Link} to='/customerregistration'>Don't have an account?<h6 className='btn fw-bold text-success'>Sign Up</h6></Nav.Link>
        </div>
      </form>
      <span id="span"></span>
    </div>

  );

}
/*
import React, { useReducer } from 'react';

function loginReducer(state, action) {
  switch (action.type) {
    case 'field': {
      return {
        ...state,
        [action.fieldName]: action.payload,
      };
    }
    case 'login': {
      return {
        ...state,
        error: '',
        isLoading: true,
      };
    }
    case 'success': {
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
      };
    }
    case 'error': {
      return {
        ...state,
        error: 'Incorrect username or password!',
        isLoggedIn: false,
        isLoading: false,
        username: '',
        password: '',
      };
    }
    case 'logOut': {
      return {
        ...state,
        isLoggedIn: false,
      };
    }
    default:
      return state;
  }
}
const initialState = {
  username: '',
  password: '',
  isLoading: false,
  error: '',
  isLoggedIn: false,
};
export default function LoginUseReducer() {
  const [state, dispatch] = useReducer(loginReducer, initialState);
  const { username, password, isLoading, error, isLoggedIn } = state;
  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'login' });
    try {
      await function login({ username, password }) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (username === 'ejiro' && password === 'password') {
              resolve();
            } else {
              reject();
            }
          }, 1000);
        });
      }
      dispatch({ type: 'success' });
    } catch (error) {
      dispatch({ type: 'error' });
    }
  };
  return (
    <div className='App'>
      <div className='login-container'>
        {isLoggedIn ? (
          <>
            <h1>Welcome {username}!</h1>
            <button onClick={() => dispatch({ type: 'logOut' })}>
              Log Out
            </button>
          </>
        ) : (
          <form className='form' onSubmit={onSubmit}>
            {error && <p className='error'>{error}</p>}
            <p>Please Login!</p>
            <input
              type='text'
              placeholder='username'
              value={username}
              onChange={(e) =>
                dispatch({
                  type: 'field',
                  fieldName: 'username',
                  payload: e.currentTarget.value,
                })
              }
            />
            <input
              type='password'
              placeholder='password'
              autoComplete='new-password'
              value={password}
              onChange={(e) =>
                dispatch({
                  type: 'field',
                  fieldName: 'password',
                  payload: e.currentTarget.value,
                })
              }
            />
            <button className='submit' type='submit' disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Log In'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
*/