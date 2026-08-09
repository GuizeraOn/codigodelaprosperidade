import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { usePdfStore } from '@/store/pdfStore';
import { useProsperityProgress } from '@/hooks/useProsperityProgress';
import mockPdfs from '@/data/mockPdfs.json';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Flame, Moon, BookOpen, Star, Smartphone, DownloadCloud, Lock, CheckCircle2, X } from 'lucide-react';
import PwaInstallTutorial from '@/components/features/PwaInstallTutorial';

export default function Dashboard({ email }) {
  const [greeting, setGreeting] = useState('');
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const [isStandalone, setIsStandalone] = useState(true);
  const [showInstallBanner, setShowInstallBanner] = useState(() => {
    return localStorage.getItem('dismissed_install_banner') !== 'true';
  });
  
  const emailPrefix = email ? email.split('@')[0] : 'Buscador';
  
  const { setLastReadPdf } = usePdfStore();
  const progressHooks = useProsperityProgress();
  const currentTask = progressHooks.getCurrentTask();
  const navigate = useNavigate();

  const recommendedIds = ['guia-7-noches-alineacion', 'calendario-espiritual', 'guia-limpieza-hogar'];
  const recommendedPdfs = mockPdfs.filter(p => recommendedIds.includes(p.id));

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Buenos días');
    else if (hour < 19) setGreeting('Buenas tardes');
    else setGreeting('Buenas noches');

    if (typeof window !== 'undefined') {
      setIsStandalone(window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true);
    }
  }, []);

  const handleOpenPdf = (id) => {
    setLastReadPdf(id);
    navigate('/lector');
  };

  const handleInstallClick = () => {
    setIsInstallModalOpen(true);
  };

  const handleDismissBanner = () => {
    setShowInstallBanner(false);
    localStorage.setItem('dismissed_install_banner', 'true');
  };

  const getPhaseStatusIcon = (phaseNum) => {
    if (phaseNum === 1) {
      return progressHooks.phase1Completed 
        ? <CheckCircle2 className="text-primary w-5 h-5" /> 
        : <Star className="text-primary w-5 h-5" />;
    }
    if (phaseNum === 2) {
      if (!progressHooks.phase1Completed) return <Lock className="text-muted-foreground w-5 h-5" />;
      if (progressHooks.phase2TrackerDays >= 7) return <CheckCircle2 className="text-primary w-5 h-5" />;
      return <Star className="text-primary w-5 h-5" />;
    }
    if (phaseNum === 3) {
      if (!progressHooks.phase3Unlocked) return <Lock className="text-muted-foreground w-5 h-5" />;
      return <Star className="text-primary w-5 h-5" />;
    }
  };

  return (
    <div className="p-5 space-y-8 pb-28 relative overflow-hidden min-h-screen">
      {/* Mystical Background Accents */}
      <div className="absolute top-[-5%] right-[-10%] w-72 h-72 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-64 h-64 bg-purple-900/10 rounded-full blur-[80px] pointer-events-none" />

      {/* 1. Header with Streak */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 flex items-start justify-between"
      >
        <div className="space-y-3">
          <h2 className="text-3xl font-serif text-primary tracking-tight">
            {greeting},<br/><span className="capitalize text-foreground">{emailPrefix}</span>.
          </h2>
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-medium border border-primary/20 shadow-[0_0_10px_rgba(212,175,55,0.1)]">
            <Moon size={14} />
            Luna Creciente • Frecuencia Alta
          </div>
        </div>
        
        {progressHooks.streakDays > 0 && (
          <div className="flex flex-col items-center justify-center bg-card/60 backdrop-blur-sm border border-primary/20 rounded-xl px-3 py-2 shadow-lg">
            <Flame size={20} className="text-orange-500 mb-1" />
            <span className="text-lg font-bold font-mono text-primary leading-none">{progressHooks.streakDays}</span>
            <span className="text-[9px] uppercase tracking-wider text-muted-foreground">Días</span>
          </div>
        )}
      </motion.div>

      {/* 2. VIP PWA Install Banner (Hidden if standalone or dismissed) */}
      {!isStandalone && showInstallBanner && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.05 }}
          className="relative z-10"
        >
          <Card className="bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/30 shadow-[0_0_20px_-5px_var(--color-primary)] overflow-hidden relative pr-2">
            
            {/* Close Button */}
            <button 
              onClick={handleDismissBanner}
              className="absolute top-2 right-2 text-primary/50 hover:text-primary transition-colors z-20"
            >
              <X size={14} />
            </button>

            <CardContent className="p-4 pt-5 pb-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                  <Smartphone size={20} className="text-primary" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-semibold text-foreground leading-tight">Experiencia VIP</p>
                  <p className="text-[10px] text-muted-foreground leading-tight">Instala la app para acceso instantáneo</p>
                </div>
              </div>
              <Button 
                size="sm" 
                onClick={handleInstallClick}
                className="shrink-0 bg-primary text-primary-foreground h-8 px-3 text-xs shadow-md shadow-primary/20 hover:shadow-primary/40 transition-shadow"
              >
                <DownloadCloud size={14} className="mr-1.5" /> Instalar
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* 3. Hero Action Card: Tarea de Hoy */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative z-10"
      >
        <Card className="bg-card/40 backdrop-blur-xl border border-primary/30 shadow-[0_0_30px_-10px_var(--color-primary)] relative overflow-hidden group">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--color-primary)_0%,_transparent_60%)] opacity-10 pointer-events-none" />
          <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none mix-blend-screen">
            <Sparkles size={100} className="text-primary animate-[pulse_4s_ease-in-out_infinite]" />
          </div>
          
          <CardContent className="p-6 relative z-10">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono text-primary uppercase tracking-wider mb-3 bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-sm">
              <Star size={10} className="text-primary fill-primary/50" /> Tarea de Hoy
            </div>
            <h3 className="text-2xl font-serif mb-2 text-foreground drop-shadow-sm">{currentTask.title}</h3>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{currentTask.subtitle}</p>
            <Button 
              className="w-full h-12 bg-primary text-primary-foreground shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] active:scale-95 transition-all duration-300 text-base font-semibold"
              onClick={() => navigate(currentTask.route)}
            >
              {currentTask.actionLabel}
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* 4. Tu Ruta del Código de la Prosperidad */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative z-10 space-y-4"
      >
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-semibold tracking-wide text-foreground/80">Tu Ruta del Código</h3>
        </div>

        <div className="space-y-3">
          {/* Fase 1 */}
          <div 
            onClick={() => navigate('/audio/1')}
            className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer ${
              progressHooks.phase1Completed 
                ? 'bg-card border-primary/30' 
                : 'bg-primary/5 border-primary/50 shadow-[0_0_15px_rgba(212,175,55,0.1)]'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                {getPhaseStatusIcon(1)}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Fase 1: Romper el Amarre</p>
                <p className="text-xs text-muted-foreground">
                  {progressHooks.phase1Completed ? 'Completada' : 'En progreso'}
                </p>
              </div>
            </div>
            {progressHooks.phase1Completed && <ArrowRight size={16} className="text-primary/50" />}
          </div>

          {/* Fase 2 */}
          <div 
            onClick={() => { if(progressHooks.phase1Completed) navigate('/audio/2'); }}
            className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
              !progressHooks.phase1Completed
                ? 'bg-muted/30 border-border/50 opacity-60'
                : progressHooks.phase2TrackerDays >= 7 
                  ? 'bg-card border-primary/30 cursor-pointer'
                  : 'bg-primary/5 border-primary/50 shadow-[0_0_15px_rgba(212,175,55,0.1)] cursor-pointer'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                {getPhaseStatusIcon(2)}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Fase 2: Activar Frecuencia</p>
                <p className="text-xs text-muted-foreground">
                  {!progressHooks.phase1Completed 
                    ? 'Bloqueada (Termina Fase 1)' 
                    : progressHooks.phase2TrackerDays >= 7 
                      ? 'Completada' 
                      : `Noche ${progressHooks.phase2TrackerDays}/7`}
                </p>
              </div>
            </div>
            {progressHooks.phase1Completed && <ArrowRight size={16} className="text-primary/50" />}
          </div>

          {/* Fase 3 */}
          <div 
            onClick={() => { if(progressHooks.phase3Unlocked) navigate('/audio/3'); }}
            className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
              !progressHooks.phase3Unlocked
                ? 'bg-muted/30 border-border/50 opacity-60'
                : 'bg-primary/5 border-primary/50 shadow-[0_0_15px_rgba(212,175,55,0.1)] cursor-pointer'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                {getPhaseStatusIcon(3)}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Fase 3: Abrir los Caminos</p>
                <p className="text-xs text-muted-foreground">
                  {!progressHooks.phase3Unlocked ? 'Bloqueada (Termina Fase 2)' : 'Disponible'}
                </p>
              </div>
            </div>
            {progressHooks.phase3Unlocked && <ArrowRight size={16} className="text-primary/50" />}
          </div>
        </div>
      </motion.div>

      {/* 5. Complementos de tu Experiencia VIP */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative z-10 space-y-4 pt-2"
      >
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-semibold tracking-wide text-foreground/80">Complementos VIP</h3>
          <Sparkles size={14} className="text-primary/70" />
        </div>
        
        <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {recommendedPdfs.map((pdf) => (
            <Card 
              key={pdf.id} 
              className="min-w-[200px] w-48 flex-shrink-0 snap-center bg-card/60 backdrop-blur-sm border-border/50 hover:border-primary/40 hover:bg-card/80 transition-all cursor-pointer shadow-md relative overflow-hidden"
              onClick={() => handleOpenPdf(pdf.id)}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity hover:opacity-100" />
              <CardContent className="p-4 flex flex-col h-full justify-between">
                <div>
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <BookOpen size={14} className="text-primary" />
                  </div>
                  <h4 className="text-sm font-medium leading-snug mb-1 line-clamp-2 text-foreground">{pdf.title}</h4>
                  <p className="text-[10px] text-muted-foreground line-clamp-2 leading-relaxed">{pdf.description}</p>
                </div>
                <div className="flex items-center justify-between mt-5">
                  <span className="text-[10px] text-primary/70 font-mono bg-primary/10 px-2 py-0.5 rounded-full">{pdf.estimatedReadTime}</span>
                  <Button size="sm" variant="ghost" className="h-6 text-[10px] px-2 text-primary hover:bg-primary/10">Leer</Button>
                </div>
              </CardContent>
            </Card>
          ))}
          <div className="min-w-[1px] w-[1px] flex-shrink-0" />
        </div>
      </motion.div>

      <PwaInstallTutorial 
        isOpen={isInstallModalOpen} 
        onClose={() => setIsInstallModalOpen(false)} 
      />
    </div>
  );
}
