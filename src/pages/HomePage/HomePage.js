import React, { useEffect } from 'react';
import { HeaderComponent } from '../../components/HeaderComponent/HeaderComponent';
import { HeroComponent } from '../../components/HeroComponent/HeroComponent';
import { GallerySection } from '../../components/GallerySection/GallerySection';
import { ContactsSection } from '../../components/ContactsSection/ContactsSection';

export default function HomePage() {
  useEffect(() => {
    const hash = window.location.hash?.slice(1);
    if (hash) {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <div className="home-page">
      <HeaderComponent />
      <HeroComponent />
      <GallerySection />
      <ContactsSection />
    </div>
  );
}
