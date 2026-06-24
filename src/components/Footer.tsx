import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white border-t-8 border-white pt-20 pb-10 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 border-b-4 border-white pb-16 mb-10">
          <div>
            <h3 className="font-black text-6xl md:text-8xl uppercase tracking-tighter mb-6">
              LET'S<br/><span className="text-yellow-400">CONNECT.</span>
            </h3>
            <p className="font-bold text-xl max-w-sm text-gray-400">
              Pergi ke Bandung Naik Taksi. Jika Butuh Web Developer Just Call Me!!!
            </p>
          </div>
          
          <div className="flex flex-col lg:items-end justify-end">
            <div className="flex gap-4">
              {[
                { Icon: Github, url: "https://github.com/fairuzjs" },
                { Icon: Linkedin, url: "https://www.linkedin.com/in/danendra-fairuz/" },
                { Icon: Instagram, url: "https://instagram.com/draafrzz_" },
                { Icon: Mail, url: "mailto:draaafrz@gmail.com" }
              ].map(({ Icon, url }, i) => (
                <motion.a 
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, rotate: 5, backgroundColor: '#FFD700', color: '#000' }}
                  className="w-16 h-16 border-4 border-white flex items-center justify-center transition-colors bg-black"
                >
                  <Icon size={32} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 font-bold uppercase tracking-widest text-sm">
          <p>© 2026 DANENDRA FAIRUZ</p>
          <motion.button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ y: -5 }}
            className="border-4 border-white px-6 py-3 flex items-center gap-2 hover:bg-white hover:text-black transition-colors"
          >
            KEMBALI KE ATAS <ArrowUp />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
