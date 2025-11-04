import React from "react";
import "./Mesure.css";

// 🔹 Import des images locales
import img1 from "../../assets/surmesure1.jpg";
import img2 from "../../assets/surmesure2.jpg";
import img3 from "../../assets/surmesure3.jpg";

function GalleryCard({ image }) {
  return (
    <div className="gallery-card">
      <img
        src={image.url}
        alt={`Mesure ${image.id}`}
        className="card-image"
      />
      <div className="card-overlay">
        <h3>Projet Sur Mesure {image.id}</h3>
        <p>Découvrez cette création unique en staff et plâtre décoratif.</p>
      </div>
    </div>
  );
}

function Mesure() {
  const localGallery = [
    { id: 1, url: img1 },
    { id: 2, url: img2 },
    { id: 3, url: img3 },
  ];

  return (
    <section className="mesure">
      <div className="mesure-header">
        <h1>Service sur mesure</h1>
        <p>
          Nous réalisons des créations uniques en staff et plâtre décoratif,
          alliant élégance, précision et savoir-faire artisanal. Nos œuvres
          sur mesure s’adaptent à chaque espace, qu’il soit moderne ou
          traditionnel.
        </p>
      </div>

      <div className="mesure-gallery">
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

export default Mesure;