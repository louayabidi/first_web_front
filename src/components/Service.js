import React, { useRef, useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { ServiceContext } from "../context/ServiceContext";
import API_BASE_URL from "../services/api";
import plasteringImage from "../assets/restauration1.1.jpg";
import luxury1 from "../assets/luxury1.jpg";
import professionel from "../assets/professionel2.jpg";
import mesureImage from "../assets/mesure1.jpg";
import gypsumbImage from "../assets/gypsumb.jpg";
import Appartement from "../assets/Appartement1.jpg";
import Facades from "../assets/facade1.jpg";
import "./Service.css";

function Service() {
  const { services: dynamicServices, error } = useContext(ServiceContext);
  const controls = useAnimation();
  const speedRef = useRef(10);
  const positionRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  const staticServices = [
    { title: "Plastering", image: plasteringImage, link: "/services/plastering", isStatic: true },
    { title: "Restauration", image: professionel, link: "/services/restauration", isStatic: true },
    { title: "Luxury", image: luxury1, link: "/services/Luxury", isStatic: true },
    { title: "Appartement", image: Appartement, link: "/services/Appartement", isStatic: true },
    { title: "SurMesure", image: mesureImage, link: "/services/mesure", isStatic: true },
    { title: "Design", image: gypsumbImage, link: "/services/design", isStatic: true },
    { title: "Facades", image: Facades, link: "/services/Facades", isStatic: true },
  ];

  const allServices = [...staticServices, ...dynamicServices];

  useEffect(() => {
    let frame;
    let mounted = true;

    const move = () => {
      if (!mounted || isDragging) return;
      positionRef.current -= speedRef.current / 100;
      if (positionRef.current <= -100) positionRef.current = 0;

      controls.start({
        x: `${positionRef.current}%`,
        transition: { ease: "linear", duration: 0 },
      }).catch(() => {});

      frame = requestAnimationFrame(move);
    };

    const timeout = setTimeout(() => {
      frame = requestAnimationFrame(move);
    }, 0);

    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") speedRef.current = 40;
    };
    const handleKeyUp = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") speedRef.current = 10;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      mounted = false;
      cancelAnimationFrame(frame);
      clearTimeout(timeout);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [controls, isDragging]);

  return (
    <section className="services" id="services">
      <h2 className="services-title">Nos services Gypsum</h2>
      {error && <p className="error">{error}</p>}

      <div className="carousel-wrapper">
        <motion.div
          className="services-carousel"
          animate={controls}
          drag="x"
          dragConstraints={{ left: -allServices.length * 270, right: 0 }} // 270 = width+gap
          dragElastic={0.2}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          whileTap={{ cursor: "grabbing" }}
        >
          {[...allServices, ...allServices].map((item, index) => (
            <div key={index} className="service-card">
              <Link to={item.link || "#"} className="service-card-link">
                <img
                  src={item.isStatic ? item.image : `${API_BASE_URL}${item.image}`}
                  alt={item.title}
                  className="service-img"
                />
              </Link>
              <h3>{item.title}</h3>
              {!item.isStatic && item.description && <p>{item.description}</p>}
              {!item.isStatic && (
                <div className="arrow-link">
                  <FaArrowRight size={15} />
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Service;
