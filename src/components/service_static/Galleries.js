import React, { useState } from "react";
import "./Galleries.css";

// 🔹 Import des images (utilisation de toutes les 13 images importées pour une galerie plus riche)
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

function GalleryCard({ image, onClick }) {
  return (
    <div className="gallery-card" onClick={() => onClick(image.id)}>
      <img
        src={image.url}
        alt={`Galerie ${image.id}`}
        className="card-image"
        loading="lazy"
      />
      <div className="card-overlay">
        <h3>Projet {image.id}</h3>
        <p>Découvrez ce projet exceptionnel et inspirant.</p>
      </div>
    </div>
  );
}

function ImageModal({ images, currentId, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(images.findIndex(img => img.id === currentId));

  if (currentIndex === -1) return null;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const currentImage = images[currentIndex];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={currentImage.url} alt={`Galerie ${currentImage.id}`} className="modal-image" />
        <button className="modal-close" onClick={onClose}>×</button>
        <button className="modal-nav modal-prev" onClick={handlePrev}>‹</button>
        <button className="modal-nav modal-next" onClick={handleNext}>›</button>
        <div className="modal-caption">
          <h3>Projet {currentImage.id}</h3>
          <p>Découvrez ce projet en détail.</p>
        </div>
      </div>
    </div>
  );
}

function Galleries() {
  const [selectedImageId, setSelectedImageId] = useState(null);

  const galleryImages = [
    { id: 1, url: img1 },
    { id: 2, url: img2 },
    { id: 3, url: img3 },
    { id: 4, url: img4 },
    { id: 5, url: img5 },
    { id: 6, url: img6 },
    { id: 7, url: img7 },
    { id: 8, url: img8 },
    { id: 9, url: img9 },
    { id: 10, url: img10 },
    { id: 11, url: img11 },
    { id: 12, url: img12 },
    { id: 13, url: img13 },
  ];

  return (
    <section className="galleries">
      <div className="galleries-header">
        <h1>Galerie de Nos Réalisations</h1>
        <p>
          Découvrez une sélection de nos meilleurs travaux, alliant créativité, élégance et savoir-faire. Cliquez sur une image pour l'agrandir et naviguer dans la galerie.
        </p>
      </div>

      <div className="galleries-masonry">
        {galleryImages.map((image) => (
          <GalleryCard key={image.id} image={image} onClick={setSelectedImageId} />
        ))}
      </div>

      <ImageModal images={galleryImages} currentId={selectedImageId} onClose={() => setSelectedImageId(null)} />
    </section>
  );
}

export default Galleries;