import React from "react";
import "./Facades.css";

// 🔹 Import des images locales
import img1 from "../../assets/facade1.jpg";
import img2 from "../../assets/facade2.jpg";
import img3 from "../../assets/facade3.jpg";

function GalleryCard({ image }) {
  return (
    <div className="gallery-card">
      <img
        src={image.url}
        alt={`Façade ${image.id}`}
        className="card-image"
      />
      <div className="card-overlay">
        <h3>Façade {image.id}</h3>
        <p>Découvrez cette façade rénovée avec style et élégance.</p>
      </div>
    </div>
  );
}

function Facades() {
  const localGallery = [
    { id: 1, url: img1 },
    { id: 2, url: img2 },
    { id: 3, url: img3 },
  ];

  return (
    <section className="facades">
      <div className="facades-header">
        <h1>Services de Façades</h1>
        <p>
          Nous transformons vos façades avec style et élégance. Que ce soit pour
          rénovation ou décoration, notre savoir-faire garantit un rendu
          moderne et raffiné.
        </p>
      </div>

      <div className="facades-gallery">
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

export default Facades;