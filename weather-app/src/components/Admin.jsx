import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import './admin.css';
import {jwtDecode} from 'jwt-decode';



const Admin = ({ token }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };

  const [history, setHistory] = useState({});
  const [showHistory, setShowHistory] = useState(false);
  const decodedToken = jwtDecode(token);
  const { email } = decodedToken;
  const role = decodedToken.realm_access.roles.includes('admin') ? 'admin' : 'user';

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.post('/api/history', {role}, config);
        setHistory(response);
      } catch (error) {
        console.error(error);
      }
    };

    if (role === 'admin') {
      fetchHistory();
    }

  }, []);

  const handleLoadHistory = async () => {
    console.log("klikam")
    setShowHistory(true);
    try {
      const response = await axios.post('/api/history', {role}, config);
      setHistory(response.data);
      console.log(response.data)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='container mt-5'>
      <h1>Admin Page</h1>
      <p>Accessible only to admin users</p>
      <div className="admin-panel card mb-4">
        <div className="token-container card-body">
          <h5 className="card-title">Token</h5>
          <p className="token-val card-text">{token}</p>
        </div>
      </div>
      <div className="mb-4">
        <button className="btn" onClick={handleLoadHistory}>
          Load History
        </button>
      </div>
      {showHistory && (
        <div className="history-container">
          <h2>Search History</h2>
          {Object.keys(history).map((email) => (
            <div key={email} className="mb-3">
              <h3>{email}</h3>
              <ul className="list-group">
                {Array.isArray(history[email]) ? (
                  history[email].map((item, index) => (
                    <li key={index} className="list-group-item">
                      {item.city} - {new Date(item.timestamp).toLocaleString()}
                    </li>
                  ))
                ) : (
                  <li className="list-group-item">No history available</li>
                )}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Admin;