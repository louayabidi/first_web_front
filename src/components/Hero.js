import React, { useState, useEffect } from "react";
import "./Hero.css";
import hero4 from "../assets/immeuble3.jpg";
import hero2 from "../assets/hero2.jpg";
import { FaArrowDown } from "react-icons/fa";

function Hero() {
  const images = [
    { src: hero2, alt: "Décoration en plâtre élégante" },
    { src: hero4, alt: "Projet d'immeuble en staff" },
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Slower transition (5s) for a calmer effect
    return () => clearInterval(interval);
  }, [images.length]);

  const scrollToServices = () => {
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero">
      <div
        className="hero-background"
        style={{ backgroundImage: `url(${images[index].src})` }}
        role="img"
        aria-label={images[index].alt}
      ></div>
      <div className="hero-overlay">
        <div className="hero-text container">
          <h1>Créations Gypsum Élégantes</h1>
          <p>
            Nous proposons des solutions complètes en staff et plâtre décoratif,
            alliant élégance, modernité et savoir-faire artisanal. Qu’il s’agisse
            de décoration intérieure ou extérieure, de restauration ou de fabrication
            sur mesure, nos réalisations apportent raffinement, style et confort à
            chaque espace.
          </p>
          <div className="hero-buttons">
            <a href="#services" onClick={scrollToServices}>
              <button className="hero-button primary">Nos Services</button>
            </a>
            <a href="/contact">
              <button className="hero-button secondary">Contactez-nous</button>
            </a>
          </div>
        </div>
        <div className="carousel-dots">
          {images.map((_, i) => (
            <span
              key={i}
              className={`dot ${i === index ? "active" : ""}`}
              onClick={() => setIndex(i)}
              role="button"
              aria-label={`Go to slide ${i + 1}`}
            ></span>
          ))}
        </div>
        <button
          className="scroll-down"
          onClick={scrollToServices}
          aria-label="Scroll to services section"
        >
          <FaArrowDown />
        </button>
      </div>
    </section>
  );
}

export default Hero;