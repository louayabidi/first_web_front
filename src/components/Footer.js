import React, { useState } from "react";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaTiktok,
  FaArrowUp,
} from "react-icons/fa";

function Footer() {
  const adresse = "Rue Léopold Vendries Paris, France";
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(adresse)}`;
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(218, 165, 32, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(218, 165, 32, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-amber-900/20" />

      {/* Floating Particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-amber-400 rounded-full opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Logo & About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="SuperStaff Logo" className="w-12 h-12" />
              <h2 className="text-2xl font-black bg-gradient-to-r from-white via-amber-400 to-white bg-clip-text text-transparent">
                SUPERSTAFF
              </h2>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Artisans staffeurs qualifiés depuis plus de 20 ans, nous réalisons vos projets de
              création, d'amélioration et de rénovation avec passion et excellence, partout en France.
            </p>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-amber-400 mb-6">Contact</h3>
            <ul className="space-y-4">
              <motion.li whileHover={{ x: 5 }} className="transition-all">
                <a 
                  href="tel:+33758880671" 
                  className="flex items-center gap-3 text-gray-300 hover:text-amber-400 transition-colors"
                  aria-label="Call us at +33 758 880 671"
                >
                  <FaPhoneAlt className="text-amber-400" />
                  <span>+33 758 880 671</span>
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} className="transition-all">
                <a 
                  href="mailto:superstaff91@gmail.com" 
                  className="flex items-center gap-3 text-gray-300 hover:text-amber-400 transition-colors"
                  aria-label="Email us"
                >
                  <FaEnvelope className="text-amber-400" />
                  <span className="text-sm">superstaff91@gmail.com</span>
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} className="transition-all">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-gray-300 hover:text-amber-400 transition-colors"
                  aria-label={`View ${adresse} on Google Maps`}
                >
                  <FaMapMarkerAlt className="text-amber-400 mt-1" />
                  <span className="text-sm">{adresse}</span>
                </a>
              </motion.li>
            </ul>
          </motion.div>

          {/* Social Media & Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-amber-400 mb-6">Suivez-nous</h3>
            <div className="flex gap-4 mb-8">
              {[
                { href: "https://www.facebook.com/profile.php?id=61581627287473&mibextid=rS40aB7S9Ucbxw6v", icon: FaFacebook, label: "Facebook" },
                { href: "https://www.tiktok.com", icon: FaTiktok, label: "TikTok" },
                { href: "https://www.linkedin.com", icon: FaLinkedin, label: "LinkedIn" },
                { href: "https://www.instagram.com", icon: FaInstagram, label: "Instagram" },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Follow us on ${social.label}`}
                  className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-amber-500 hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon className="text-lg" />
                </motion.a>
              ))}
            </div>

            <h3 className="text-xl font-bold text-amber-400 mb-4">Newsletter</h3>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre email"
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-all"
                  aria-label="Enter your email for newsletter"
                  required
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg"
                aria-label="Subscribe to newsletter"
              >
                S'inscrire
              </motion.button>
            </form>
            {subscribed && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 text-green-400 text-sm font-semibold"
              >
                ✓ Inscription réussie !
              </motion.p>
            )}
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="relative pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} SUPERSTAFF — Tous droits réservés.
            </p>
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 bg-amber-500 hover:bg-amber-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all"
              aria-label="Back to top"
            >
              <FaArrowUp className="text-lg" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;