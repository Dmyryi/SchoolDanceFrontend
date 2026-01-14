import React from 'react';
import { HeroComponent } from '../../components/HeroComponent/HeroComponent';
import { HeaderComponent } from '../../components/HeaderComponent/HeaderComponent';


export default function HomePage() {
  return (
    <div className="home-page">
      <HeaderComponent/>
      <HeroComponent />
    </div>
  );
}
