import { useState, useEffect, useCallback } from 'react';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import Footer from './components/Footer';

import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Services from './sections/Services';
import Experience from './sections/Experience';
import Contact from './sections/Contact';

import { useLenis } from './hooks/useLenis';

function App() {
  const [loading, setLoading] = useState(true);
  const [contentReady, setContentReady] = useState(false);

  // Initialize Lenis smooth scroll
  useLenis();

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
    // Small delay to ensure smooth transition
    setTimeout(() => setContentReady(true), 100);
  }, []);

  // Preload critical assets
  useEffect(() => {
    const img = new Image();
    img.src = '/assets/profile.jpg';
  }, []);

  return (
    <>
      {/* Loading Screen */}
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#111118',
            color: '#fff',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            fontFamily: 'Inter, sans-serif',
          },
        }}
      />

      {/* Main Content */}
      <div
        className="app"
        style={{
          opacity: contentReady ? 1 : 0,
          transition: 'opacity 0.8s ease-out',
        }}
      >
        <Navbar />

        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Services />
          <Experience />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;
