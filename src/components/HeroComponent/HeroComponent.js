import React from "react";
import { NavLink } from "react-router-dom";
import "./HeroComponent.css";

import splashBg from "../assets/Gemini_Generated_Image_4ythw84ythw84yth.png";

export const HeroComponent = () => {
  return (
    <section className="splash">
      <div
        className="splash__bg"
        style={{ backgroundImage: `url(${splashBg})` }}
      />
      <div className="splash__veil" />
      <div className="splash__center">
        <h1 className="splash__title">
          <span className="splash__title-main">Танцюй</span>
          <span className="splash__title-sub">Найкраща школа міста</span>
        </h1>
        <p className="splash__tagline">
          Сучасна хореографія для дорослих та дітей. Професійні педагоги, зручні зали.
        </p>
        <NavLink to="/dances" className="splash__btn">
          Розклад та запис
        </NavLink>
        <p className="splash__meta">
          25+ напрямків · 10 залів · Пробне перше заняття
        </p>
      </div>
    </section>
  );
};
