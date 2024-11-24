import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const NavBar = ({ isLogin, role }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light bg-opacity-10 shadow-sm d-flex justify-content-between align-items-center fw-semibold">
            <ul className="navbar-nav d-flex align-items-center">
                <li className="nav-item">
                    <Link className="nav-link text-white" to="/home">Home</Link>
                </li>
                {isLogin && (
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/public">Pogoda</Link>
                    </li>
                )}
                {isLogin && role === 'admin' && (
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/admin">Admin</Link>
                    </li>
                )}
            </ul>
            <div className="d-flex align-items-center">
                <div className="mr-auto"></div> 
                <ul className="navbar-nav d-flex align-items-center">
                    {isLogin && (
                        <li className="nav-item">
                            <p className="nav-link text-white mb-0">Role: {role}</p>
                        </li>
                    )}
                    <li className="nav-item ml-auto">
                        {isLogin ? (
                            <LogoutButton />
                        ) : (
                            <Link className="nav-link text-white" to="/login">Login</Link>
                        )}
                    </li>
                    
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;
