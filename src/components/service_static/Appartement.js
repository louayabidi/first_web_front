import React from "react";
import "./Appartement.css";

// 🔹 Import des images locales
import img1 from "../../assets/Appartement1.jpg";
import img2 from "../../assets/Appartement2.jpg";
import img3 from "../../assets/Appartement3.jpg";

function GalleryCard({ image }) {
  return (
    <div className="gallery-card">
      <img
        src={image.url}
        alt={`Appartement ${image.id}`}
        className="card-image"
      />
      <div className="card-overlay">
        <h3>Projet Appartement {image.id}</h3>
        <p>Découvrez cet appartement transformé avec élégance et confort.</p>
      </div>
    </div>
  );
}

function Appartement() {
  const localGallery = [
    { id: 1, url: img1 },
    { id: 2, url: img2 },
    { id: 3, url: img3 },
  ];

  return (
    <section className="appartement">
      <div className="appartement-header">
        <h1>Services pour Appartement</h1>
        <p>
          Nous transformons vos appartements avec élégance et confort. Chaque
          projet est conçu pour apporter style, modernité et fonctionnalité à
          votre intérieur.
        </p>
      </div>

      <div className="appartement-gallery">
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

export default Appartement;