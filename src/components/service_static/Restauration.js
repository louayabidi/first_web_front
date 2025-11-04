import React from "react";
import "./Restauration.css";

// 🔹 Import des images locales
import img1 from "../../assets/Restaurant1.jpg";
import img2 from "../../assets/restaurant2.jpg";
import img3 from "../../assets/restaurant3.jpg";

function GalleryCard({ image }) {
  return (
    <div className="gallery-card">
      <img
        src={image.url}
        alt={`Restauration ${image.id}`}
        className="card-image"
      />
      <div className="card-overlay">
        <h3>Projet Restauration {image.id}</h3>
        <p>Découvrez cette restauration élégante et raffinée.</p>
      </div>
    </div>
  );
}

function Restauration() {
  const localGallery = [
    { id: 1, url: img1 },
    { id: 2, url: img2 },
    { id: 3, url: img3 },
  ];

  return (
    <section className="restauration">
      <div className="restauration-header">
        <h1>Service de Restauration</h1>
        <p>
          Nous redonnons vie aux plâtres et décorations anciennes avec
          savoir-faire et élégance. Nos réalisations apportent style et
          raffinement à chaque projet.
        </p>
      </div>

      <div className="restauration-gallery">
        <h2>Galerie de réalisations</h2>
        <div className="gallery-grid">
          {localGallery.map((image) => (
            <GalleryCard key={image.id} image={image} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Restauration;