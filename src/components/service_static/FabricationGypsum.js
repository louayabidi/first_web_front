import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FabricationGypsum.css";

function GalleryCard({ images, onDelete }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="gallery-card">
      {images.map((img, i) => (
        <div
          key={img._id || img.id}
          className={`card-wrapper ${i === index ? "active" : "hidden"}`}
        >
          <img
            src={img.url || img}
            alt={`Fabrication Gypsum ${i}`}
            className="card-image"
          />
          <button
            className="delete-btn"
            onClick={() => onDelete(img._id || img.id)}
          >
            🗑
          </button>
        </div>
      ))}
    </div>
  );
}

function FabricationGypsum() {
  const [gallery, setGallery] = useState([]);
  const [backendGallery, setBackendGallery] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/images/fabrication-gypsum")
      .then((res) => {
        const backendImgs = res.data.map((img) => ({
          ...img,
          url: `http://localhost:5000/uploads/${img.filename}`,
        }));
        setBackendGallery(backendImgs);
      })
      .catch(() => {});
  }, []);

  const handleDelete = async (id) => {
    const backendImg = backendGallery.find((img) => img._id === id);
    if (backendImg) {
      try {
        await axios.delete(`http://localhost:5000/api/images/${id}`);
        setBackendGallery(backendGallery.filter((img) => img._id !== id));
      } catch {}
    } else {
      setGallery(
        gallery
          .map((group) =>
            group.filter((img) => (img.id || img._id) !== id)
          )
          .filter((group) => group.length > 0)
      );
    }
  };

  return (
    <section className="fabrication-gypsum">
      <div className="fabrication-gypsum-header">
        <h1>Fabrication Gypsum</h1>
        <p>
          Nous fabriquons des produits en gypsum sur mesure avec une qualité supérieure.
        </p>
      </div>

      <div className="fabrication-gypsum-details">
        <h2>Nos services de fabrication</h2>
        <ul>
          <li>Fabrication de moulures</li>
          <li>Production personnalisée</li>
          <li>Assemblage professionnel</li>
          <li>Contrôle qualité</li>
          <li>Matériaux durables</li>
          <li>Projets à grande échelle</li>
        </ul>
      </div>

      <div className="fabrication-gypsum-gallery">
        <h2>Galerie de Fabrication</h2>
        <div className="gallery-grid">
          {gallery.map((group, i) => (
            <GalleryCard key={`default-${i}`} images={group} onDelete={handleDelete} />
          ))}
          {backendGallery.map((img) => (
            <GalleryCard key={img._id} images={[img]} onDelete={handleDelete} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FabricationGypsum;