import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { usePdfStore } from '@/store/pdfStore';
import mockPdfs from '@/data/mockPdfs.json';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Flame, Moon, BookOpen, Star, Smartphone, DownloadCloud } from 'lucide-react';
import PwaInstallTutorial from '@/components/features/PwaInstallTutorial';

export default function Dashboard({ email }) {
  const [greeting, setGreeting] = useState('');
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const emailPrefix = email ? email.split('@')[0] : 'Buscador';
  
  const { lastReadPdfId, setLastReadPdf, pdfProgress } = usePdfStore();
  const navigate = useNavigate();

  const lastReadPdf = mockPdfs.find((p) => p.id === lastReadPdfId);
  const recommendedIds = ['guia-7-noches-alineacion', 'calendario-espiritual', 'guia-limpieza-hogar'];
  const recommendedPdfs = mockPdfs.filter(p => recommendedIds.includes(p.id));

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Buenos días');
    else if (hour < 19) setGreeting('Buenas tardes');
    else setGreeting('Buenas noches');
  }, []);

  const handleOpenPdf = (id) => {
    setLastReadPdf(id);
    navigate('/lector');
  };

  const handleInstallClick = () => {
    setIsInstallModalOpen(true);
  };

  return (
    <div className="p-5 space-y-8 pb-28 relative overflow-hidden min-h-screen">
      {/* Mystical Background Accents */}
      <div className="absolute top-[-5%] right-[-10%] w-72 h-72 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-64 h-64 bg-purple-900/10 rounded-full blur-[80px] pointer-events-none" />

      {/* 1. Dynamic & Mystical Header */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-3 relative z-10"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-serif text-primary tracking-tight">
            {greeting},<br/><span className="capitalize text-foreground">{emailPrefix}</span>.
          </h2>
        </div>
        
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-medium border border-primary/20 shadow-[0_0_10px_rgba(212,175,55,0.1)]">
          <Moon size={14} />
          Luna Creciente • Frecuencia Alta
        </div>
      </motion.div>

      {/* NEW: VIP PWA Install Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.05 }}
        className="relative z-10"
      >
        <Card className="bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/30 shadow-[0_0_20px_-5px_var(--color-primary)] overflow-hidden">
          <CardContent className="p-4 flex items-center justify-between gap-3">
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

      {/* 2. Gamification: Prosperity Streak with Glow */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative z-10"
      >
        <Card className="bg-gradient-to-br from-card to-background border-primary/30 shadow-lg overflow-hidden relative">
          {/* Subtle glow behind the card */}
          <div className="absolute top-1/2 right-4 -translate-y-1/2 w-16 h-16 bg-orange-500/10 rounded-full blur-[20px] pointer-events-none" />
          
          <CardContent className="p-5 relative z-10">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center shadow-[0_0_15px_rgba(249,115,22,0.3)]">
                  <Flame size={20} className="text-orange-500 drop-shadow-[0_0_5px_rgba(249,115,22,0.8)]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold leading-none mb-1">Racha de Prosperidad</h3>
                  <p className="text-xs text-muted-foreground">Día 3 de tu Despertar</p>
                </div>
              </div>
              <span className="text-xl font-serif text-primary drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">33%</span>
            </div>
            {/* Vibrant gradient progress bar */}
            <Progress value={33} className="h-2 bg-primary/10 shadow-inner" indicatorClassName="bg-gradient-to-r from-primary/50 to-primary" />
            <p className="text-[10px] text-right mt-2 text-primary/80 font-mono tracking-widest uppercase">Fase 1 en progreso</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* 3. Hero Action Card: Daily Ritual with Glassmorphism & Radial Gradient */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative z-10"
      >
        <Card className="bg-card/40 backdrop-blur-xl border border-primary/30 shadow-[0_0_30px_-10px_var(--color-primary)] relative overflow-hidden group">
          {/* Subtle radial gradient background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--color-primary)_0%,_transparent_60%)] opacity-10 pointer-events-none" />
          <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none mix-blend-screen">
            <Sparkles size={100} className="text-primary animate-[pulse_4s_ease-in-out_infinite]" />
          </div>
          
          <CardContent className="p-6 relative z-10">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono text-primary uppercase tracking-wider mb-3 bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-sm">
              <Star size={10} className="text-primary fill-primary/50" /> Tarea de Hoy
            </div>
            <h3 className="text-2xl font-serif mb-2 text-foreground drop-shadow-sm">Ritual Diario 5 Minutos</h3>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">Abre tu canal de prosperidad antes de salir de casa y atrae la energía correcta.</p>
            <Button 
              className="w-full h-12 bg-primary text-primary-foreground shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] active:scale-95 transition-all duration-300 text-base font-semibold"
              onClick={() => handleOpenPdf('ritual-diario')}
            >
              Comenzar Ritual
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* 4. Continue Reading & Recommended (Carousel) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative z-10 space-y-8 pt-2"
      >
        {/* Continue Reading */}
        {lastReadPdf && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold tracking-wide text-foreground/80 px-1">Continuar Lectura</h3>
            <Card className="bg-card/50 backdrop-blur-md border border-primary/10 shadow-sm hover:border-primary/30 transition-colors">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex gap-4 items-center overflow-hidden">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <BookOpen size={20} className="text-primary" />
                  </div>
                  <div className="space-y-1 overflow-hidden pr-2">
                    <p className="text-sm font-medium truncate text-foreground">{lastReadPdf.title}</p>
                    <p className="text-[10px] text-primary/80 font-mono tracking-wide">
                      Página {pdfProgress[lastReadPdf.id] || 1} • Retomar
                    </p>
                  </div>
                </div>
                <Button 
                  size="icon" 
                  variant="ghost"
                  className="rounded-full flex-shrink-0 bg-primary/10 hover:bg-primary/20 text-primary h-10 w-10 active:scale-90 transition-transform"
                  onClick={() => handleOpenPdf(lastReadPdf.id)}
                >
                  <ArrowRight size={18} />
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Populated Recommended Horizontal Scroll */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-semibold tracking-wide text-foreground/80">Materiales Recomendados</h3>
            <Sparkles size={14} className="text-primary/70" />
          </div>
          
          <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {recommendedPdfs.map((pdf) => (
              <Card 
                key={pdf.id} 
                className="min-w-[200px] w-48 flex-shrink-0 snap-center bg-card/60 backdrop-blur-sm border-border/50 hover:border-primary/40 hover:bg-card/80 transition-all cursor-pointer shadow-md relative overflow-hidden"
                onClick={() => handleOpenPdf(pdf.id)}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity" />
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
            
            {/* Spacer to allow full scroll padding at the end within max-w constraints */}
            <div className="min-w-[1px] w-[1px] flex-shrink-0" />
          </div>
        </div>
      </motion.div>

      <PwaInstallTutorial 
        isOpen={isInstallModalOpen} 
        onClose={() => setIsInstallModalOpen(false)} 
      />
    </div>
  );
}
