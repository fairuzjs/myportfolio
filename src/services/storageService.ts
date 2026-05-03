import { supabase } from './supabase';
import { Project, Message } from '../types';

function base64ToBlob(base64: string, mimeType: string) {
  const byteString = atob(base64.split(',')[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeType });
}

export const storageService = {
  getProjects: async (): Promise<Project[]> => {
    const { data, error } = await supabase.from('projects').select('*');
    if (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
    return data as Project[];
  },

  saveProject: async (project: Project): Promise<void> => {
    const uploadedImages: string[] = [];
    
    if (project.images && project.images.length > 0) {
      for (let i = 0; i < project.images.length; i++) {
        const imageStr = project.images[i];
        
        if (imageStr.startsWith('http') && imageStr.includes('supabase.co')) {
          uploadedImages.push(imageStr);
          continue;
        }

        if (imageStr.startsWith('data:')) {
          try {
            const mimeType = imageStr.substring(imageStr.indexOf(":")+1, imageStr.indexOf(";"));
            const ext = mimeType.split('/')[1] || 'jpeg';
            const fileName = `${project.id}-${i}-${Date.now()}.${ext}`;
            
            const blob = base64ToBlob(imageStr, mimeType);
            
            const { data, error } = await supabase.storage
              .from('portfolio-images')
              .upload(`projects/${fileName}`, blob, {
                contentType: mimeType,
                upsert: true
              });

            if (error) throw error;
            
            const { data: publicUrlData } = supabase.storage
              .from('portfolio-images')
              .getPublicUrl(`projects/${fileName}`);
              
            uploadedImages.push(publicUrlData.publicUrl);
          } catch (e) {
             console.error("Error uploading image:", e);
             uploadedImages.push(imageStr);
          }
        } else {
           uploadedImages.push(imageStr);
        }
      }
    }

    const projectToSave = { ...project, images: uploadedImages };
    
    const { error } = await supabase.from('projects').upsert(projectToSave);
    if (error) throw error;
  },

  deleteProject: async (id: string): Promise<void> => {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) throw error;
  },
  
  getMessages: async (): Promise<Message[]> => {
    const { data, error } = await supabase.from('messages').select('*').order('timestamp', { ascending: true });
    if (error) {
      console.error('Error fetching messages:', error);
      return [];
    }
    return data as Message[];
  },
  
  saveMessage: async (message: Omit<Message, 'id' | 'timestamp'>): Promise<void> => {
    const id = Math.random().toString(36).substr(2, 9);
    const newMessage: Message = {
      ...message,
      id,
      timestamp: Date.now()
    };
    
    const { error } = await supabase.from('messages').insert([newMessage]);
    if (error) throw error;
  },
  
  deleteMessage: async (id: string): Promise<void> => {
    const { error } = await supabase.from('messages').delete().eq('id', id);
    if (error) throw error;
  }
};
