import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, Maximize2 } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { storageService } from '../services/storageService';
import { Project } from '../types';

const ProjectCard: React.FC<{ project: Project; index: number; onClick: () => void }> = ({ project, index, onClick }) => {
  const images = project.images || (project.image ? [project.image] : []);
  const coverImage = images[0];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: (index % 4) * 0.1 }}
      className="group cursor-pointer h-full"
      onClick={onClick}
    >
      <div className={`brutal-border ${project.color} brutal-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all overflow-hidden h-full flex flex-col bg-white`}>
        <div className="p-1.5 md:p-2 bg-black border-b-2 border-black flex justify-between items-center text-white font-bold text-[9px] md:text-xs uppercase px-2 md:px-4 shrink-0">
          <span className="truncate mr-1 md:mr-2">{project.category}</span>
          <div className="flex gap-1 md:gap-2 shrink-0">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-brutal-green" />
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-brutal-yellow" />
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-brutal-pink" />
          </div>
        </div>
        
        <div className="relative w-full h-28 md:h-48 border-b-2 border-black overflow-hidden bg-gray-200 shrink-0">
          {coverImage && (
            <img 
              src={coverImage} 
              alt={project.title}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              referrerPolicy="no-referrer"
            />
          )}
        </div>

        <div className="p-3 md:p-4 flex-grow flex flex-col justify-between">
          <div>
            <h3 className="text-sm md:text-xl font-black uppercase tracking-tight leading-tight line-clamp-2 mb-2">{project.title}</h3>
            <div className="flex flex-wrap gap-1 mb-2 md:mb-4">
              {project.tags.slice(0, 2).map(tag => (
                <span key={tag} className="bg-gray-100 border-2 border-black px-1 md:px-1.5 py-0.5 text-[8px] md:text-[10px] font-bold uppercase">
                  #{tag}
                </span>
              ))}
              {project.tags.length > 2 && (
                <span className="bg-gray-100 border-2 border-black px-1 md:px-1.5 py-0.5 text-[8px] md:text-[10px] font-bold uppercase">
                  +{project.tags.length - 2}
                </span>
              )}
            </div>
          </div>
          <div className="mt-auto font-bold text-[10px] md:text-sm underline decoration-2 underline-offset-2 flex items-center gap-1 group-hover:text-brutal-pink transition-colors">
            Detail <ExternalLink className="w-3 h-3 md:w-3.5 md:h-3.5" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectModal: React.FC<{ project: Project; onClose: () => void; onImageClick: (url: string) => void }> = ({ project, onClose, onImageClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = project.images || (project.image ? [project.image] : []);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose} 
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white brutal-border brutal-shadow flex flex-col z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-20 p-3 bg-black border-b-2 border-black flex justify-between items-center text-white font-bold text-sm uppercase px-4">
          <span>{project.category}</span>
          <button onClick={onClose} className="hover:text-brutal-pink transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <div 
          className="relative w-full h-64 md:h-96 border-b-2 border-black group/slider overflow-hidden bg-gray-200 shrink-0 cursor-pointer" 
          onClick={() => images.length > 0 && onImageClick(images[currentImageIndex])}
        >
          {images.length > 0 && (
            <img 
              src={images[currentImageIndex]} 
              alt={`${project.title} - ${currentImageIndex + 1}`}
              className="w-full h-full object-cover transition-all duration-500"
              referrerPolicy="no-referrer"
            />
          )}
          <div className="absolute top-4 right-4 bg-black/70 text-white p-2 border-2 border-black opacity-0 group-hover/slider:opacity-100 transition-opacity flex items-center gap-2 text-xs font-bold uppercase">
            <Maximize2 size={16} /> Perbesar
          </div>

          {images.length > 1 && (
            <>
              <button 
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black text-white p-2 border-2 border-black opacity-100 md:opacity-0 group-hover/slider:opacity-100 hover:bg-brutal-yellow hover:text-black transition-all z-10"
              >
                &larr;
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black text-white p-2 border-2 border-black opacity-100 md:opacity-0 group-hover/slider:opacity-100 hover:bg-brutal-yellow hover:text-black transition-all z-10"
              >
                &rarr;
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, i) => (
                  <div key={i} className={`w-3 h-3 border-2 border-black ${i === currentImageIndex ? 'bg-brutal-pink' : 'bg-white'}`} />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="p-6 md:p-8 bg-white">
          <h3 className="text-3xl md:text-4xl font-black uppercase mb-4 tracking-tight leading-tight">{project.title}</h3>
          <p className="font-medium mb-8 text-gray-700 text-base md:text-lg whitespace-pre-wrap">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map(tag => (
              <span key={tag} className="bg-gray-100 border-2 border-black px-3 py-1 text-sm font-bold uppercase">
                #{tag}
              </span>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            {project.demoUrl ? (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex-1 brutal-border bg-black text-white py-4 font-bold uppercase flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-colors text-lg">
                Demo <ExternalLink size={20} />
              </a>
            ) : (
              <button disabled className="flex-1 brutal-border bg-gray-800 text-gray-400 py-4 font-bold uppercase flex items-center justify-center gap-2 cursor-not-allowed opacity-75 text-lg">
                Demo <ExternalLink size={20} />
              </button>
            )}
            
            {project.githubUrl ? (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="brutal-border bg-white px-6 py-4 flex items-center justify-center hover:bg-brutal-yellow transition-colors sm:w-auto">
                <Github size={24} />
              </a>
            ) : (
              <button disabled className="brutal-border bg-gray-200 text-gray-500 px-6 py-4 flex items-center justify-center cursor-not-allowed opacity-75 sm:w-auto">
                <Github size={24} />
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const FullScreenImageModal: React.FC<{ imageUrl: string; onClose: () => void }> = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8" onClick={onClose}>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/95 backdrop-blur-md" 
      />
      <button 
        onClick={onClose} 
        className="absolute top-4 right-4 text-white hover:text-brutal-pink transition-colors z-[70] bg-black border-2 border-white p-2"
      >
        <X size={32} />
      </button>
      <motion.img 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        src={imageUrl} 
        alt="Full screen view"
        className="max-w-full max-h-full object-contain relative z-[65] brutal-border"
        referrerPolicy="no-referrer"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await storageService.getProjects();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Prevent background scrolling when modals are open
  useEffect(() => {
    if (selectedProject || fullScreenImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject, fullScreenImage]);

  return (
    <section id="projects" className="py-20 px-6 bg-gray-50 border-t-2 border-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 leading-tight">
              Proyek <span className="bg-brutal-pink text-white px-2 mt-2 inline-block md:mt-0">Saya</span>
            </h2>
            <p className="text-lg md:text-xl max-w-7xl font-medium">
              Kumpulan proyek yang sudah saya buat, mulai dari tugas akhir semester hingga proyek klien.
            </p>
          </div>
          <div className="font-black uppercase tracking-widest text-sm border-b-2 border-black pb-2">
            {projects.length.toString().padStart(2, '0')} / Total
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
          {isLoading ? (
            <div className="col-span-full py-20 text-center font-bold text-2xl uppercase italic text-gray-500">
              Memuat Proyek...
            </div>
          ) : projects.length === 0 ? (
            <div className="col-span-full py-20 text-center font-bold text-2xl uppercase italic text-gray-500">
              Tidak ada proyek ditemukan.
            </div>
          ) : (
            projects.slice(0, visibleCount).map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index} 
                onClick={() => setSelectedProject(project)}
              />
            ))
          )}
        </div>

        {projects.length > visibleCount && (
          <div className="mt-20 text-center">
            <button 
              onClick={() => setVisibleCount(prev => prev + 6)}
              className="brutal-border bg-white px-12 py-6 text-xl font-black uppercase brutal-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
              Muat Lebih Banyak Proyek
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
            onImageClick={(url) => setFullScreenImage(url)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {fullScreenImage && (
          <FullScreenImageModal 
            imageUrl={fullScreenImage} 
            onClose={() => setFullScreenImage(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
