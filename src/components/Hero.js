import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaPlay } from "react-icons/fa";

// Demo images - replace with your actual images
const hero2 = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80";
const hero4 = "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&q=80";

function Hero() {
  const images = [
    { src: hero2, alt: "Décoration en plâtre élégante", title: "Élégance Artistique" },
    { src: hero4, alt: "Projet d'immeuble en staff", title: "Architecture Moderne" },
  ];
  const [index, setIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToServices = () => {
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.section 
      style={{ opacity }}
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(218, 165, 32, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(218, 165, 32, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }} />
      </div>

      {/* Dynamic Background Images */}
      {images.map((image, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{
            opacity: i === index ? 1 : 0,
            scale: i === index ? 1 : 1.2,
            x: i === index ? mousePosition.x : 0,
            y: i === index ? mousePosition.y : 0,
          }}
          transition={{ duration: 1.5, ease: [0.6, 0.05, 0.01, 0.9] }}
        >
          <div
            className="w-full h-full bg-cover bg-center filter brightness-75"
            style={{ backgroundImage: `url(${image.src})` }}
          />
        </motion.div>
      ))}

      {/* Colorful Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-blue-900/30 to-amber-900/40 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-amber-400 rounded-full opacity-40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Main Content */}
      <div className="relative z-20 h-full flex items-center justify-center px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Small Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center mb-6"
          >
            <div className="inline-flex items-center gap-2 px-6 py-2 bg-amber-500/20 backdrop-blur-md border border-amber-400/30 rounded-full">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
              <span className="text-amber-300 text-sm font-medium tracking-wider uppercase">
                Excellence depuis 2010
              </span>
            </div>
          </motion.div>

          {/* Main Title with 3D Effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mb-8"
          >
            <motion.h1
              className="text-7xl md:text-9xl font-black mb-4 leading-none"
              style={{
                background: 'linear-gradient(135deg, #fff 0%, #fbbf24 50%, #f59e0b 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 10px 30px rgba(251, 191, 36, 0.3)',
              }}
              animate={{
                textShadow: [
                  '0 10px 30px rgba(251, 191, 36, 0.3)',
                  '0 10px 50px rgba(251, 191, 36, 0.6)',
                  '0 10px 30px rgba(251, 191, 36, 0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              SUPER STAFF
            </motion.h1>
            
            {/* Subtitle with typing effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-2xl md:text-4xl font-bold text-white/90 tracking-wide"
            >
              {images[index].title}
            </motion.div>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-4xl mx-auto text-center mb-12 px-4"
          >
            Des solutions complètes en <span className="text-amber-400 font-semibold">staff et plâtre décoratif</span>, 
            alliant élégance, modernité et savoir-faire artisanal pour transformer vos espaces en œuvres d'art.
          </motion.p>

          {/* CTA Buttons with crazy hover effects */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.a
              href="#services"
              onClick={scrollToServices}
              whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
              whileTap={{ scale: 0.95 }}
              className="group relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse" />
              <button className="relative px-10 py-5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-lg font-bold rounded-2xl shadow-2xl flex items-center gap-3 overflow-hidden">
                <span className="relative z-10">Découvrir Nos Services</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  <FaPlay className="text-sm" />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-700 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              </button>
            </motion.a>

            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative"
            >
              <button className="relative px-10 py-5 bg-white/10 backdrop-blur-xl text-white text-lg font-bold rounded-2xl border-2 border-white/30 hover:border-amber-400 hover:bg-white/20 transition-all duration-300 shadow-2xl">
                Demander un Devis Gratuit
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/20 to-amber-400/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>
            </motion.a>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16"
          >
            {[
              { number: "500+", label: "Projets Réalisés" },
              { number: "15+", label: "Années d'Expérience" },
              { number: "100%", label: "Satisfaction Client" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1, y: -5 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-black text-amber-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-gray-300 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Carousel Indicators - Modern Style */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex gap-4 z-30">
        {images.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setIndex(i)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={`transition-all duration-500 ${
              i === index
                ? "w-16 h-2 bg-gradient-to-r from-amber-400 to-amber-600"
                : "w-2 h-2 bg-white/40 hover:bg-white/70"
            } rounded-full`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 cursor-pointer"
        onClick={scrollToServices}
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="flex flex-col items-center gap-2 group">
          <div className="text-amber-400 text-xs font-semibold tracking-widest uppercase opacity-80 group-hover:opacity-100 transition-opacity">
            Scroll
          </div>
          <motion.div
            className="w-6 h-10 border-2 border-amber-400 rounded-full flex justify-center pt-2"
            whileHover={{ borderColor: '#fbbf24' }}
          >
            <motion.div
              className="w-1.5 h-1.5 bg-amber-400 rounded-full"
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Corner Decorations */}
      <div className="absolute top-0 left-0 w-40 h-40 border-l-4 border-t-4 border-amber-500/30 rounded-tl-3xl" />
      <div className="absolute bottom-0 right-0 w-40 h-40 border-r-4 border-b-4 border-amber-500/30 rounded-br-3xl" />

      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
    </motion.section>
  );
}

export default Hero;