import React, { useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { ServiceContext } from "../context/ServiceContext";
import API_BASE_URL from "../services/api";
import "./Service.css";

function Service() {
  const { services, error } = useContext(ServiceContext);
  const controls = useAnimation();
  const speedRef = useRef(10);
  const positionRef = useRef(0);

  useEffect(() => {
    let frame;
    let mounted = true;

    const move = () => {
      if (!mounted) return;
      positionRef.current -= speedRef.current / 100;
      if (positionRef.current <= -100) positionRef.current = 0;
      controls.start({ x: `${positionRef.current}%`, transition: { ease: "linear", duration: 0 } });
      frame = requestAnimationFrame(move);
    };

    frame = requestAnimationFrame(move);
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
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [controls]);

  return (
    <section className="services" id="services">
      <h2 className="services-title">Nos services Gypsum</h2>
      {error && <p className="error">{error}</p>}
      <div className="carousel-wrapper">
        <motion.div className="services-carousel" animate={controls}>
          {[...services, ...services].map((item, index) => (
            <Link key={index} to={item.link || "#"} className="service-card-link">
              <div className="service-card">
                <img src={`${API_BASE_URL}${item.image}`} alt={item.title} className="service-img" />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="arrow-link">
                  <FaArrowRight size={15} />
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Service;
