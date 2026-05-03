import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Import Komponen Anda
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Admin from './components/Admin';
import AdminLogin from './components/AdminLogin';

export default function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isAdminAuth, setIsAdminAuth] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  // Simple routing
  const path = window.location.pathname;

  if (path === '/admin') {
    if (!isAdminAuth) {
      return <AdminLogin onLoginSuccess={() => setIsAdminAuth(true)} />;
    }
    return <Admin onLogout={() => setIsAdminAuth(false)} />;
  }

  return (
    <div className="font-sans text-black selection:bg-pink-400 selection:text-white cursor-default overflow-x-hidden w-full">
      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 bg-transparent border-4 border-black mix-blend-difference pointer-events-none z-[100] hidden md:block rounded-full shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
        animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16 }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      />
      
      <Navbar />
      <main>
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}