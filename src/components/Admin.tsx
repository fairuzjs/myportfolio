import React, { useState, useEffect } from 'react';
import { storageService } from '../services/storageService';
import { Project, Message } from '../types';
import { Trash2, Plus, LogOut, MessageSquare, Briefcase, X, Edit2, ImagePlus, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface AdminProps {
  onLogout: () => void;
}

const Admin = ({ onLogout }: AdminProps) => {
  const [activeTab, setActiveTab] = useState<'projects' | 'messages'>('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    message: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    message: '',
    onConfirm: () => {}
  });
  
  const [newProject, setNewProject] = useState<Omit<Project, 'id'>>({
    title: '',
    category: 'Product Design',
    description: '',
    images: ['https://picsum.photos/seed/' + Math.random() + '/600/400'],
    color: 'bg-brutal-yellow',
    tags: [],
    githubUrl: '',
    demoUrl: ''
  });

  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const proj = await storageService.getProjects();
        const msgs = await storageService.getMessages();
        setProjects(proj);
        setMessages(msgs);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleFile = (files: FileList | File[]) => {
    const currentImages = newProject.images || [];
    if (currentImages.length >= 5) return;
    
    let processed = 0;
    const newImgs: string[] = [];
    const filesToProcess = Array.from(files).slice(0, 5 - currentImages.length);

    filesToProcess.forEach(file => {
      const checkProcessed = () => {
        processed++;
        if (processed === filesToProcess.length) {
          setNewProject(prev => ({ ...prev, images: [...(prev.images || []), ...newImgs] }));
        }
      };

      if (!file.type.startsWith('image/')) {
        checkProcessed();
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          newImgs.push(e.target.result as string);
        }
        checkProcessed();
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files);
    }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const project: Project = {
      ...newProject,
      id: editingProjectId || Math.random().toString(36).substr(2, 9)
    };
    
    try {
      await storageService.saveProject(project);
      setProjects(await storageService.getProjects());
      setShowAddForm(false);
      setEditingProjectId(null);
      setNewProject({
        title: '',
        category: 'Product Design',
        description: '',
        images: ['https://picsum.photos/seed/' + Math.random() + '/600/400'],
        color: 'bg-brutal-yellow',
        tags: [],
        githubUrl: '',
        demoUrl: ''
      });
    } catch (error: any) {
      alert("Failed to save project. Make sure you have created the 'projects' table, 'portfolio-images' storage bucket, and disabled RLS. Error: " + error.message);
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const openAddForm = () => {
    setEditingProjectId(null);
    setNewProject({
      title: '',
      category: 'Product Design',
      description: '',
      images: [],
      color: 'bg-brutal-yellow',
      tags: [],
      githubUrl: '',
      demoUrl: ''
    });
    setShowAddForm(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProjectId(project.id);
    const { id, image, images, ...rest } = project;
    let normalizedImages = images || [];
    if (normalizedImages.length === 0 && image) {
      normalizedImages = [image];
    }
    setNewProject({ ...rest, images: normalizedImages });
    setShowAddForm(true);
  };

  const removeImage = (index: number) => {
    const newImages = [...(newProject.images || [])];
    newImages.splice(index, 1);
    setNewProject({ ...newProject, images: newImages });
  };

  const moveImage = (index: number, direction: 'left' | 'right') => {
    const newImages = [...(newProject.images || [])];
    if (direction === 'left' && index > 0) {
      [newImages[index - 1], newImages[index]] = [newImages[index], newImages[index - 1]];
    } else if (direction === 'right' && index < newImages.length - 1) {
      [newImages[index + 1], newImages[index]] = [newImages[index], newImages[index + 1]];
    }
    setNewProject({ ...newProject, images: newImages });
  };

  const handleDeleteProject = (id: string) => {
    setConfirmDialog({
      isOpen: true,
      message: 'Are you sure you want to delete this project?',
      onConfirm: async () => {
        await storageService.deleteProject(id);
        setProjects(await storageService.getProjects());
        setConfirmDialog(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const handleDeleteMessage = (id: string) => {
    setConfirmDialog({
      isOpen: true,
      message: 'Are you sure you want to delete this message?',
      onConfirm: async () => {
        await storageService.deleteMessage(id);
        setMessages(await storageService.getMessages());
        setConfirmDialog(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const addTag = () => {
    if (tagInput && !newProject.tags.includes(tagInput)) {
      setNewProject({ ...newProject, tags: [...newProject.tags, tagInput] });
      setTagInput('');
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgwLDAsMCwwLjE1KSIvPjwvc3ZnPg==')] pt-20 sm:pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 sm:mb-16">
          <div className="w-full md:w-auto">
            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-4">
              Admin <span className="bg-brutal-yellow px-2 inline-block -rotate-2 mt-2 md:mt-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">Dashboard</span>
            </h1>
            <p className="font-bold text-base sm:text-lg border-l-4 border-black pl-4 bg-white inline-block pr-4 py-1">
              Manage your work and communications.
            </p>
          </div>
          <button 
            onClick={onLogout}
            className="w-full md:w-auto border-4 border-black bg-white text-black px-6 py-3 sm:py-4 font-black uppercase flex items-center justify-center gap-2 hover:bg-black hover:text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>

        <div className="flex gap-4 mb-10 sm:mb-14 overflow-x-auto pb-4 snap-x">
          <button 
            onClick={() => setActiveTab('projects')}
            className={`border-4 border-black px-6 sm:px-8 py-3 sm:py-4 font-black uppercase flex items-center gap-2 sm:gap-3 transition-all shrink-0 snap-start text-sm sm:text-base ${activeTab === 'projects' ? 'bg-brutal-blue text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] translate-x-[-2px] translate-y-[-2px]' : 'bg-white hover:bg-gray-100'}`}
          >
            <Briefcase size={20} /> Projects
          </button>
          <button 
            onClick={() => setActiveTab('messages')}
            className={`border-4 border-black px-6 sm:px-8 py-3 sm:py-4 font-black uppercase flex items-center gap-2 sm:gap-3 transition-all shrink-0 snap-start text-sm sm:text-base ${activeTab === 'messages' ? 'bg-brutal-pink text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] translate-x-[-2px] translate-y-[-2px]' : 'bg-white hover:bg-gray-100'}`}
          >
            <MessageSquare size={20} /> Messages 
            {messages.length > 0 && <span className="bg-black text-white px-2 rounded-full text-xs sm:text-sm">{messages.length}</span>}
          </button>
        </div>

        {activeTab === 'projects' ? (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight bg-white border-4 border-black px-4 py-2 inline-block">Your Projects</h2>
              <button 
                onClick={openAddForm}
                className="w-full sm:w-auto border-4 border-black bg-brutal-green px-6 py-3 sm:p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-2 font-black uppercase"
              >
                <Plus size={24} /> <span className="sm:hidden">Add Project</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
              {isLoading ? (
                <div className="col-span-full py-20 text-center bg-white border-4 border-black font-black text-2xl uppercase tracking-widest shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">Loading Projects...</div>
              ) : projects.length === 0 ? (
                <div className="col-span-full py-20 text-center bg-white border-4 border-black font-black text-2xl uppercase tracking-widest shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">No projects found.</div>
              ) : projects.map(project => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={project.id} 
                  className="border-4 border-black bg-white flex flex-col h-full shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  <div className="relative h-48 border-b-4 border-black overflow-hidden group shrink-0 bg-gray-200">
                    <img src={project.images?.[0] || project.image || ''} alt={project.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                    {project.images && project.images.length > 1 && (
                      <div className="absolute bottom-2 left-2 bg-black text-white text-xs px-2 py-1 font-bold border-2 border-black">
                        1/{project.images.length}
                      </div>
                    )}
                    <div className="absolute top-2 right-2 flex gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleEditProject(project)}
                        className="bg-brutal-blue text-white p-2 border-2 border-black hover:bg-white hover:text-black transition-colors"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDeleteProject(project.id)}
                        className="bg-brutal-pink text-white p-2 border-2 border-black hover:bg-black transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="font-black uppercase text-xl sm:text-2xl mb-2 line-clamp-2 leading-tight">{project.title}</h3>
                    <div className="mt-auto pt-4">
                      <span className={`text-xs font-bold px-2 py-1 border-2 border-black uppercase inline-block ${project.color.replace('text-', 'bg-').replace('border-', 'bg-') || 'bg-gray-100'}`}>
                        {project.category}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mb-8 bg-white border-4 border-black px-4 py-2 inline-block">Incoming Messages</h2>
            {isLoading ? (
              <div className="bg-white border-4 border-black p-12 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <p className="font-black text-2xl uppercase tracking-widest">Loading Messages...</p>
              </div>
            ) : messages.length === 0 ? (
              <div className="bg-white border-4 border-black p-12 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <p className="font-black text-2xl uppercase tracking-widest">No messages yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {messages.map((message, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={message.id} 
                    className="border-4 border-black bg-white flex flex-col shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all"
                  >
                    <div className="p-4 sm:p-6 border-b-4 border-black bg-pink-50 relative">
                      <button 
                        onClick={() => handleDeleteMessage(message.id)}
                        className="absolute top-4 right-4 sm:top-6 sm:right-6 text-black hover:text-white hover:bg-brutal-pink p-2 border-2 border-transparent hover:border-black transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4 pr-10">
                        <span className="bg-brutal-yellow font-black uppercase text-xs px-3 py-1.5 border-2 border-black inline-block w-max">
                          {message.subject}
                        </span>
                        <span className="font-bold text-xs text-gray-500 bg-white border-2 border-gray-200 px-2 py-1 w-max">
                          {new Date(message.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black uppercase mb-1 leading-tight">{message.name}</h3>
                      <p className="font-bold text-brutal-blue break-all">{message.email}</p>
                    </div>
                    <div className="p-4 sm:p-6 bg-white italic font-medium text-base sm:text-lg flex-grow">
                      "{message.text}"
                    </div>
                  </motion.div>
                )).reverse()}
              </div>
            )}
          </div>
        )}
      </div>

      {confirmDialog.isOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 sm:p-6 backdrop-blur-sm"
          onClick={() => setConfirmDialog(prev => ({ ...prev, isOpen: false }))}
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="border-4 border-black bg-white w-full max-w-md p-6 sm:p-8 relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          >
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter mb-4 leading-none">
              Hold <span className="bg-brutal-pink text-white px-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] inline-block rotate-1">Up!</span>
            </h2>
            <p className="font-bold text-base sm:text-lg mb-8 border-l-4 border-black pl-4 text-gray-700">
              {confirmDialog.message}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={confirmDialog.onConfirm}
                className="flex-1 border-4 border-black bg-brutal-pink text-white py-3 sm:py-4 font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
              >
                Yes, Delete
              </button>
              <button 
                onClick={() => setConfirmDialog(prev => ({ ...prev, isOpen: false }))}
                className="flex-1 border-4 border-black bg-white text-black py-3 sm:py-4 font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none hover:bg-gray-100 transition-all"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {showAddForm && (
        <div 
          className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 sm:p-6 backdrop-blur-sm overflow-y-auto"
          onClick={() => setShowAddForm(false)}
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="border-4 border-black bg-[#FDFDFD] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgwLDAsMCwwLjE1KSIvPjwvc3ZnPg==')] w-full max-w-3xl max-h-[90vh] overflow-y-auto relative shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] my-auto"
          >
            <div className="sticky top-0 bg-white border-b-4 border-black p-4 sm:p-6 z-20 flex justify-between items-center shadow-sm">
              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tighter leading-none">
                {editingProjectId ? 'Edit' : 'Add'} <span className="bg-brutal-green px-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] inline-block -rotate-1">Project</span>
              </h2>
              <button 
                onClick={() => setShowAddForm(false)}
                className="p-2 bg-white border-4 border-black hover:bg-brutal-pink hover:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 sm:p-8">
              <form onSubmit={handleAddProject} className="space-y-6 sm:space-y-8">
              <div>
                <label className="block font-black uppercase text-sm tracking-widest mb-2 flex items-center gap-2">Project Title</label>
                <input 
                  required
                  type="text"
                  value={newProject.title}
                  onChange={e => setNewProject({...newProject, title: e.target.value})}
                  className="w-full border-4 border-black bg-white p-4 font-bold text-lg focus:bg-brutal-yellow/20 focus:outline-none transition-colors"
                  placeholder="e.g. Neon Brutalist Website"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-black uppercase text-sm tracking-widest mb-2">Category</label>
                  <select 
                    value={newProject.category}
                    onChange={e => setNewProject({...newProject, category: e.target.value})}
                    className="w-full border-4 border-black bg-white p-4 font-bold text-lg focus:outline-none appearance-none cursor-pointer"
                    style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23000000%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem top 50%', backgroundSize: '0.85rem auto' }}
                  >
                    <option>Product Design</option>
                    <option>Mobile App</option>
                    <option>Branding</option>
                    <option>Web App</option>
                  </select>
                </div>
                <div>
                  <label className="block font-black uppercase text-sm tracking-widest mb-2">Color Accent</label>
                  <select 
                    value={newProject.color}
                    onChange={e => setNewProject({...newProject, color: e.target.value})}
                    className="w-full border-4 border-black bg-white p-4 font-bold text-lg focus:outline-none appearance-none cursor-pointer"
                    style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23000000%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem top 50%', backgroundSize: '0.85rem auto' }}
                  >
                    <option value="bg-brutal-yellow">Yellow</option>
                    <option value="bg-brutal-pink">Pink</option>
                    <option value="bg-brutal-blue">Blue</option>
                    <option value="bg-brutal-green">Green</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-black uppercase text-sm tracking-widest mb-2">
                  Project Images (Max 5) - <span className="bg-black text-white px-2 py-0.5">{newProject.images?.length || 0}/5</span>
                </label>
                
                {(newProject.images || []).length > 0 && (
                  <div className="flex gap-4 overflow-x-auto mb-6 pb-4 snap-x">
                    {(newProject.images || []).map((img, index) => (
                      <div key={index} className="relative w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0 border-4 border-black group snap-start shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
                        <img src={img} className="w-full h-full object-cover" alt={`Upload ${index}`} />
                        <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                          <button type="button" onClick={() => removeImage(index)} className="bg-brutal-pink text-white p-1.5 border-2 border-black hover:bg-black transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className="absolute bottom-2 left-2 flex gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                          {index > 0 && (
                            <button type="button" onClick={() => moveImage(index, 'left')} className="bg-white text-black p-1.5 border-2 border-black hover:bg-brutal-yellow transition-colors">
                              <ChevronLeft size={16} />
                            </button>
                          )}
                          {index < (newProject.images?.length || 0) - 1 && (
                            <button type="button" onClick={() => moveImage(index, 'right')} className="bg-white text-black p-1.5 border-2 border-black hover:bg-brutal-yellow transition-colors">
                              <ChevronRight size={16} />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {(newProject.images?.length || 0) < 5 && (
                  <div 
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`w-full h-32 sm:h-40 border-4 border-black border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors ${
                      isDragging ? 'bg-brutal-green/20 border-solid border-brutal-green' : 'bg-white hover:bg-gray-50'
                    } p-6`}
                    onClick={() => document.getElementById('image-upload')?.click()}
                  >
                    <input 
                      id="image-upload"
                      type="file" 
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => e.target.files && handleFile(e.target.files)}
                    />
                    <div className="flex flex-col items-center text-gray-600">
                      <ImagePlus size={32} className="mb-3 text-black" />
                      <p className="font-black text-sm sm:text-base uppercase text-center tracking-wider">Drag & Drop up to {5 - (newProject.images?.length || 0)} images</p>
                      <p className="text-xs font-bold mt-1 bg-gray-200 px-2 py-1">or click to browse</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-black uppercase text-sm tracking-widest mb-2">Demo URL (Optional)</label>
                  <input 
                    type="url"
                    value={newProject.demoUrl}
                    onChange={e => setNewProject({...newProject, demoUrl: e.target.value})}
                    className="w-full border-4 border-black bg-white p-4 font-bold text-lg focus:bg-brutal-yellow/20 focus:outline-none transition-colors"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="block font-black uppercase text-sm tracking-widest mb-2">GitHub URL (Optional)</label>
                  <input 
                    type="url"
                    value={newProject.githubUrl}
                    onChange={e => setNewProject({...newProject, githubUrl: e.target.value})}
                    className="w-full border-4 border-black bg-white p-4 font-bold text-lg focus:bg-brutal-yellow/20 focus:outline-none transition-colors"
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>
              <div>
                <label className="block font-black uppercase text-sm tracking-widest mb-2">Description</label>
                <textarea 
                  required
                  rows={4}
                  value={newProject.description}
                  onChange={e => setNewProject({...newProject, description: e.target.value})}
                  className="w-full border-4 border-black bg-white p-4 font-bold text-lg focus:bg-brutal-yellow/20 focus:outline-none transition-colors resize-none"
                  placeholder="Describe your project here..."
                ></textarea>
              </div>
              <div>
                <label className="block font-black uppercase text-sm tracking-widest mb-2">Tags</label>
                <div className="flex gap-2 mb-3 flex-wrap">
                  {newProject.tags.map(tag => (
                    <span key={tag} className="bg-white border-2 border-black px-3 py-1.5 text-xs font-bold uppercase flex items-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      {tag} 
                      <button type="button" onClick={() => setNewProject({...newProject, tags: newProject.tags.filter(t => t !== tag)})} className="hover:text-brutal-pink">
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input 
                    type="text"
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    className="flex-1 border-4 border-black bg-white p-4 font-bold text-lg focus:bg-brutal-yellow/20 focus:outline-none transition-colors"
                    placeholder="Press enter to add tags"
                  />
                  <button 
                    type="button"
                    onClick={addTag}
                    className="border-4 border-black bg-black text-white px-8 py-4 font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-white hover:text-black transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none whitespace-nowrap"
                  >
                    Add Tag
                  </button>
                </div>
              </div>
              
              <div className="pt-4 pb-8 border-t-4 border-black">
                <button 
                  type="submit"
                  disabled={isSaving}
                  className="w-full border-4 border-black bg-brutal-green py-5 sm:py-6 text-xl sm:text-2xl font-black uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-2 active:translate-y-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isSaving ? 'Saving to Cloud...' : editingProjectId ? 'Update Project' : 'Save Project'}
                </button>
              </div>
            </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Admin;
