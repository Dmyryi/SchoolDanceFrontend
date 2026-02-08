import React from "react";
import "./GallerySection.css";

const PLACEHOLDERS = 6;

export const GallerySection = () => {
  return (
    <section className="gallery" id="gallery">
      <div className="gallery__inner">
        <h2 className="gallery__title">Галерея</h2>
        <p className="gallery__lead">
          Зали, заняття та атмосфера школи
        </p>
        <div className="gallery__grid">
          {Array.from({ length: PLACEHOLDERS }, (_, i) => (
            <div key={i} className="gallery__item">
              <div className="gallery__img" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
