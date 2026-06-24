import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';
import { BrutalButton } from './ui/BrutalUI';
import { storageService } from '../services/storageService';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setIsSubmitting(true);
    try {
      await storageService.saveMessage({
        name: formData.name,
        email: formData.email,
        subject: `Pesan dari ${formData.name}`,
        text: formData.message
      });
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("Error saving message:", error);
      alert("Gagal mengirim pesan. Silakan coba lagi nanti.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-pink-400 border-t-4 border-black overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <div>
          <h2 className="font-black text-4xl sm:text-6xl md:text-8xl uppercase tracking-tighter mb-8 bg-white border-4 border-black inline-block p-4 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rotate-[-2deg] leading-tight">
            Open to<br/>Work.
          </h2>
          <p className="text-xl md:text-2xl font-black mb-12 max-w-lg border-l-8 border-black pl-4 bg-yellow-400 border-4 p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-1">
           Punya sebuah proyek? Mari hubungi saya dan berdiskusi!
          </p>

          <div className="flex flex-col gap-6">
            {[
              { icon: <Mail />, text: "draaafrz@gmail.com", color: "bg-white" },
              { icon: <MapPin />, text: "Bandung, Indonesia", color: "bg-yellow-400" },
              { icon: <Phone />, text: "+62 813-8788-3915", color: "bg-blue-400" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ x: 8 }}
                className={`flex items-center gap-4 md:gap-6 border-4 border-black p-3 md:p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] w-full overflow-hidden ${item.color}`}
              >
                <div className="font-black shrink-0">{item.icon}</div>
                <p className="font-bold text-sm sm:text-base md:text-xl uppercase tracking-wider truncate">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-white border-4 border-black p-8 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]"
        >
          <div className="border-b-4 border-black pb-6 mb-8 flex items-center justify-between">
            <h3 className="font-black text-3xl uppercase">Kirim Pesan</h3>
            <Send size={32} />
          </div>
          
          {isSuccess ? (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-green-400 border-4 border-black p-8 text-center py-16"
            >
              <CheckCircle2 size={64} className="mx-auto mb-4" />
              <h4 className="font-black text-2xl uppercase mb-2">Pesan Terkirim!</h4>
              <p className="font-bold">Terima kasih telah menghubungi saya. Saya akan segera membalas pesan Anda.</p>
            </motion.div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-black uppercase text-sm mb-2">Nama</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full border-4 border-black bg-gray-50 p-4 font-bold focus:bg-yellow-100 focus:outline-none transition-colors"
                    placeholder="NAMA ANDA"
                  />
                </div>
                <div>
                  <label className="block font-black uppercase text-sm mb-2">Email</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full border-4 border-black bg-gray-50 p-4 font-bold focus:bg-pink-100 focus:outline-none transition-colors"
                    placeholder="HELLO@MAIL.COM"
                  />
                </div>
              </div>
              <div>
                <label className="block font-black uppercase text-sm mb-2">Pesan</label>
                <textarea 
                  rows={4} 
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full border-4 border-black bg-gray-50 p-4 font-bold focus:bg-blue-100 focus:outline-none transition-colors resize-none"
                  placeholder="CERITAKAN PROJECT ANDA..."
                ></textarea>
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full brutal-border bg-green-400 text-2xl py-6 flex justify-center items-center gap-4 brutal-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-75 disabled:cursor-not-allowed font-black uppercase"
              >
                {isSubmitting ? 'Mengirim...' : (
                  <>Kirim Sekarang <ArrowRight size={28} /></>
                )}
              </button>
            </form>
          )}
        </motion.div>

      </div>
    </section>
  );
};

export default Contact;