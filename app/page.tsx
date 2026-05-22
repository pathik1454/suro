import SmoothScroll from '@/components/layout/SmoothScroll';
import Navbar from '@/components/layout/Navbar';
import LoadingScreen from '@/components/loading/LoadingScreen';
import HeroSection from '@/components/hero/HeroSection';
import AssemblySection from '@/components/assembly/AssemblySection';
import AboutSection from '@/components/sections/AboutSection';
import ByTheNumbers from '@/components/sections/ByTheNumbers';
import OurRange from '@/components/sections/OurRange';
import PopularServices from '@/components/sections/PopularServices';
import TheMaking from '@/components/sections/TheMaking';
import Certifications from '@/components/sections/Certifications';
import CommissionSection from '@/components/sections/CommissionSection';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <SmoothScroll>
      <LoadingScreen />
      <Navbar />
      
      <main className="relative w-full flex flex-col">
        {/* Absolute overlay over the AssemblySection canvas. Fades out on scroll. */}
        <div className="absolute top-0 left-0 w-full z-20 pointer-events-none">
          <HeroSection />
        </div>

        {/* Cinematic Scroll-tied narrative */}
        <AssemblySection />
        
        {/* Flowing static sections below */}
        <div className="relative z-30 bg-[var(--bg-base)]">
          <AboutSection />
          <ByTheNumbers />
          <OurRange />
          <PopularServices />
          <TheMaking />
          <Certifications />
          <CommissionSection />
          <Footer />
        </div>
      </main>
    </SmoothScroll>
  );
}
