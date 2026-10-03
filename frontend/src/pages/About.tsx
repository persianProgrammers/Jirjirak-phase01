import { useEffect } from 'react';
import { AboutSection } from '../features/landing/sections/AboutSection';
import { VisionaryTeamShowcase } from '../features/landing/sections/VisionaryTeamShowcase';
import { PhilosophySection } from '../features/landing/sections/PhilosophySection';
import { ScrollTrigger } from '../animations/gsap';

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full pt-12 lg:pt-16">
      {/* 1. About Section (Mission, Founders, Corkboard with 20-Style Filter Lab Saved & Intact) */}
      <AboutSection isAboutPage={true} />
      
      {/* 2. Brand New Visionary Team Section (با پنل اختصاصی و ۶ مدل نمایشی خلاقانه، ریسپانسیو و بی نظیر) */}
      <VisionaryTeamShowcase />

      {/* 3. Philosophy Section (Values, Kinetic 3D Mechanism) */}
      <PhilosophySection />
    </div>
  );
}
