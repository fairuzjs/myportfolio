import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { BrutalButton } from './ui/BrutalUI';
import StaggeredMenu from './StaggeredMenu';

const Navbar = () => {
  const [showResume, setShowResume] = useState(false);
  const links = ['About', 'Tech Stack', 'Projects', 'Contact'];

  const menuItems = [
    ...links.map(link => ({
      label: link,
      ariaLabel: `Go to ${link}`,
      link: `#${link.toLowerCase().replace(' ', '-')}`
    })),
    {
      label: 'CV',
      ariaLabel: 'Open Resume',
      link: '#',
      onClick: () => setShowResume(true)
    }
  ];

  const socialItems = [
    { label: 'GitHub', link: 'https://github.com' },
    { label: 'LinkedIn', link: 'https://www.linkedin.com/in/danendra-fairuz/' },
    { label: 'Instagram', link: 'https://instagram.com/draafrzz_' },
  ];

  const brandLogo = (
    <a href="#" className="font-black text-xl md:text-2xl uppercase tracking-tighter flex items-center gap-2 pointer-events-auto">
      <div className="w-6 h-6 md:w-8 md:h-8 text-sm md:text-base bg-black text-white flex items-center justify-center border-2 border-black rotate-[-10deg]">D</div>
      <span>Danendra<span className="text-pink-500">.</span></span>
    </a>
  );

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#FDFDFD] border-b-4 border-black">
      {/* Desktop Navigation */}
      <div className="hidden md:flex max-w-7xl mx-auto px-6 py-4 justify-between items-center">
        {brandLogo}
        <div className="flex items-center gap-8 font-bold uppercase tracking-wider text-sm">
          {links.map((link) => (
            <a key={link} href={`#${link.toLowerCase().replace(' ', '-')}`} className="hover:underline decoration-4 decoration-yellow-400 underline-offset-4 transition-all">
              {link}
            </a>
          ))}
          <BrutalButton color="bg-yellow-400" onClick={() => setShowResume(true)}>CV</BrutalButton>
        </div>
      </div>

      {/* Mobile Navigation Area (background is provided by nav) */}
      <div className="md:hidden flex max-w-7xl mx-auto px-6 py-4 justify-between items-center h-[76px]">
        {/* Placeholder to keep the navbar height on mobile. StaggeredMenu is fixed and renders its own header on top. */}
      </div>

      {/* Mobile Staggered Menu */}
      <div className="md:hidden">
        <StaggeredMenu 
          isFixed={true}
          logo={brandLogo}
          items={menuItems}
          socialItems={socialItems}
          displaySocials={true}
          colors={['#facc15', '#f472b6', '#3b82f6']}
          accentColor="#5227FF"
          changeMenuColorOnOpen={false}
          menuButtonColor="#000"
          openMenuButtonColor="#000"
        />
      </div>

      <AnimatePresence>
        {showResume && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 md:p-8"
            onClick={() => setShowResume(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-full max-w-5xl h-full max-h-[90vh] flex flex-col relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-4 border-b-4 border-black bg-yellow-400">
                <h3 className="font-black uppercase text-xl md:text-2xl tracking-tighter">Curriculum Vitae</h3>
                <button 
                  onClick={() => setShowResume(false)}
                  className="p-1 border-4 border-black bg-white hover:bg-pink-400 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="flex-1 w-full bg-gray-100 overflow-hidden relative">
                <iframe 
                  src="/Resume - Danendra Fairuz Syahla.pdf" 
                  className="w-full h-full border-none"
                  title="Resume"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
