import React, { useRef, useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, useAnimation, useInView } from "framer-motion";
import { ServiceContext } from "../context/ServiceContext";
import API_BASE_URL from "../services/api";

// Import your actual images

import luxury1 from "../assets/luxury1.jpg";
import professionel from "../assets/professionel2.jpg";
import mesureImage from "../assets/mesure1.jpg";
import gypsumbImage from "../assets/gypsumb.jpg";
import Appartement from "../assets/Appartement1.jpg";
import Facades from "../assets/facade1.jpg";

function Service() {
  const { services: dynamicServices, error } = useContext(ServiceContext);
  const controls = useAnimation();
  const speedRef = useRef(5);
  const positionRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [isPaused, setIsPaused] = useState(false);

  const staticServices = [
 
    { 
      title: "Restauration", 
      image: professionel, 
      link: "/services/restauration", 
      isStatic: true,
      description: "Préservation du patrimoine architectural"
    },
    { 
      title: "Luxury", 
      image: luxury1, 
      link: "/services/Luxury", 
      isStatic: true,
      description: "Élégance et raffinement premium"
    },
    { 
      title: "Appartement", 
      image: Appartement, 
      link: "/services/Appartement", 
      isStatic: true,
      description: "Espaces résidentiels modernes"
    },
    { 
      title: "Sur Mesure", 
      image: mesureImage, 
      link: "/services/mesure", 
      isStatic: true,
      description: "Créations uniques et personnalisées"
    },
    { 
      title: "Design", 
      image: gypsumbImage, 
      link: "/services/design", 
      isStatic: true,
      description: "Innovation et créativité artistique"
    },
    { 
      title: "Facades", 
      image: Facades, 
      link: "/services/Facades", 
      isStatic: true,
      description: "Extérieurs élégants et durables"
    },
  ];

  const allServices = [...staticServices, ...dynamicServices];

  // Auto-scroll effect
  // Dans Service.jsx, remplacez le useEffect de l'auto-scroll par ceci :

useEffect(() => {
  let frame;
  let mounted = true;
  let autoScrollTimeout;

  const move = () => {
    if (!mounted || isDragging || isPaused) return;
    
    positionRef.current -= speedRef.current / 100;
    
    // Reset position for infinite loop
    if (positionRef.current <= -100) {
      positionRef.current = 0;
    }

    controls.set({
      x: `${positionRef.current}%`,
    });

    frame = requestAnimationFrame(move);
  };

  // ✨ Auto-scroll seulement pendant 10 secondes au début
  autoScrollTimeout = setTimeout(() => {
    setIsPaused(true); // Arrête l'auto-scroll après 10 secondes
  }, 10000);

  frame = requestAnimationFrame(move);

  return () => {
    mounted = false;
    if (frame) {
      cancelAnimationFrame(frame);
    }
    if (autoScrollTimeout) {
      clearTimeout(autoScrollTimeout);
    }
  };
}, [controls, isDragging, isPaused]);

  // Manual scroll with arrows
  const scroll = (direction) => {
    setIsPaused(true);
    const scrollAmount = 350;
    const newPosition = positionRef.current + (direction === 'left' ? scrollAmount / 100 : -scrollAmount / 100);
    
    positionRef.current = newPosition;
    
    controls.start({
      x: `${newPosition}%`,
      transition: { duration: 0.5, ease: "easeInOut" }
    });

    setTimeout(() => {
      setIsPaused(false);
    }, 600);
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden bg-black"
      id="services"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Animated Grid Background (matching Hero) */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(218, 165, 32, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(218, 165, 32, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-amber-900/20" />

      {/* Floating Particles (matching Hero) */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-amber-400 rounded-full opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0.1, 0.4, 0.1],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={titleVariants}
            className="text-5xl md:text-7xl font-black mb-4"
            style={{
              background: 'linear-gradient(135deg, #fff 0%, #fbbf24 50%, #f59e0b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            NOS SERVICES
          </motion.h2>

          <motion.p
            variants={titleVariants}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Des solutions professionnelles pour transformer vos espaces
          </motion.p>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-900/50 border-l-4 border-red-500 text-red-200 p-4 mb-8 rounded backdrop-blur-sm"
          >
            <p>{error}</p>
          </motion.div>
        )}

        {/* Services Carousel */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-md hover:bg-amber-500 text-white p-3 md:p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110 focus:outline-none"
            aria-label="Previous"
          >
            <FaChevronLeft className="text-lg md:text-xl" />
          </button>
          
          <button
            onClick={() => scroll('right')}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-md hover:bg-amber-500 text-white p-3 md:p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110 focus:outline-none"
            aria-label="Next"
          >
            <FaChevronRight className="text-lg md:text-xl" />
          </button>

          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

          <div className="overflow-hidden cursor-grab active:cursor-grabbing px-12 md:px-16">
            <motion.div
              className="flex gap-6 py-8"
              animate={controls}
              drag="x"
              dragConstraints={{ left: -allServices.length * 350, right: 100 }}
              dragElastic={0.05}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={() => setIsDragging(false)}
              whileTap={{ cursor: "grabbing" }}
            >
              {[...allServices, ...allServices].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 w-80 group"
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link 
                    to={item.link || "#"} 
                    className="block h-full no-underline"
                    onClick={(e) => isDragging && e.preventDefault()}
                  >
                    <div className="relative h-full bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-amber-500/20">
                      {/* Image Container */}
                      <div className="relative h-56 overflow-hidden">
                        <motion.img
                          src={item.isStatic ? item.image : `${API_BASE_URL}${item.image}`}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          animate={{
                            scale: hoveredIndex === index ? 1.1 : 1,
                          }}
                          transition={{ duration: 0.6 }}
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                        
                        {/* Hover Overlay */}
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-br from-amber-500/95 to-amber-600/95 flex items-center justify-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="text-white text-center">
                            <motion.div
                              animate={{ 
                                scale: hoveredIndex === index ? [1, 1.3, 1] : 1,
                                rotate: hoveredIndex === index ? [0, 360] : 0
                              }}
                              transition={{ duration: 0.6 }}
                            >
                              <FaArrowRight className="text-5xl mx-auto" />
                            </motion.div>
                            <p className="mt-3 font-bold text-lg">Découvrir</p>
                          </div>
                        </motion.div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                          {item.title}
                        </h3>
                        
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {item.description || "Service professionnel de qualité"}
                        </p>
                      </div>

                      {/* Glow Effect on Hover */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          boxShadow: '0 0 30px rgba(251, 191, 36, 0.6), inset 0 0 20px rgba(251, 191, 36, 0.2)'
                        }}
                      />

                      {/* Bottom Border Animation */}
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: hoveredIndex === index ? 1 : 0 }}
                        transition={{ duration: 0.4 }}
                        style={{ transformOrigin: "left" }}
                      />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-amber-400/80 text-sm">
            Glissez ou utilisez les flèches pour naviguer
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default Service;