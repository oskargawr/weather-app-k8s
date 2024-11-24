import React from 'react';
import keycloak from '../keycloak';

const LogoutButton = () => {
  const handleLogout = () => {
    keycloak.logout();
  };

  return (
    <button className="btn btn-outline-light" onClick={handleLogout}>
      Log out
    </button>
  );
};

export default LogoutButton;
