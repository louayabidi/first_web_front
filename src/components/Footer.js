import React, { useState } from "react";
import "./Footer.css";
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
    // Simulate newsletter signup (replace with actual API call if needed)
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000); // Reset message after 3s
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="footer-container container">
        {/* Logo & About */}
        <div className="footer-column">
          <img src={logo} alt="SuperStaff Logo" className="footer-logo" />
          <h2 className="footer-title">SUPERSTAFF</h2>
          <p className="footer-text">
            Artisans staffeurs qualifiés depuis plus de 20 ans, nous réalisons vos projets de
            création, d’amélioration et de rénovation avec passion et excellence, partout en France.
          </p>
        </div>

        {/* Contact Info */}
        <div className="footer-column">
          <h3 className="footer-heading">Contact</h3>
          <ul className="contact-list">
            <li>
              <FaPhoneAlt className="icon" />
              <a href="tel:+33758880671" aria-label="Call us at +33 758 880 671">
                +33 758 880 671
              </a>
            </li>
            <li>
              <FaEnvelope className="icon" />
              <a href="mailto:sas.superstaff@gmail.com" aria-label="Email us">
                sas.superstaff@gmail.com
              </a>
            </li>
            <li>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${adresse} on Google Maps`}
              >
                <FaMapMarkerAlt className="icon location" />
                {adresse}
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media & Newsletter */}
        <div className="footer-column">
          <h3 className="footer-heading">Suivez-nous</h3>
          <div className="social-icons">
            <a
              href="https://www.facebook.com/profile.php?id=61581627287473&mibextid=rS40aB7S9Ucbxw6v"
              target="_blank"
              rel="noreferrer"
              aria-label="Follow us on Facebook"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.tiktok.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Follow us on TikTok"
            >
              <FaTiktok />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Follow us on LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Follow us on Instagram"
            >
              <FaInstagram />
            </a>
          </div>

          <h3 className="footer-heading">Newsletter</h3>
          <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre email"
              aria-label="Enter your email for newsletter"
              required
            />
            <button type="submit" aria-label="Subscribe to newsletter">
              S'inscrire
            </button>
          </form>
          {subscribed && <p className="newsletter-success">Inscription réussie !</p>}
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} SUPERSTAFF — Tous droits réservés.</p>
        <button className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
          <FaArrowUp />
        </button>
      </div>
    </footer>
  );
}

export default Footer;