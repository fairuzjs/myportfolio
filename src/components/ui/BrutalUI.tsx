import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export const BrutalButton = ({ children, color = 'bg-white', className = '', ...props }: any) => (
  <motion.button 
    whileHover={{ y: -4, x: -4, boxShadow: '8px 8px 0px 0px rgba(0,0,0,1)' }}
    whileTap={{ y: 0, x: 0, boxShadow: '0px 0px 0px 0px rgba(0,0,0,1)' }}
    className={`border-4 border-black font-black uppercase tracking-wider px-6 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-colors duration-200 ${color} ${className}`}
    {...props}
  >
    {children}
  </motion.button>
);

export const BrutalBadge = ({ children, color = 'bg-yellow-400', className = '' }: any) => (
  <span className={`border-2 border-black px-3 py-1 font-bold text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${color} ${className}`}>
    {children}
  </span>
);

export const Marquee = () => (
  <div className="relative flex overflow-x-hidden border-y-4 border-black bg-black text-white py-3">
    <motion.div
      animate={{ x: [0, -1036] }}
      transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
      className="flex whitespace-nowrap font-black uppercase text-2xl tracking-widest items-center"
    >
      {[...Array(6)].map((_, i) => (
        <React.Fragment key={i}>
          <span className="mx-4">AVAILABLE FOR FREELANCE</span>
          <Zap className="mx-4 text-yellow-400 fill-yellow-400" />
          <span className="mx-4">OPEN TO WORK</span>
          <Zap className="mx-4 text-pink-400 fill-pink-400" />
        </React.Fragment>
      ))}
    </motion.div>
  </div>
);
