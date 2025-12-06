import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaAward, FaUsers, FaHeart, FaCheckCircle } from "react-icons/fa";

// Import your actual images
import img1 from "../assets/maker1.png";
import img2 from "../assets/maker2.png";
import img3 from "../assets/maker3.png";

function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const features = [
    {
      icon: <FaAward className="text-4xl" />,
      title: "20+ Ans d'Excellence",
      description: "Plus de deux décennies de savoir-faire artisanal"
    },
    {
      icon: <FaUsers className="text-4xl" />,
      title: "Artisans Qualifiés",
      description: "Une équipe passionnée et certifiée"
    },
    {
      icon: <FaHeart className="text-4xl" />,
      title: "Qualité Française",
      description: "Partenaires et fournisseurs 100% français"
    }
  ];

  const values = [
    "Finitions soignées et professionnelles",
    "Respect des délais garantis",
    "Solutions sur mesure adaptées",
    "Tradition et modernité réunies"
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden bg-black"
      id="about"
    >
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

      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-amber-900/20" />

      {/* Floating Particles */}
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
          variants={containerVariants}
          className="text-center mb-20"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-6 py-2 bg-amber-500/20 backdrop-blur-md border border-amber-400/30 rounded-full mb-6"
          >
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            <span className="text-amber-300 text-sm font-medium tracking-wider uppercase">
              Notre Histoire
            </span>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl font-black mb-6"
            style={{
              background: 'linear-gradient(135deg, #fff 0%, #fbbf24 50%, #f59e0b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            À PROPOS DE SUPERSTAFF
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Plus de 20 ans d'excellence dans l'art du staff et du plâtre décoratif
          </motion.p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Text Content */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <p className="text-gray-300 text-lg leading-relaxed">
                Depuis plus de 20 ans, <strong className="text-amber-400">SUPERSTAFF</strong> réunit des artisans
                staffeurs passionnés et qualifiés, dédiés à l'art du staff. Notre
                mission est d'accompagner nos clients dans leurs projets de création,
                d'amélioration et de rénovation, en apportant des solutions sur mesure
                qui allient tradition et modernité.
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-gray-300 text-lg leading-relaxed">
                Présents partout en France métropolitaine, nous mettons un point
                d'honneur à perpétuer un savoir-faire artisanal reconnu, tout en
                respectant vos attentes les plus exigeantes. La qualité étant au cœur
                de nos valeurs, nous sélectionnons avec soin nos partenaires et
                privilégions exclusivement des fournisseurs français, gage de confiance
                et d'authenticité.
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-gray-300 text-lg leading-relaxed">
                Choisir <strong className="text-amber-400">SUPERSTAFF</strong>, c'est opter pour des finitions
                soignées, des délais respectés et l'assurance d'un travail réalisé avec
                passion et professionnalisme.
              </p>
            </motion.div>

            {/* Values List */}
            <motion.div variants={itemVariants} className="pt-6">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full" />
                Nos Engagements
              </h3>
              <div className="space-y-3">
                {values.map((value, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex items-center gap-3 group"
                  >
                    <FaCheckCircle className="text-amber-400 text-xl flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-gray-300">{value}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-amber-400 rounded-2xl blur-xl opacity-50" />
              
              <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-amber-500/30">
                <Carousel
                  showArrows={true}
                  autoPlay
                  infiniteLoop
                  showThumbs={false}
                  showStatus={false}
                  interval={4000}
                  transitionTime={800}
                  className="about-carousel-custom"
                >
                  <div className="h-96 md:h-[500px]">
                    <img 
                      src={img1} 
                      alt="Artisan staffeur au travail"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                  <div className="h-96 md:h-[500px]">
                    <img 
                      src={img2} 
                      alt="Projet de staff décoratif"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                  <div className="h-96 md:h-[500px]">
                    <img 
                      src={img3} 
                      alt="Réalisation en plâtre sur mesure"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                </Carousel>
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1, type: "spring", stiffness: 200 }}
              className="absolute -bottom-6 -left-6 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-6 shadow-2xl border-4 border-black"
            >
              <div className="text-center">
                <div className="text-4xl font-black text-white mb-1">20+</div>
                <div className="text-xs text-white/90 font-semibold uppercase tracking-wide">Années</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Feature Cards */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative group"
            >
              <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-amber-500/20 hover:border-amber-500/50 transition-all duration-300 overflow-hidden">
                {/* Background Gradient on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-600/0 group-hover:from-amber-500/10 group-hover:to-amber-600/10 transition-all duration-500" />
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom Border Animation */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  style={{ transformOrigin: "left" }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Custom Carousel Styles */}
      <style jsx>{`
        .about-carousel-custom .carousel .control-arrow {
          background: rgba(251, 191, 36, 0.3);
          backdrop-filter: blur(10px);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          opacity: 0;
          transition: all 0.3s ease;
        }

        .about-carousel-custom:hover .carousel .control-arrow {
          opacity: 1;
        }

        .about-carousel-custom .carousel .control-arrow:hover {
          background: rgba(251, 191, 36, 0.8);
          transform: scale(1.1);
        }

        .about-carousel-custom .carousel .control-dots .dot {
          background: rgba(255, 255, 255, 0.3);
          box-shadow: none;
          width: 12px;
          height: 12px;
          margin: 0 6px;
          transition: all 0.3s ease;
        }

        .about-carousel-custom .carousel .control-dots .dot.selected {
          background: #fbbf24;
          transform: scale(1.3);
        }

        .about-carousel-custom .carousel .control-dots .dot:hover {
          background: rgba(251, 191, 36, 0.6);
        }
      `}</style>
    </section>
  );
}

export default About;