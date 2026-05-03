import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { BrutalButton } from './ui/BrutalUI';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const links = ['About', 'Tech Stack', 'Projects', 'Contact'];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#FDFDFD] border-b-4 border-black">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="font-black text-xl md:text-2xl uppercase tracking-tighter flex items-center gap-2">
          <div className="w-6 h-6 md:w-8 md:h-8 text-sm md:text-base bg-black text-white flex items-center justify-center border-2 border-black rotate-[-10deg]">D</div>
          <span>Danendra<span className="text-pink-500">.</span></span>
        </a>

        <div className="hidden md:flex items-center gap-8 font-bold uppercase tracking-wider text-sm">
          {links.map((link) => (
            <a key={link} href={`#${link.toLowerCase().replace(' ', '-')}`} className="hover:underline decoration-4 decoration-yellow-400 underline-offset-4 transition-all">
              {link}
            </a>
          ))}
          <BrutalButton color="bg-yellow-400">Rekrut Saya</BrutalButton>
        </div>

        <button className="md:hidden border-4 border-black p-2 bg-yellow-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-1 active:translate-x-1" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-[#FDFDFD] border-t-4 border-black overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {links.map((link) => (
                <a key={link} href={`#${link.toLowerCase().replace(' ', '-')}`} onClick={() => setIsOpen(false)} className="text-2xl font-black uppercase border-b-2 border-black pb-2">
                  {link}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
