import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PlaceboLogin from './components/features/auth/PlaceboLogin';
import Dashboard from './pages/Dashboard';
import ElCodigo from './pages/ElCodigo';
import Lector from './pages/Lector';
import Materiales from './pages/Materiales';
import Perfil from './pages/Perfil';
import AudioPlayerScreen from './pages/AudioPlayerScreen';
import BottomNav from './components/layout/BottomNav';
import PwaInstallModal from './components/layout/PwaInstallModal';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from '@/components/theme-provider';

export default function App() {
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail'));
  const [showInstallModal, setShowInstallModal] = useState(false);

  const handleLogin = (email) => {
    localStorage.setItem('userEmail', email);
    setUserEmail(email);
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <div className="bg-background text-foreground min-h-screen flex justify-center">
        {/* Mobile Container max-width 480px */}
        <div className="w-full max-w-[480px] bg-card relative shadow-2xl overflow-hidden flex flex-col h-[100dvh]">
          
          <AnimatePresence mode="wait">
            {!userEmail ? (
              <PlaceboLogin onLogin={handleLogin} key="login" />
            ) : (
              <motion.div 
                key="main-app"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="flex-1 overflow-y-auto pb-20"
              >
                <Routes>
                  <Route path="/" element={<Dashboard email={userEmail} />} />
                  <Route path="/codigo" element={<ElCodigo />} />
                  <Route path="/audio/:phaseId" element={<AudioPlayerScreen />} />
                  <Route path="/materiales" element={<Materiales />} />
                  <Route path="/lector" element={<Lector />} />
                  <Route path="/perfil" element={<Perfil />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
                <BottomNav />
              </motion.div>
            )}
          </AnimatePresence>

          <PwaInstallModal isOpen={showInstallModal} onClose={() => setShowInstallModal(false)} />
        </div>
      </div>
      </Router>
    </ThemeProvider>
  );
}
