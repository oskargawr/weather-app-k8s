import React from 'react';
import keycloak from '../keycloak';

const Login = () => {
  const login = () => {
    // keycloak.login({ redirectUri: 'http://localhost:5173/home' });
    keycloak.login();
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5" style={{ backgroundColor: 'transparent', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', color: 'white', borderRadius: '10px' }}>
            <div className="card-body">
              <h1 className="card-title text-center">Login Page</h1>
              <div className="text-center">
                <button onClick={login} className="btn btn-outline-light btn-block">Log in with Keycloak</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
