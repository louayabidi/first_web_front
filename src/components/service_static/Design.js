import React from "react";
import "./Design.css";

// 🔹 Import des images locales
import img1 from "../../assets/design1.jpg";
import img2 from "../../assets/design2.png";
import img3 from "../../assets/design3.jpg";

function GalleryCard({ image }) {
  return (
    <div className="gallery-card">
      <img
        src={image.url}
        alt={`Design ${image.id}`}
        className="card-image"
      />
      <div className="card-overlay">
        <h3>Projet {image.id}</h3>
        <p>Découvrez ce design innovant et fonctionnel.</p>
      </div>
    </div>
  );
}

function Design() {
  const localGallery = [
    { id: 1, url: img1 },
    { id: 2, url: img2 },
    { id: 3, url: img3 },
  ];

  return (
    <section className="design">
      <div className="design-header">
        <h1>Services Design</h1>
        <p>
          Nos services Design transforment vos espaces avec créativité et style,
          alliant esthétique, fonctionnalité et modernité pour chaque projet.
        </p>
      </div>

      <div className="design-gallery">
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

export default Design;