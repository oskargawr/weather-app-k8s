import React, { useEffect, useState, useRef } from 'react';
import keycloak from '../keycloak';

const useAuth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const isRun = useRef(false);

  useEffect(() => {
    if (isRun.current) return;

    isRun.current = true;
    keycloak.init({ onLoad: 'check-sso' }).then(authenticated => {
      if (authenticated) {
        setIsLogin(true);
        setToken(keycloak.token);
        const roles = keycloak.tokenParsed.realm_access.roles;
        setRole(roles.includes('admin') ? 'admin' : 'user');
      } else {
        setIsLogin(false);
      }
    });
  }, []);

  return [isLogin, token, role];
};

export default useAuth;
