import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.png";
import { AiOutlineLogout } from 'react-icons/ai';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = ({ isAdmin }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { to: "/", label: "Accueil" },
    { to: "/about", label: "À propos" },
    { to: "/contact", label: "Contact" },
    { to: "services/Galleries", label: "Galerie" },
  ];

  if (isAdmin) {
    navLinks.push({ to: "/admin", label: "Dashboard" });
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/95 backdrop-blur-md shadow-xl"
            : "bg-black/50 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group" onClick={closeMenu}>
              <motion.img
                src={logo}
                alt="Logo"
                className="w-10 h-10 md:w-12 md:h-12"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              />
              <motion.span
                className="text-xl md:text-2xl font-black bg-gradient-to-r from-white via-amber-400 to-white bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
              >
                SUPERSTAFF
              </motion.span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.to}
                    className="relative text-white hover:text-amber-400 font-medium transition-colors duration-300 group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 group-hover:w-full transition-all duration-300" />
                  </Link>
                </motion.div>
              ))}

              {!isLoggedIn ? (
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-full hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg"
                  >
                    Connexion
                  </motion.button>
                </Link>
              ) : (
                <motion.button
                  onClick={handleLogout}
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-white/10 backdrop-blur-sm hover:bg-red-500 text-white rounded-full transition-all duration-300"
                  title="Logout"
                >
                  <AiOutlineLogout size={20} />
                </motion.button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={toggleMenu}
              whileTap={{ scale: 0.9 }}
              className="lg:hidden p-2 text-white hover:text-amber-400 transition-colors z-50 relative"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaTimes size={28} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaBars size={28} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu Overlay - Full Screen */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm lg:hidden z-40"
                onClick={closeMenu}
              />

              {/* Menu Content */}
              <motion.div
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
                className="fixed top-20 right-0 bottom-0 w-full sm:w-80 bg-black lg:hidden z-40 overflow-y-auto"
                style={{
                  boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.5)'
                }}
              >
                {/* Decorative gradient border */}
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600" />

                <div className="p-6 space-y-2">
                  {/* Navigation Links */}
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.to}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={link.to}
                        onClick={closeMenu}
                        className="block px-6 py-4 text-white hover:text-amber-400 hover:bg-white/5 rounded-xl transition-all font-semibold text-lg border border-transparent hover:border-amber-500/30"
                      >
                        <div className="flex items-center justify-between">
                          <span>{link.label}</span>
                          <span className="text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}

                  {/* Divider */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.4 }}
                    className="my-6 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"
                  />

                  {/* Auth Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    {!isLoggedIn ? (
                      <Link to="/login" onClick={closeMenu}>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          className="w-full px-6 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg hover:shadow-amber-500/50"
                        >
                          Connexion
                        </motion.button>
                      </Link>
                    ) : (
                      <motion.button
                        onClick={() => {
                          handleLogout();
                          closeMenu();
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-red-500/50 flex items-center justify-center gap-2"
                      >
                        <AiOutlineLogout size={20} />
                        <span>Déconnexion</span>
                      </motion.button>
                    )}
                  </motion.div>

                  {/* Footer Info */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-8 pt-6 border-t border-white/10"
                  >
                    <div className="text-center text-gray-400 text-sm">
                      <p className="font-semibold text-amber-400 mb-1">SUPERSTAFF</p>
                      <p>Excellence depuis 2010</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-20" />
    </>
  );
};

export default Navbar;