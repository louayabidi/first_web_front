import React from "react";
import "./Luxury.css";

// 🔹 Import des images locales
import img1 from "../../assets/luxury1.jpg";
import img2 from "../../assets/luxury2.jpg";
import img3 from "../../assets/luxury3.jpg";

function GalleryCard({ image }) {
  return (
    <div className="gallery-card">
      <img
        src={image.url}
        alt={`Luxury ${image.id}`}
        className="card-image"
      />
      <div className="card-overlay">
        <h3>Projet Luxury {image.id}</h3>
        <p>Découvrez ce projet élégant et sophistiqué.</p>
      </div>
    </div>
  );
}

function Luxury() {
  const localGallery = [
    { id: 1, url: img1 },
    { id: 2, url: img2 },
    { id: 3, url: img3 },
  ];

  return (
    <section className="luxury">
      <div className="luxury-header">
        <h1>Services Luxury</h1>
        <p>
          Nos services Luxury apportent élégance, raffinement et confort à vos
          espaces. Chaque projet est conçu pour créer une atmosphère unique et
          sophistiquée.
        </p>
      </div>

      <div className="luxury-gallery">
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

export default Luxury;