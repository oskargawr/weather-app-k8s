import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Protected from './components/Protected';
import Public from './components/Public';
import Admin from './components/Admin';
import Login from './components/Login';
import NavBar from './components/NavBar';
import useAuth from './hooks/useAuth';
import Home from './components/Home';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

function App() {
  const [isLogin, token, role] = useAuth();

  return (
    <Router>
      <NavBar isLogin={isLogin} role={role} />
      <Routes>
        <Route path="/" element={isLogin ? <Navigate to={role === 'admin' ? '/admin' : '/public'} /> : <Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/public" element={isLogin ? <Public token={token}/> : <Navigate to="/login" />} />
        <Route path="/protected" element={isLogin ? <Protected token={token} /> : <Navigate to="/login" />} />
        <Route path="/admin" element={isLogin && role === 'admin' ? <Admin token={token} /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
