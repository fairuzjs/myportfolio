import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, Zap } from 'lucide-react';
import { BrutalButton, Marquee } from './ui/BrutalUI';

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = "Danendra Fairuz";
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (!isDeleting && typedText === fullText) {
      // Pause before deleting
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && typedText === '') {
      // Pause before typing again
      timeout = setTimeout(() => setIsDeleting(false), 1000);
    } else {
      // Typing or deleting speed
      const speed = isDeleting ? 100 : 200;
      timeout = setTimeout(() => {
        setTypedText(prev => {
          if (isDeleting) return prev.slice(0, -1);
          return fullText.slice(0, prev.length + 1);
        });
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting]);

  // Split text into "Danendra" and "Fairuz" for styling
  const firstWord = typedText.slice(0, 8); // "Danendra"
  const secondWord = typedText.length > 9 ? typedText.slice(9) : ''; // "Fairuz"

  return (
    <section className="pt-32 pb-0 bg-[#FDFDFD] overflow-hidden bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgwLDAsMCwwLjEpIi8+PC9zdmc+')]">
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="lg:col-span-7 flex flex-col items-start z-10 min-h-[400px] justify-center"
          >
            <motion.div 
              initial={{ rotate: -5, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="inline-block bg-green-400 text-black px-4 py-2 font-black uppercase tracking-widest text-sm border-4 border-black mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              Halo, Saya
            </motion.div>
            
            <h1 className="font-black text-5xl sm:text-6xl md:text-8xl xl:text-9xl uppercase leading-[0.85] tracking-tighter mb-4 sm:mb-6 min-h-[90px] sm:min-h-[110px] md:min-h-[170px] xl:min-h-[220px]">
              {firstWord}
              {typedText.length > 8 && <br/>}
              <span className="text-transparent" style={{ WebkitTextStroke: '3px black' }}>{secondWord}</span>
              <span className="inline-block w-[0.1em] h-[0.8em] bg-brutal-pink ml-2 align-middle animate-pulse"></span>
            </h1>
            
            <div className="bg-yellow-400 border-4 border-black p-4 inline-block mb-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-[-1deg]">
              <p className="text-lg sm:text-xl md:text-3xl font-black uppercase tracking-wide">
                Web Developer.
              </p>
            </div>

            <p className="text-xl font-bold mb-10 max-w-lg border-l-8 border-black pl-4">
              Membangun website dengan sistem yang efisien, user-friendly, dan desain yang elegan.
            </p>

            <div className="flex flex-row w-full gap-3 sm:gap-4 md:gap-6">
              <a href="#projects" className="flex-1"><BrutalButton color="bg-blue-400 text-white flex items-center justify-center gap-2 w-full text-xs sm:text-lg md:text-xl px-2 py-3 sm:py-4">
               Lihat Proyek
              </BrutalButton></a>
              <a href="#about" className="flex-1"><BrutalButton color="bg-white flex items-center justify-center w-full text-xs sm:text-lg md:text-xl px-2 py-3 sm:py-4">Tentang Saya</BrutalButton></a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
            className="lg:col-span-5 relative"
          >
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="border-4 border-black bg-pink-400 p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative z-10"
            >
              <div className="flex justify-between items-center mb-6 border-b-4 border-black pb-4">
                <div className="flex gap-2">
                  <div className="w-4 h-4 rounded-full border-4 border-black bg-white" />
                  <div className="w-4 h-4 rounded-full border-4 border-black bg-yellow-400" />
                </div>
                <Code2 size={32} />
              </div>
              <p className="font-black text-2xl sm:text-3xl md:text-4xl uppercase mb-4">Siap Bekerja Sama</p>
              <p className="font-bold border-2 border-black bg-white p-2 inline-block text-sm md:text-base">Untuk Membangun Website yang Anda Inginkan.</p>
            </motion.div>

            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-400 border-4 border-black rounded-full flex items-center justify-center z-0"
            >
              <Zap size={48} className="fill-black" />
            </motion.div>
            
          </motion.div>
        </div>
      </div>
      <Marquee />
    </section>
  );
};

export default Hero;
