import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Code2, Palette, Terminal } from 'lucide-react';

const About = () => {
  const skills = [
    { icon: <Layers size={32} />, name: "Frontend", color: "bg-yellow-400", rotate: "rotate-2" },
    { icon: <Code2 size={32} />, name: "Backend", color: "bg-pink-400", rotate: "-rotate-2" },
    { icon: <Palette size={32} />, name: "UI Design", color: "bg-blue-400", rotate: "rotate-3" },
    { icon: <Terminal size={32} />, name: "DevOps", color: "bg-green-400", rotate: "-rotate-1" },
  ];

  return (
    <section id="about" className="py-24 px-6 bg-[#FDFDFD] overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        <div className="relative order-2 lg:order-1">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring" }}
            className="border-4 border-black bg-yellow-400 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]"
          >
            <div className="w-full aspect-[4/5] bg-gray-200 flex flex-col items-center justify-center font-black text-4xl text-gray-400 uppercase text-center border-b-4 border-black overflow-hidden relative group">
              <img 
                src="/myfoto.jpeg" 
                alt="Profile" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all" />
            </div>
            <div className="p-3 md:p-4 bg-black text-white flex justify-between font-bold uppercase text-sm sm:text-base md:text-xl">
              <span>HIKING</span>
              <span>CODING</span>
              <span>REPEAT</span>
            </div>
          </motion.div>
          <div className="absolute -top-4 left-0 sm:-top-6 sm:-left-6 border-4 border-black bg-pink-400 p-3 sm:p-4 font-black uppercase text-lg sm:text-xl rotate-[-10deg] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-10">
            Siapa Saya?
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
          
          <div className="mt-12 grid grid-cols-2 gap-6">
            {skills.map((skill, i) => (
              <motion.div 
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, rotate: 0 }}
                className={`border-4 border-black ${skill.color} p-4 md:p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${skill.rotate} transition-transform flex flex-col items-center justify-center gap-2 md:gap-4`}
              >
                {skill.icon}
                <div className="font-black uppercase tracking-widest text-xs sm:text-sm md:text-lg text-center">{skill.name}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;
