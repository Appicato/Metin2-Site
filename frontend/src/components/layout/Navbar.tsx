// src/components/layout/Navbar.tsx
import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "text-teal-400 font-bold" : "hover:text-teal-300";

  return (
    <nav className="bg-gray-900 text-white p-4 flex items-center">
      {/* Link-Gruppe links */}
      <div className="flex space-x-6">
        <NavLink to="/" className={linkClass}>
          Home
        </NavLink>
        <NavLink to="/servers" className={linkClass}>
          Server
        </NavLink>
        <NavLink to="/items/server/1" className={linkClass}>
          Items
        </NavLink>
        <NavLink to="/items/add" className={linkClass}>
          Add Item
        </NavLink>
      </div>
      <div className="flex-1" /> {/* Spacer schiebt rechts weg */}
      {/* Link-Gruppe rechts */}
      <div className="flex space-x-6 items-center">
        {!token ? (
          <>
            <NavLink to="/auth/login" className={linkClass}>
              Login
            </NavLink>
            <NavLink to="/auth/register" className={linkClass}>
              Registrieren
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/profile" className={linkClass}>
              Profil
            </NavLink>
            <button
              onClick={handleLogout}
              className="hover:text-red-500 cursor-pointer bg-transparent border-none p-0 m-0"
              aria-label="Logout"
              type="button"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
