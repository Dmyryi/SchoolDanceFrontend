import React from "react";
import "./ContactsSection.css";

export const ContactsSection = () => {
  return (
    <section className="contacts" id="contacts">
      <div className="contacts__inner">
        <h2 className="contacts__title">Контакти</h2>
        <p className="contacts__lead">
          Зателефонуйте або напишіть — допоможемо підібрати заняття
        </p>
        <div className="contacts__grid">
          <div className="contacts__card">
            <span className="contacts__label">Адреса</span>
            <p className="contacts__value">
              м. Київ, вул. Хрещатик, 1<br />
              (вхід з двору)
            </p>
          </div>
          <div className="contacts__card">
            <span className="contacts__label">Телефон</span>
            <p className="contacts__value">
              <a href="tel:+380441234567">+38 (044) 123-45-67</a>
            </p>
          </div>
          <div className="contacts__card">
            <span className="contacts__label">Email</span>
            <p className="contacts__value">
              <a href="mailto:info@school-dance.ua">info@school-dance.ua</a>
            </p>
          </div>
        </div>
        <div className="contacts__social">
          <a href="#" className="contacts__social-link" aria-label="Facebook">Facebook</a>
          <a href="#" className="contacts__social-link" aria-label="Instagram">Instagram</a>
        </div>
      </div>
    </section>
  );
};
