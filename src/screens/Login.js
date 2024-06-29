import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`https://gofood-backend-2.onrender.com/api/loginuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });

    const data = await response.json();

    if (!data.success) {
      alert("Enter Valid Credentials");
    } else {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", data.authToken);
      navigate("/");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const backgroundStyle = {
    backgroundImage: 'url("https://t4.ftcdn.net/jpg/02/92/20/37/360_F_292203735_CSsyqyS6A4Z9Czd4Msf7qZEhoxjpzZl1.jpg")', // Replace with your image path
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 20px'
  };

  return (
    <>
      <Navbar />
      <div style={backgroundStyle}>
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card shadow-lg border-0 rounded-lg">
                <div className="card-header bg-primary text-white">
                  <h3 className="text-center font-weight-light my-4">Login</h3>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                      <label htmlFor="exampleInputEmail1">Email address</label>
                      <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        name='email'
                        value={credentials.email}
                        onChange={onChange}
                        aria-describedby="emailHelp"
                        placeholder="Enter your email"
                        required
                      />
                      <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="exampleInputPassword1">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        name='password'
                        value={credentials.password}
                        onChange={onChange}
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-success btn-block">Login</button>
                  </form>
                </div>
                <div className="card-footer text-center py-3">
                  <div className="small">
                    <Link to="/createuser">New user? Create an account!</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
