import React from 'react';
import { motion } from 'framer-motion';

const groupedTechnologies = [
  {
    category: 'Frontend & UI',
    color: 'text-pink-400',
    borderColor: 'border-pink-400',
    items: [
      { name: 'React', color: 'bg-blue-400 text-black' },
      { name: 'Blade', color: 'bg-pink-400 text-black' },
      { name: 'Tailwind CSS', color: 'bg-cyan-400 text-black' },
    ]
  },
  {
    category: 'Frameworks & Database',
    color: 'text-green-400',
    borderColor: 'border-green-400',
    items: [
      { name: 'Next.js', color: 'bg-white text-black' },
      { name: 'Laravel', color: 'bg-red-500 text-white' },
      { name: 'PostgreSQL', color: 'bg-blue-300 text-black' },
      { name: 'MySQL', color: 'bg-blue-400 text-black' },
      { name: 'Supabase', color: 'bg-green-400 text-black' },
    ]
  },
  {
    category: 'Language & Tools',
    color: 'text-yellow-400',
    borderColor: 'border-yellow-400',
    items: [
      { name: 'TypeScript', color: 'bg-blue-500 text-white' },
      { name: 'Javascript', color: 'bg-yellow-500 text-black' },
      { name: 'Python', color: 'bg-yellow-400 text-black' },
      { name: 'PHP', color: 'bg-black text-white' },
      { name: 'Git', color: 'bg-white text-black' },
    ]
  }
];

const TechStack = () => {
  return (
    <section id="tech-stack" className="py-24 px-6 bg-black border-y-4 border-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6 md:gap-8">
          <h2 className="font-black text-5xl sm:text-6xl md:text-8xl uppercase tracking-tighter text-white leading-tight">
            Tech <span className="text-yellow-400 underline decoration-[4px] md:decoration-8 decoration-pink-400">Stack</span>
          </h2>
          <p className="text-lg md:text-xl font-bold text-white max-w-sm border-l-4 border-pink-400 pl-4 mt-4 md:mt-0">
            Keahlian utama saya dalam membangun website yang efisien, user-friendly, dan desain yang elegan.
          </p>
        </div>

        <div className="flex flex-col gap-14">
          {groupedTechnologies.map((group, groupIndex) => (
            <motion.div 
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: groupIndex * 0.1, type: "spring", stiffness: 100 }}
            >
              <h3 className={`font-black text-2xl sm:text-3xl md:text-4xl uppercase mb-6 md:mb-8 border-b-4 ${group.borderColor} ${group.color} pb-2 inline-block tracking-tight`}>
                {group.category}
              </h3>
              
              <div className="flex flex-wrap gap-3 md:gap-6">
                {group.items.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    whileHover={{ y: -5, x: -5, boxShadow: '8px 8px 0px 0px rgba(255,255,255,1)' }}
                    className={`border-4 border-white px-4 py-3 md:px-6 md:py-4 font-black text-base sm:text-xl md:text-2xl uppercase tracking-wider cursor-default shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-colors ${tech.color}`}
                  >
                    {tech.name}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;