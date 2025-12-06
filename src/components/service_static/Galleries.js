import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FaTimes, FaChevronLeft, FaChevronRight, FaExpand, FaImage } from "react-icons/fa";

// Import your actual images
import img1 from "../../assets/galleries1.jpg";
import img2 from "../../assets/galleries2.jpg";
import img3 from "../../assets/galleries3.jpg";
import img4 from "../../assets/galleries4.jpg";
import img5 from "../../assets/galleries5.jpg";
import img6 from "../../assets/galleries6.jpg";
import img7 from "../../assets/galleries7.jpg";
import img8 from "../../assets/galleries8.jpg";
import img9 from "../../assets/galleries9.jpg";
import img10 from "../../assets/galleries10.jpg";
import img11 from "../../assets/galleries11.jpg";
import img12 from "../../assets/galleries12.jpg";
import img13 from "../../assets/galleries13.jpg";

function GalleryCard({ image, onClick, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      className="gallery-card-modern"
      onClick={() => onClick(image.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-image-wrapper">
        <img
          src={image.url}
          alt={`Galerie ${image.id}`}
          className="card-image-modern"
          loading="lazy"
        />
        
        {/* Gradient Overlay */}
        <div className="card-gradient-overlay" />
        
        {/* Hover Overlay */}
        <motion.div
          className="card-hover-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="expand-icon"
          >
            <FaExpand className="text-2xl" />
          </motion.div>
        </motion.div>

        {/* Content */}
        <motion.div
          className="card-content-modern"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3>Projet {image.id}</h3>
          <p>Découvrez ce projet exceptionnel</p>
        </motion.div>

        {/* Border Glow */}
        <motion.div
          className="card-border-glow"
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}

function ImageModal({ images, currentId, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(
    images.findIndex((img) => img.id === currentId)
  );

  const handlePrev = React.useCallback((e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  }, [images.length]);

  const handleNext = React.useCallback((e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  }, [images.length]);

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [onClose, handlePrev, handleNext]);

  if (currentIndex === -1) return null;

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay-modern"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Close Button */}
        <motion.button
          className="modal-close-modern"
          onClick={onClose}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <FaTimes />
        </motion.button>

        {/* Navigation Buttons */}
        <motion.button
          className="modal-nav-modern modal-prev-modern"
          onClick={handlePrev}
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <FaChevronLeft />
        </motion.button>

        <motion.button
          className="modal-nav-modern modal-next-modern"
          onClick={handleNext}
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <FaChevronRight />
        </motion.button>

        {/* Image Content */}
        <motion.div
          className="modal-content-modern"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.img
            key={currentIndex}
            src={currentImage.url}
            alt={`Galerie ${currentImage.id}`}
            className="modal-image-modern"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          />

          {/* Caption */}
          <motion.div
            className="modal-caption-modern"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h3>Projet {currentImage.id}</h3>
            <p>
              Image {currentIndex + 1} sur {images.length}
            </p>
          </motion.div>

          {/* Thumbnails Preview */}
          <motion.div
            className="modal-thumbnails"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {images.map((img, idx) => (
              <motion.div
                key={img.id}
                className={`thumbnail ${idx === currentIndex ? "active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <img src={img.url} alt={`Thumb ${img.id}`} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function Galleries() {
  const [selectedImageId, setSelectedImageId] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const galleryImages = [
    { id: 1, url: img1, category: "Intérieur" },
    { id: 2, url: img2, category: "Façade" },
    { id: 3, url: img3, category: "Design" },
    { id: 4, url: img4, category: "Intérieur" },
    { id: 5, url: img5, category: "Restauration" },
    { id: 6, url: img6, category: "Luxury" },
    { id: 7, url: img7, category: "Design" },
    { id: 8, url: img8, category: "Intérieur" },
    { id: 9, url: img9, category: "Façade" },
    { id: 10, url: img10, category: "Design" },
    { id: 11, url: img11, category: "Luxury" },
    { id: 12, url: img12, category: "Restauration" },
    { id: 13, url: img13, category: "Intérieur" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section ref={sectionRef} className="galleries-section-modern">
      {/* Animated Grid Background */}
      <div className="grid-background-galleries" />
      <div className="gradient-background-galleries" />

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="floating-particle-galleries"
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

      <div className="galleries-container-modern">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="galleries-header-modern"
        >
          <motion.div variants={itemVariants} className="galleries-badge">
            <FaImage className="badge-icon" />
            <span>Portfolio</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="galleries-title-modern">
            GALERIE DE NOS RÉALISATIONS
          </motion.h1>

          <motion.p variants={itemVariants} className="galleries-subtitle-modern">
            Découvrez une sélection de nos meilleurs travaux, alliant créativité,
            élégance et savoir-faire artisanal
          </motion.p>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="galleries-stats"
          >
            <div className="stat-item">
              <div className="stat-number">{galleryImages.length}</div>
              <div className="stat-label">Projets</div>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">Excellence</div>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <div className="stat-number">20+</div>
              <div className="stat-label">Années</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="galleries-grid-modern"
        >
          {galleryImages.map((image, index) => (
            <GalleryCard
              key={image.id}
              image={image}
              onClick={setSelectedImageId}
              index={index}
            />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="galleries-cta"
        >
          <p>Vous avez un projet en tête ?</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cta-button-modern"
          >
            Contactez-nous
          </motion.button>
        </motion.div>
      </div>

      {/* Modal */}
      {selectedImageId && (
        <ImageModal
          images={galleryImages}
          currentId={selectedImageId}
          onClose={() => setSelectedImageId(null)}
        />
      )}

      <style jsx>{`
        .galleries-section-modern {
          position: relative;
          padding: 6rem 0;
          min-height: 100vh;
          background: #000;
          overflow: hidden;
        }

        .grid-background-galleries {
          position: absolute;
          inset: 0;
          opacity: 0.1;
          background-image: 
            linear-gradient(rgba(218, 165, 32, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(218, 165, 32, 0.2) 1px, transparent 1px);
          background-size: 50px 50px;
        }

        .gradient-background-galleries {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(88, 28, 135, 0.2) 0%, rgba(30, 58, 138, 0.2) 50%, rgba(180, 83, 9, 0.2) 100%);
        }

        .floating-particle-galleries {
          position: absolute;
          width: 8px;
          height: 8px;
          background: #fbbf24;
          border-radius: 50%;
          opacity: 0.2;
          pointer-events: none;
        }

        .galleries-container-modern {
          position: relative;
          z-index: 10;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .galleries-header-modern {
          text-align: center;
          margin-bottom: 4rem;
        }

        .galleries-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1.5rem;
          background: rgba(245, 158, 11, 0.2);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(251, 191, 36, 0.3);
          border-radius: 9999px;
          margin-bottom: 1.5rem;
          color: #fcd34d;
          font-size: 0.875rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .badge-icon {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .galleries-title-modern {
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 900;
          margin-bottom: 1.5rem;
          line-height: 1.1;
          background: linear-gradient(135deg, #fff 0%, #fbbf24 50%, #f59e0b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .galleries-subtitle-modern {
          font-size: clamp(1rem, 2vw, 1.25rem);
          color: #d1d5db;
          max-width: 48rem;
          margin: 0 auto 2rem;
        }

        .galleries-stats {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 900;
          color: #fbbf24;
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 0.875rem;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .stat-divider {
          width: 1px;
          height: 3rem;
          background: linear-gradient(to bottom, transparent, #fbbf24, transparent);
        }

        .galleries-grid-modern {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-bottom: 4rem;
        }

        @media (min-width: 768px) {
          .galleries-grid-modern {
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 2rem;
          }
        }

        .gallery-card-modern {
          cursor: pointer;
          border-radius: 1rem;
          overflow: hidden;
          position: relative;
        }

        .card-image-wrapper {
          position: relative;
          aspect-ratio: 4 / 3;
          overflow: hidden;
        }

        .card-image-modern {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .gallery-card-modern:hover .card-image-modern {
          transform: scale(1.1);
        }

        .card-gradient-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 60%);
          pointer-events: none;
        }

        .card-hover-overlay {
          position: absolute;
          inset: 0;
          background: rgba(251, 191, 36, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        .expand-icon {
          width: 4rem;
          height: 4rem;
          background: #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #f59e0b;
        }

        .card-content-modern {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1.5rem;
          color: #fff;
          z-index: 2;
        }

        .card-content-modern h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .card-content-modern p {
          font-size: 0.875rem;
          color: #e5e7eb;
        }

        .card-border-glow {
          position: absolute;
          inset: 0;
          border-radius: 1rem;
          box-shadow: 0 0 30px rgba(251, 191, 36, 0.6), inset 0 0 20px rgba(251, 191, 36, 0.2);
          pointer-events: none;
        }

        /* Modal Styles */
        .modal-overlay-modern {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 2rem;
        }

        .modal-content-modern {
          position: relative;
          max-width: 90vw;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .modal-image-modern {
          max-width: 100%;
          max-height: 70vh;
          object-fit: contain;
          border-radius: 1rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
        }

        .modal-close-modern {
          position: fixed;
          top: 2rem;
          right: 2rem;
          width: 3rem;
          height: 3rem;
          background: rgba(239, 68, 68, 0.2);
          border: 2px solid rgba(239, 68, 68, 0.5);
          border-radius: 50%;
          color: #fca5a5;
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10001;
        }

        .modal-close-modern:hover {
          background: rgba(239, 68, 68, 0.4);
          border-color: #ef4444;
          color: #fff;
        }

        .modal-nav-modern {
          position: fixed;
          top: 50%;
          transform: translateY(-50%);
          width: 3.5rem;
          height: 3.5rem;
          background: rgba(251, 191, 36, 0.2);
          border: 2px solid rgba(251, 191, 36, 0.5);
          border-radius: 50%;
          color: #fbbf24;
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10001;
        }

        .modal-nav-modern:hover {
          background: rgba(251, 191, 36, 0.4);
          border-color: #fbbf24;
          color: #fff;
        }

        .modal-prev-modern {
          left: 2rem;
        }

        .modal-next-modern {
          right: 2rem;
        }

        .modal-caption-modern {
          margin-top: 2rem;
          text-align: center;
          color: #fff;
        }

        .modal-caption-modern h3 {
          font-size: 1.875rem;
          font-weight: 700;
          color: #fbbf24;
          margin-bottom: 0.5rem;
        }

        .modal-caption-modern p {
          color: #d1d5db;
        }

        .modal-thumbnails {
          display: flex;
          gap: 0.5rem;
          margin-top: 1.5rem;
          overflow-x: auto;
          padding: 0.5rem;
          max-width: 100%;
        }

        .thumbnail {
          width: 4rem;
          height: 4rem;
          flex-shrink: 0;
          border-radius: 0.5rem;
          overflow: hidden;
          cursor: pointer;
          border: 2px solid transparent;
          transition: all 0.3s ease;
        }

        .thumbnail.active {
          border-color: #fbbf24;
          box-shadow: 0 0 20px rgba(251, 191, 36, 0.5);
        }

        .thumbnail:hover {
          border-color: rgba(251, 191, 36, 0.5);
        }

        .thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* CTA Section */
        .galleries-cta {
          text-align: center;
          padding: 3rem 2rem;
          background: rgba(17, 24, 39, 0.5);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(251, 191, 36, 0.2);
          border-radius: 1.5rem;
        }

        .galleries-cta p {
          font-size: 1.5rem;
          color: #fff;
          margin-bottom: 1.5rem;
          font-weight: 600;
        }

        .cta-button-modern {
          padding: 1rem 3rem;
          background: linear-gradient(to right, #f59e0b, #d97706);
          color: #fff;
          font-size: 1.125rem;
          font-weight: 700;
          border: none;
          border-radius: 0.75rem;
          cursor: pointer;
          box-shadow: 0 10px 25px -5px rgba(245, 158, 11, 0.5);
          transition: all 0.3s ease;
        }

        .cta-button-modern:hover {
          box-shadow: 0 15px 35px -5px rgba(245, 158, 11, 0.7);
          transform: translateY(-2px);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .galleries-section-modern {
            padding: 4rem 0;
          }

          .modal-nav-modern {
            width: 2.5rem;
            height: 2.5rem;
            font-size: 1.25rem;
          }

          .modal-prev-modern {
            left: 1rem;
          }

          .modal-next-modern {
            right: 1rem;
          }

          .modal-close-modern {
            top: 1rem;
            right: 1rem;
            width: 2.5rem;
            height: 2.5rem;
          }

          .stat-divider {
            display: none;
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </section>
  );
}

export default Galleries;