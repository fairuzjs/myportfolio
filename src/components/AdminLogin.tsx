import React, { useState } from 'react';
import { ArrowRight, Lock, KeyRound } from 'lucide-react';
import { motion } from 'framer-motion';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

const AdminLogin = ({ onLoginSuccess }: AdminLoginProps) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      onLoginSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  const goBack = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFDFD] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgwLDAsMCwwLjEpIi8+PC9zdmc+')] p-4 sm:p-6 relative overflow-hidden">
      <button 
        onClick={goBack}
        className="absolute top-6 left-6 sm:top-8 sm:left-8 font-black uppercase flex items-center gap-2 hover:-translate-x-2 transition-transform bg-white border-4 border-black p-2 sm:px-4 sm:py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-10 text-sm sm:text-base"
      >
        <ArrowRight className="rotate-180" size={20} /> <span className="hidden sm:inline">Back to Site</span>
      </button>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg relative z-10 mt-16 sm:mt-0"
      >
        {/* Background decorative box */}
        <div className="absolute inset-0 bg-brutal-pink border-4 border-black translate-x-2 translate-y-2 sm:translate-x-4 sm:translate-y-4"></div>
        
        {/* Main login box */}
        <div className="bg-white border-4 border-black p-6 sm:p-10 md:p-14 relative flex flex-col items-center">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-20 h-20 bg-brutal-yellow border-4 border-black flex items-center justify-center rounded-full mb-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            <Lock size={32} className="text-black" />
          </motion.div>
          
          <div className="text-center mb-10 w-full">
            <h1 className="font-display text-4xl sm:text-5xl font-black uppercase tracking-tighter mb-4 leading-none">
              Admin <span className="text-brutal-blue">Access</span>
            </h1>
            <p className="font-bold text-gray-500 uppercase tracking-widest text-xs sm:text-sm border-y-2 border-dashed border-gray-300 py-3">
              Authorized Personnel Only
            </p>
          </div>

          <form onSubmit={handleLogin} className="w-full space-y-6">
            <div>
              <label className="block font-black uppercase text-sm tracking-widest mb-3 flex items-center gap-2">
                <KeyRound size={16} /> Enter Passkey
              </label>
              <input 
                required
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className={`w-full border-4 border-black p-4 sm:p-5 font-bold text-xl sm:text-2xl text-center tracking-[0.2em] focus:outline-none transition-colors ${error ? 'bg-red-100 border-red-500 text-red-600' : 'bg-gray-50 focus:bg-brutal-yellow/20'}`}
                placeholder="••••••••"
              />
            </div>
            
            <div className="h-6 flex items-center justify-center">
              {error && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-white bg-brutal-pink font-bold text-sm px-4 py-1 uppercase tracking-wider border-2 border-black"
                >
                  Access Denied
                </motion.p>
              )}
            </div>
            
            <button 
              type="submit"
              className="w-full border-4 border-black bg-brutal-green py-5 sm:py-6 text-xl sm:text-2xl font-black uppercase flex items-center justify-center gap-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-2 active:translate-y-2 transition-all"
            >
              Unlock <ArrowRight size={24} />
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
