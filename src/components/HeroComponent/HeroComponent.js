import React from "react";
import "./HeroComponent.css"; // Стили выносим отдельно
import bgImage from '../assets/bg.png';
import managerImage from '../assets/manager.png'
import { NavLink } from 'react-router-dom';
export const HeroComponent = () => {
  return (
    <div className="page-wrapper">
      {/* Слой 1: Твоя картинка (лежит под маской) */}
     

      {/* Слой 2: Белая поверхность с "дыркой" из SVG */}
      <div className="white-surface-mask">
        {/* Контент, который должен быть на БЕЛОМ фоне */}
        <section className="hero-bento">
  
  {/* Ліва біла картка (Головний текст) */}
  <div className="card card-main-white">
    <span className="label">CONSULTATION</span>
    <h1 className="title">Твій ритм. <br/>Твоя свобода. <br/><span>Твоє місто.</span></h1>
    <p className="description">
      Відкрий для себе сучасну хореографію в самому центрі столиці. 
      Професійне навчання для будь-якого рівня.
    </p>
    <button className="btn-primary">
      
       <NavLink  to="/dances">
            Почати танцювати
          </NavLink>
      </button>
  </div>

  {/* Центральна скляна картка (Тренери) */}
  <div className="card card-glass-trainer">
    <div className="trainer-info">

            <h3>Потрібна допомога?</h3>
      <p>Наш менеджер залюбки вас проконсультує</p>
      <div className="avatar-circle">
        <img src={managerImage} alt="Coach" />
      </div>

      <button className="btn-glass">Зв'язатись</button>
    </div>
  </div>

  {/* Права нижня картка (Статистика) */}
  <div className="card card-stats-white">
    <div className="stats-grid">
      <div className="stat-item">
        <h2>25+</h2>
        <p>Напрямків танцю</p>
      </div>
      <div className="stat-item">
        <h2>10</h2>
        <p>Топових залів</p>
      </div>
    </div>
    <div className="social-icons">
      {/* Тут іконки FB, IG, X */}
    </div>
  </div>

  {/* Маленька картка-віджет (Live статус) */}
  <div className="card card-live-orange">
    <div className="live-content">
      <p>Зараз у залах:</p>
      <span className="live-number">142</span>
      <small>учнів на тренуваннях</small>
    </div>
  </div>

</section>
      </div>

     
    </div>
  );
};