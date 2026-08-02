import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { usePdfStore } from '@/store/pdfStore';
import mockPdfs from '@/data/mockPdfs.json';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Flame, Moon, BookOpen, Star } from 'lucide-react';

export default function Dashboard({ email }) {
  const [greeting, setGreeting] = useState('');
  const emailPrefix = email ? email.split('@')[0] : 'Buscador';
  
  const { lastReadPdfId, setLastReadPdf, pdfProgress } = usePdfStore();
  const navigate = useNavigate();

  const lastReadPdf = mockPdfs.find((p) => p.id === lastReadPdfId);
  const recommendedIds = ['guia-7-noches-alineacion', 'calendario-espiritual'];
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

      {/* 2. Gamification: Prosperity Streak */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative z-10"
      >
        <Card className="bg-gradient-to-br from-card to-background border-primary/30 shadow-lg overflow-hidden">
          <CardContent className="p-5">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <Flame size={18} className="text-orange-500" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold leading-none mb-1">Racha de Prosperidad</h3>
                  <p className="text-xs text-muted-foreground">Día 3 de tu Despertar</p>
                </div>
              </div>
              <span className="text-lg font-serif text-primary">33%</span>
            </div>
            <Progress value={33} className="h-1.5 bg-primary/10" />
            <p className="text-[10px] text-right mt-2 text-primary/70 font-mono tracking-widest uppercase">Fase 1 en progreso</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* 3. Hero Action Card: Daily Ritual */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative z-10"
      >
        <Card className="bg-gradient-to-tr from-primary/10 via-card to-card border-primary/20 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <Sparkles size={80} />
          </div>
          <CardContent className="p-6 relative z-10">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono text-purple-300 uppercase tracking-wider mb-2 bg-purple-500/20 px-2 py-1 rounded-sm">
              <Star size={10} /> Tarea de Hoy
            </div>
            <h3 className="text-xl font-serif mb-1">Ritual Diario 5 Minutos</h3>
            <p className="text-sm text-muted-foreground mb-5">Abre tu canal de prosperidad antes de salir de casa.</p>
            <Button 
              className="w-full shadow-lg hover:shadow-2xl transition-all animate-pulse duration-3000 bg-primary text-primary-foreground h-12"
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
        className="relative z-10 space-y-6"
      >
        {/* Continue Reading */}
        {lastReadPdf && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold tracking-wide text-foreground/80 px-1">Continuar Lectura</h3>
            <Card className="bg-white/5 backdrop-blur-md border-white/10 shadow-sm">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex gap-4 items-center overflow-hidden">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <BookOpen size={20} className="text-primary" />
                  </div>
                  <div className="space-y-1 overflow-hidden pr-2">
                    <p className="text-sm font-medium truncate">{lastReadPdf.title}</p>
                    <p className="text-xs text-primary/70 font-mono">
                      Página {pdfProgress[lastReadPdf.id] || 1} • Retomar
                    </p>
                  </div>
                </div>
                <Button 
                  size="icon" 
                  variant="ghost"
                  className="rounded-full flex-shrink-0 bg-primary/10 hover:bg-primary/20 text-primary h-10 w-10"
                  onClick={() => handleOpenPdf(lastReadPdf.id)}
                >
                  <ArrowRight size={18} />
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Recommended Horizontal Scroll */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold tracking-wide text-foreground/80 px-1">Materiales Recomendados</h3>
          
          <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {recommendedPdfs.map((pdf) => (
              <Card 
                key={pdf.id} 
                className="min-w-[240px] w-[240px] flex-shrink-0 snap-start bg-card/80 border-border/50 hover:border-primary/30 transition-colors cursor-pointer"
                onClick={() => handleOpenPdf(pdf.id)}
              >
                <CardContent className="p-4 flex flex-col h-full justify-between">
                  <div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">{pdf.category}</div>
                    <h4 className="text-sm font-medium leading-tight mb-2 line-clamp-2">{pdf.title}</h4>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-[10px] text-primary/70 font-mono">{pdf.estimatedReadTime}</span>
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <ArrowRight size={12} className="text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {/* Spacer to allow full scroll padding at the end */}
            <div className="min-w-[1px] w-[1px] flex-shrink-0" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
