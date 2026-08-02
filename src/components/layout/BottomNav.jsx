import { NavLink } from 'react-router-dom';
import { Home, Key, Library, BookOpen, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePdfStore } from '@/store/pdfStore';

export default function BottomNav() {
  const isViewerFullscreen = usePdfStore((state) => state.isViewerFullscreen);

  const navItems = [
    { to: '/', icon: Home, label: 'Inicio' },
    { to: '/codigo', icon: Key, label: 'El Código' },
    { to: '/materiales', icon: Library, label: 'Materiales' },
    { to: '/lector', icon: BookOpen, label: 'Lector' },
    { to: '/perfil', icon: User, label: 'Perfil' },
  ];

  return (
    <AnimatePresence>
      {!isViewerFullscreen && (
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute bottom-0 w-full max-w-[480px] bg-card/90 backdrop-blur-md border-t border-border/50 pb-[env(safe-area-inset-bottom)] z-50"
        >
          <nav className="flex justify-around items-center h-16 px-2">
            {navItems.map((item) => (
              <NavLink 
                key={item.to} 
                to={item.to}
                className={({ isActive }) => 
                  `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors min-w-[44px] min-h-[44px] ${
                    isActive ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-primary/70'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <motion.div
                      animate={isActive ? { scale: 1.15, y: -2 } : { scale: 1, y: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                    </motion.div>
                    <span className="text-[10px] tracking-wide">{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
