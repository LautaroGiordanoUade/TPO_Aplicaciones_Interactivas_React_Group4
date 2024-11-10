import React from 'react';
import { useAuth } from "../../hooks/useAuth";

const LogoutButton = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <button className="btn btn-outline-danger" onClick={handleLogout}>
      <i className="bi bi-box-arrow-right" />
    </button>
  );
};

export default LogoutButton;