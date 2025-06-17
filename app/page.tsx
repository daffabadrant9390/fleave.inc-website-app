'use client';

import { Container } from '@/components/Container/Container';
import { HeroSection } from '@/components/LandingPage/HeroSection/HeroSection';
import { Navigation } from '@/components/Navigation/Navigation';
import { useDeviceType } from '@/hooks/useDeviceType';

export default function Home() {
  // Get the screen state (desktop or mobile)
  const { isDesktop } = useDeviceType();

  return (
    <main>
      <Navigation />
      <HeroSection />
      <Container>
        <h1 className="text-red-600 font-bold hover:text-blue-600 transition-all duration-150">
          Hello World
        </h1>
      </Container>
    </main>
  );
}
