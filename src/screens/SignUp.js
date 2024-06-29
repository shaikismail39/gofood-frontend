import React, { useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function SignUp() {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" });
  const [signupSuccess, setSignupSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`https://gofood-backend-2.onrender.com/api/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })
    });

    const data = await response.json();

    if (!data.success) {
      alert("Enter Valid Credentials");
    } else {
      console.log(data);
      setSignupSuccess(true);
    }
  }

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  }

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

  // Render login page conditionally upon successful signup
  if (signupSuccess) {
    return (
      <>
        <Navbar />
        <div style={backgroundStyle}>
          <div className="container mt-5">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <div className="card shadow-lg border-0 rounded-lg">
                  <div className="card-header bg-primary text-white">
                    <h3 className="text-center font-weight-light my-4">Sign Up</h3>
                  </div>
                  <div className="card-body">
                    <div className="alert alert-success" role="alert">
                      Successfully signed up! Redirecting to login page...
                    </div>
                  </div>
                  <div className="card-footer text-center py-3">
                    <div className="small">
                      If you are not redirected automatically, <a href="/login">click here</a> to login.
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

  // Render signup form if signupSuccess is false
  return (
    <>
      <Navbar />
      <div style={backgroundStyle}>
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card shadow-lg border-0 rounded-lg">
                <div className="card-header bg-primary text-white">
                  <h3 className="text-center font-weight-light my-4">Sign Up</h3>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                      <label htmlFor="name">Name</label>
                      <input type="text" className="form-control" id="name" name='name' value={credentials.name} onChange={onChange} placeholder="Enter your name" required />
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="email">Email address</label>
                      <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onChange} placeholder="name@example.com" required />
                      <small className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="password">Password</label>
                      <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange} placeholder="Enter your password" required />
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="geolocation">Address</label>
                      <input type="text" className="form-control" id="geolocation" name='geolocation' value={credentials.geolocation} onChange={onChange} placeholder="Enter your address" required />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                  </form>
                </div>
                <div className="card-footer text-center py-3">
                  <div className="small">
                    Already have an account? <a href="/login">Sign in!</a>
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
