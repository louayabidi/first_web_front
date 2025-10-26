import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.png";
import { AiOutlineLogout } from 'react-icons/ai';


const Navbar = ({ isAdmin }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload(); // Refresh state
  };

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <img src={logo} alt="Logo" className="aulogo" />

      <button className="navbar-toggle" onClick={toggleMenu}>
        ☰
      </button>

      <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <Link to="/" onClick={() => setIsMenuOpen(false)}>Accueil</Link>
        <Link to="/about" onClick={() => setIsMenuOpen(false)}>À propos de moi</Link>
        <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contactez-moi</Link>

        {isAdmin && (
          <Link to="/admin" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
        )}

        {!isLoggedIn ? (
          <Link to="/login" onClick={() => setIsMenuOpen(false)}>Connexion</Link>
        ) : (
          <button className="logout-btn" onClick={() => { handleLogout(); setIsMenuOpen(false); }}>
            <AiOutlineLogout size={20} title="Logout" />
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;