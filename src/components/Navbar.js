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

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
            <Link to="/" className="flex items-center gap-3 group">
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
              className="lg:hidden p-2 text-white hover:text-amber-400 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-black/98 backdrop-blur-md border-t border-white/10"
            >
              <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={link.to}
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-4 py-3 text-white hover:text-amber-400 hover:bg-white/5 rounded-lg transition-all font-medium"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                <div className="pt-4 border-t border-white/10">
                  {!isLoggedIn ? (
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg"
                      >
                        Connexion
                      </motion.button>
                    </Link>
                  ) : (
                    <motion.button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                      <AiOutlineLogout size={20} />
                      Déconnexion
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-20" />
    </>
  );
};

export default Navbar;