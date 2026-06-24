import React from 'react';
import { motion } from 'framer-motion';
import Lanyard from './Lanyard';

const About = () => {

  return (
    <section id="about" className="py-24 px-6 bg-[#FDFDFD] overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        <div className="relative order-2 lg:order-1">
          <div className="relative z-0 h-[600px] w-full flex justify-center items-center">
            <Lanyard position={[0, 2, 10]} gravity={[0, -40, 0]} frontImage="/myfoto.jpeg" backImage="/myfoto.jpeg" />
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="order-1 lg:order-2"
        >
          <h2 className="font-black text-5xl sm:text-6xl md:text-8xl uppercase tracking-tighter mb-8 leading-tight">
            Tentang <span className="bg-blue-400 px-2 border-4 border-black text-white inline-block mt-2 md:mt-0 rotate-2">Saya</span>
          </h2>
          <div className="space-y-6 text-base sm:text-lg md:text-xl font-bold bg-white border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative z-10"> 
            <p className="justify-center">
              Saya seorang web developer yang sedang menempuh pendidikan tinggi di bidang informatika. Tertarik pada dunia pemrograman sejak remaja, kini saya siap bekerja sama untuk membangun website yang efisien, user-friendly, dan desain yang elegan.
            </p>
            <p className="justify-center">
              Selain suka ngoding, saya juga suka mendaki gunung. Karna mendaki gunung adalah cara saya mencari inspirasi, menenangkan pikiran dan sering mengabadikan keindahan alam melalui lensa kamera.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;
